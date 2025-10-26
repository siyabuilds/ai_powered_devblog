---
title: 'SaaS Analytics and Metrics'
pubDate: 'Oct 26 2025'
description: 'Key metrics like MRR, ARR, LTV, and how to track them.'
---

# SaaS Analytics and Metrics: Your Guide to Understanding MRR, ARR, LTV, and More

Hey there! If you’re building or working with a SaaS product, you’ve probably heard buzzwords like MRR, ARR, LTV flying around in meetings or Slack channels. But what do they actually mean? How do you track them? And why should you care?

In this post, I’ll walk you through the key SaaS metrics that every founder, product manager, or developer should know. We’ll break down **Monthly Recurring Revenue (MRR)**, **Annual Recurring Revenue (ARR)**, **Customer Lifetime Value (LTV)**, and a few more. Plus, I’ll share some practical tips and simple code snippets so you can actually put this knowledge to work.

Let’s dive in!

---

## Why SaaS Metrics Matter

Before we jump into definitions, let’s get one thing straight: SaaS metrics aren’t just fancy numbers to impress investors. They’re your **navigational tools**. Think of them like a GPS for your product’s health and growth.

Tracking the right metrics helps you:

- Understand how much predictable revenue you generate,
- Identify where customers drop off,
- Measure the impact of your marketing and sales efforts,
- Forecast future growth or risks,
- Make data-driven decisions instead of guessing.

So, knowing your SaaS metrics is like having a superpower for building a healthier, scalable business.

---

## Key SaaS Metrics Explained

### 1. Monthly Recurring Revenue (MRR)

**What is MRR?**  
MRR is the total predictable revenue your SaaS generates every month from all active subscriptions. It excludes one-time charges or variable fees.

**Why MRR?**  
It’s the heartbeat of your SaaS business. MRR shows you how much money you can expect to come in each month, helping you plan expenses, hiring, or new features.

**How to calculate MRR?**  
At its simplest:

```
MRR = Σ (Monthly subscription price per customer)
```

If you have customers on different plans, sum their monthly fees.

**Example:**  
Say you have three customers:

| Customer | Monthly Plan Price |
| -------- | ------------------ |
| A        | $50                |
| B        | $100               |
| C        | $75                |

Your MRR = 50 + 100 + 75 = $225

**Tracking MRR with code (Python example):**

```python
subscriptions = [
    {"customer_id": 1, "monthly_price": 50},
    {"customer_id": 2, "monthly_price": 100},
    {"customer_id": 3, "monthly_price": 75},
]

mrr = sum(sub['monthly_price'] for sub in subscriptions)
print(f"Monthly Recurring Revenue (MRR): ${mrr}")
```

**Advanced MRR:**  
- **New MRR:** Revenue gained from new customers in a month.  
- **Expansion MRR:** Additional revenue from upgrades or add-ons.  
- **Churned MRR:** Revenue lost from cancellations or downgrades.

Tracking these helps you understand growth and churn dynamics.

---

### 2. Annual Recurring Revenue (ARR)

**What is ARR?**  
ARR is simply your MRR multiplied by 12. It’s the yearly equivalent of your recurring revenue.

**Why ARR?**  
Investors and founders love ARR because it gives a bigger picture of your business scale. Annual contracts can also make ARR calculation straightforward.

**Formula:**

```
ARR = MRR × 12
```

**Example:**  
If your MRR is $225, then:

```
ARR = 225 × 12 = $2,700
```

Note: If you have annual subscriptions paid upfront, count their value towards ARR.

---

### 3. Customer Lifetime Value (LTV)

**What is LTV?**  
LTV estimates the total revenue you expect to earn from a customer over the entire time they remain subscribed.

**Why LTV?**  
Knowing LTV helps you decide how much you can spend on acquiring customers (CAC), and whether your business model is sustainable.

**Basic formula:**

```
LTV = Average Revenue Per User (ARPU) × Customer Lifetime (in months or years)
```

**Breaking it down:**

- **ARPU:** Average revenue per customer per month (often same as average MRR/customer).
- **Customer Lifetime:** Average duration a customer sticks around before churning.

**How to find customer lifetime?**

If your churn rate is the % of customers who leave each month, then:

```
Customer Lifetime (in months) = 1 / Monthly Churn Rate
```

**Example:**

- ARPU = $50/month
- Monthly churn = 5% (0.05)

