---
title: 'Kubernetes 101'
pubDate: 'Oct 8 2025'
description: 'Introduction to pods, deployments, services, and scaling applications in Kubernetes clusters.'
---

# Kubernetes 101: A Friendly Introduction to Pods, Deployments, Services, and Scaling

If you’ve been dipping your toes into the world of cloud-native development, you’ve probably heard the term **Kubernetes** thrown around a lot. It’s like the Swiss Army knife for running applications at scale in containers. But if you’re just starting out, understanding Kubernetes can feel a little like learning a new language. Don’t worry — this post is here to break down some of the core Kubernetes concepts in a simple, practical way.

By the end, you’ll have a solid grasp on **pods**, **deployments**, **services**, and **scaling applications** — the building blocks that will help you start running apps smoothly on Kubernetes.

---

## What is Kubernetes, Anyway?

Before we dive into the details, a quick refresher: Kubernetes (or “K8s” if you want to sound cool) is an open-source platform designed to automate deploying, scaling, and managing containerized applications.

Think of it as a conductor for an orchestra of containers, making sure each one plays its part, handles unexpected changes, and scales when needed — without you having to babysit it.

---

## Pods: The Smallest Deployable Unit

### What’s a Pod?

In Kubernetes, a **Pod** is the smallest unit you can deploy and manage. It usually contains one or more tightly coupled containers that share resources like storage and network.

Imagine a Pod as a little house where your containers live. They share the same IP address and can easily communicate with each other inside that house.

> **Why have multiple containers in a pod?**  
> Sometimes you want a helper container alongside your main app container — for example, a logging agent or a sidecar proxy.

### A Simple Pod Example

Here’s a basic YAML file that creates a pod running a single Nginx container:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
```

You can apply this with:

```bash
kubectl apply -f my-nginx-pod.yaml
```

This will start a pod named `my-nginx-pod` running Nginx on port 80.

### Key Takeaways on Pods

- Pods are ephemeral — if the pod dies, Kubernetes doesn’t automatically recreate it (more on that later).
- Pods have their own IPs, but these can change if the pod is recreated.
- Typically, you don’t manage pods directly for production apps.

---

## Deployments: Managing Pods at Scale

### Why Use Deployments?

Since pods are ephemeral, you wouldn’t want to manually create pods every time your app needs to run or get updated. This is where **Deployments** come in.

A Deployment manages a set of pods and ensures the desired number of replicas are running. It also makes it easy to roll out updates and roll back if something breaks.

### How Does a Deployment Work?

When you create a deployment, Kubernetes creates ReplicaSets, which in turn create and manage the pods. If a pod crashes, the ReplicaSet replaces it automatically.

### Example: Creating a Deployment for Nginx

Here’s a simple deployment definition:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest
        ports:
        - containerPort: 80
```

Apply with:

```bash
kubectl apply -f nginx-deployment.yaml
```

This tells Kubernetes: “Run 3 instances of Nginx pods, keep them running, and replace any that fail.”

### Updating a Deployment

One of the best things about deployments is the ability to perform rolling updates without downtime. For example, to update the image version, you can edit the deployment:

```bash
kubectl set image deployment/nginx-deployment nginx=nginx:1.19.0
```

Kubernetes will gradually replace old pods with new ones running the updated image.

---

## Services: Exposing Your Apps Inside and Outside the Cluster

### What’s a Service?

Pods are dynamic — their IPs can change as they restart or move across nodes in the cluster. So how do other apps or users connect to your pods reliably?

That’s the job of a **Service**. It’s an abstraction that defines a logical set of pods and a policy to access them. Services provide stable IP addresses and DNS names to groups of pods.

### Types of Services

- **ClusterIP** (default): Exposes the service on an internal IP in the cluster. Other pods can access it, but not external clients.
- **NodePort**: Exposes the service on each node’s IP at a static port (30000–32767). Useful for simple external access.
- **LoadBalancer**: Provisions an external load balancer (in supported cloud environments) to expose the service externally.
- **ExternalName**: Maps the service to a DNS name outside the cluster.

### Example: Creating a ClusterIP Service for Nginx Deployment

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80        # Port exposed inside the cluster
    targetPort: 80  # Port on the container
  type: ClusterIP
```

Apply it with:

```bash
kubectl apply -f nginx-service.yaml
```

Now, any pod in the cluster can connect to `nginx-service` on port 80, and Kubernetes will route traffic to one of the Nginx pods.

### Accessing Your Service Externally

If you want to expose your app outside the cluster during development, you could change the service type to `NodePort`:

```yaml
spec:
  type: NodePort
```

Or use `LoadBalancer` if you’re on a cloud platform like AWS or GCP.

---

## Scaling Applications: Easy Peasy with Kubernetes

One of Kubernetes’ superpowers is how easy it makes scaling your app — whether you want to handle a sudden spike in traffic or save resources during quiet times.

### Manual Scaling

You can manually scale your deployment up or down using the `kubectl scale` command:

```bash
kubectl scale deployment/nginx-deployment --replicas=5
```

This command tells Kubernetes to run 5 pods instead of 3.

### Autoscaling: Let Kubernetes Handle the Load

Kubernetes also supports **Horizontal Pod Autoscaling (HPA)**, which automatically adjusts the number of pods based on CPU usage (or custom metrics).

Here’s how you can enable autoscaling for your deployment:

```bash
kubectl autoscale deployment nginx-deployment --min=2 --max=10 --cpu-percent=50
```

This means:

- Keep at least 2 pods running.
- Scale up to a maximum of 10 pods.
- Try to maintain CPU usage at 50%.

You can check the status of your autoscaler with:

```bash
kubectl get hpa
```

---

## Putting It All Together: A Real-World Example

Say you have a simple web app you want to run on Kubernetes. Here’s a quick summary of what you’d do:

1. **Define a Deployment** to manage your app pods.
2. **Create a Service** to expose your app inside (or outside) the cluster.
3. **Scale your deployment** manually or use autoscaling to handle traffic.
4. **Update your deployment** when you want to release new versions, with zero downtime.

Here’s a snippet that combines a deployment and a service:

```yaml
# web-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web-container
        image: my-web-app:latest
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: web
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer
```

Apply it with:

```bash
kubectl apply -f web-deployment.yaml
```

Your app will be accessible through the external IP assigned to the load balancer!

---

## Wrapping Up: Your Kubernetes Journey Starts Here

Kubernetes might seem overwhelming at first, but once you understand the core concepts — **pods**, **deployments**, **services**, and **scaling** — you’re well on your way to mastering app orchestration.

Remember:

- **Pods** are your app containers’ homes.
- **Deployments** keep pods running and handle updates.
- **Services** provide stable access to your apps.
- **Scaling** lets you efficiently handle changing traffic demands.

Start experimenting with these basics, and you’ll soon be comfortable managing your containerized apps like a pro.

Happy Kuberneting! 🚀

---

If you’re hungry for more, the Kubernetes [official docs](https://kubernetes.io/docs/home/) are a fantastic resource to deepen your knowledge. But for now, this foundation will help you confidently launch and manage applications on Kubernetes clusters.