Customer Lifetime = 1 / 0.05 = 20 months

LTV = 50 × 20 = $1,000

**Python snippet to calculate LTV:**

```python
arpu = 50
monthly_churn_rate = 0.05

customer_lifetime = 1 / monthly_churn_rate
ltv = arpu * customer_lifetime

print(f"Customer Lifetime Value (LTV): ${ltv:.2f}")
```

---

### 4. Customer Acquisition Cost (CAC)

**What is CAC?**  
CAC is how much you spend to acquire one new customer. This includes marketing, sales salaries, software tools, etc.

**Why CAC?**  
You want to ensure LTV > CAC, otherwise you’re losing money on each customer.

**Simple formula:**

```
CAC = Total Sales and Marketing Spend / Number of New Customers Acquired
```

---

### 5. Churn Rate

**What is churn?**  
Churn rate is the percentage of customers (or revenue) lost in a period.

- **Customer churn:** % of customers lost.
- **Revenue churn:** % of MRR lost.

**Why churn matters?**  
High churn means you’re leaking revenue, and growth becomes tough.

**Formula:**

```
Monthly Churn Rate = (Customers Lost in Month) / (Customers at Start of Month)
```

---

## How to Track These Metrics in Your SaaS

### 1. Use Your Subscription Data

Your subscription database is gold. It should track:

- Customer ID
- Subscription start/end dates
- Plan price and billing cycle
- Status (active, canceled, paused)

With this, you can calculate MRR, ARR, churn, etc.

### 2. Automate Calculation With Scripts or Tools

If you’re a developer, writing scripts to calculate and visualize these metrics is super helpful. Here’s a simple example in JavaScript for MRR:

```javascript
const subscriptions = [
  { id: 1, monthlyPrice: 50, status: "active" },
  { id: 2, monthlyPrice: 100, status: "active" },
  { id: 3, monthlyPrice: 75, status: "canceled" },
];

const mrr = subscriptions
  .filter(sub => sub.status === "active")
  .reduce((total, sub) => total + sub.monthlyPrice, 0);

console.log(`Monthly Recurring Revenue (MRR): $${mrr}`);
```

### 3. Use SaaS Analytics Tools

If you want to skip the manual work, tools like:

- [Baremetrics](https://baremetrics.com/)
- [ChartMogul](https://chartmogul.com/)
- [ProfitWell](https://www.profitwell.com/)

automatically pull data from Stripe or other payment providers and give you live dashboards.

### 4. Integrate with Your BI Stack

Export your subscription and billing data into data warehouses (like BigQuery or Snowflake) and build custom dashboards with tools like Looker, Tableau, or Metabase.

---

## Practical Tips to Improve Your SaaS Metrics

- **Reduce churn:** Onboard customers well, offer great support, and iterate based on feedback.
- **Increase LTV:** Upsell premium plans, provide add-ons, or create incentives for longer contracts.
- **Lower CAC:** Optimize your marketing funnel, focus on organic growth, and improve conversion rates.
- **Segment metrics:** Track MRR by plan, region, or customer size to spot trends.

---

## Additional Resources

Before we wrap up, here are some official docs and comprehensive guides to dig deeper:

- [Stripe Billing Documentation](https://stripe.com/docs/billing) – Great if you use Stripe as your payment processor.
- [Baremetrics Blog](https://baremetrics.com/blog) – Excellent resource for SaaS metrics explained.
- [ProfitWell Metrics](https://www.profitwell.com/metrics) – Useful for understanding SaaS KPIs.
- [Reforge SaaS Growth Models](https://www.reforge.com/blog/saas-growth-models) – Dive into growth and churn modeling.

---

## Summary: Your SaaS Dashboard’s Best Friends

Let’s quickly recap:

- **MRR:** Your monthly predictable revenue — the foundation.
- **ARR:** Annualized MRR — big picture revenue.
- **LTV:** How much a customer is worth over their lifetime.
- **CAC:** Cost to bring in a new customer.
- **Churn:** How many customers you’re losing.

By understanding and tracking these, you’ll have a clear view of your SaaS health and growth potential. Whether you write code, use analytics platforms, or just keep an eye on your dashboards, these metrics should guide your decisions.

So, next time you think about your SaaS business, remember: It’s all about the numbers, but more importantly, it’s about what those numbers tell you about your customers and your product.

Happy analyzing! 🚀