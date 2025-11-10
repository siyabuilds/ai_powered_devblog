# AI-Powered Developer Blog

> ⚠️ **AI-Generated Content**: This blog automatically creates posts using OpenAI's GPT models. While we aim for quality, always verify technical details and test code before using in production.

A modern developer blog built with Astro, featuring automated content generation powered by AI. The blog covers topics ranging from web development, DevOps, cloud computing, AI/ML, SaaS best practices, and career development.

**Live Site**: [blog.samson.codes](https://blog.samson.codes)

## ✨ Features

- ✅ AI-powered content generation using OpenAI API
- ✅ Automated blog post creation with topic rotation
- ✅ Minimal, performant styling (100/100 Lighthouse)
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap and RSS feed support
- ✅ Markdown & MDX support
- ✅ Content collections with type-safe frontmatter

## 🚀 Quick Setup

### Prerequisites

- Node.js 18+ installed
- An OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/siyabuilds/ai_powered_devblog.git
   cd ai_powered_devblog
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   Replace `your_openai_api_key_here` with your actual OpenAI API key.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:4321`

## 🧞 Available Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📁 Project Structure

```text
├── public/
│   └── fonts/              # Custom fonts
├── src/
│   ├── assets/             # Images and media files
│   ├── components/         # Astro components
│   │   ├── BaseHead.astro
│   │   ├── Footer.astro
│   │   ├── FormattedDate.astro
│   │   ├── Header.astro
│   │   └── HeaderLink.astro
│   ├── content/
│   │   └── blog/           # Blog post markdown files
│   ├── layouts/
│   │   └── BlogPost.astro  # Blog post layout
│   ├── pages/
│   │   ├── about.astro     # About page
│   │   ├── index.astro     # Homepage
│   │   ├── rss.xml.js      # RSS feed generation
│   │   └── blog/           # Blog routes
│   ├── styles/
│   │   └── global.css      # Global styles
│   └── utils/              # AI content generation scripts
│       ├── fetchAndSavePost.js
│       ├── fetchPost.js
│       ├── generateFrontmatter.js
│       ├── savePost.js
│       ├── topicTracker.js
│       └── data/
│           ├── topics.js
│           └── topicTracker.json
├── astro.config.mjs        # Astro configuration
├── package.json
├── tsconfig.json
└── README.md
```

## 🤖 AI Content Generation System

The blog uses a modular Node.js script system in `src/utils/` to automatically generate blog posts using OpenAI's API.

### How It Works

#### 1. **Topic Management** (`topics.js` & `topicTracker.js`)

- **`topics.js`**: Contains an array of predefined blog topics across various categories:

  - Web Development (React, Next.js, CSS, PWAs, etc.)
  - DevOps (CI/CD, Docker, Kubernetes, monitoring)
  - Cloud (AWS, Azure, GCP, multi-cloud strategies)
  - AI/ML (machine learning, NLP, computer vision)
  - SaaS & Startups (MVP building, scaling, analytics)
  - Programming Languages & Tools (TypeScript, Python, Git)
  - Career Development (interviews, networking, remote work)
  - Architecture (microservices, event-driven design)

- **`topicTracker.js`**: Implements a round-robin topic selection system
  - Reads the last used topic index from `topicTracker.json`
  - Selects the next topic in sequence
  - Saves the current index to persist state between runs
  - Automatically cycles back to the first topic after reaching the end

#### 2. **Post Fetching** (`fetchPost.js`)

- Takes a topic object with `title` and `about` properties
- Constructs a detailed prompt for the OpenAI API
- Calls OpenAI's `gpt-4.1-mini` model with specific instructions:
  - Conversational yet knowledgeable tone
  - 1500-2000 word length
  - Markdown formatting with headings and lists
  - Practical examples and code snippets
  - Links to official documentation
- Returns the generated content or fallback error message

#### 3. **Frontmatter Generation** (`generateFrontmatter.js`)

- Creates YAML frontmatter for each post
- Generates current date in "Month Day, Year" format
- Includes title, publication date, and description
- Formats properly for Astro's content collections

#### 4. **Post Saving** (`savePost.js`)

- Converts the post title into a URL-friendly slug
- Creates the full markdown file with frontmatter + content
- Saves to `src/content/blog/` directory
- Ensures the directory exists before writing
- Returns the file path for confirmation

#### 5. **Orchestration** (`fetchAndSavePost.js`)

- Main entry point that coordinates all utilities
- Executes the full workflow:
  1. Gets the next topic from the tracker
  2. Fetches AI-generated content
  3. Saves the post to a markdown file
  4. Logs success or error messages

### Running the Content Generator

To generate a new blog post:

```bash
node src/utils/fetchAndSavePost.js
```

This will:

1. Select the next topic in rotation
2. Generate a new blog post using OpenAI
3. Save it to `src/content/blog/`
4. Update the topic tracker

### Customizing Topics

Edit `src/utils/data/topics.js` to add, remove, or modify topics:

```javascript
{
  title: "Your Topic Title",
  about: "Detailed description of what the post should cover"
}
```

### Configuration

The AI generation uses these parameters (in `fetchPost.js`):

- **Model**: `gpt-4.1-mini`
- **Max Tokens**: 3000
- **Temperature**: 0.7
- **System Role**: Technical writer and content creator

Modify these values to adjust output length, creativity, and style.

## 🛠️ Development

### Adding New Content Manually

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   pubDate: "Jan 10, 2024"
   description: "Brief description of your post"
   ---
   ```
3. Write your content in Markdown below the frontmatter

### Modifying Styles

- Global styles: `src/styles/global.css`
- Component-specific styles: Use `<style>` tags in `.astro` components

### Updating Site Configuration

Edit `astro.config.mjs` to:

- Change the site URL (currently set to `https://example.com`)
- Add or remove integrations
- Configure build settings

## 📊 Content Collections

This blog uses Astro's Content Collections feature for type-safe frontmatter:

- Collection definition: `src/content.config.ts`
- Blog posts: `src/content/blog/*.md`
- Retrieve posts: `getCollection('blog')`

See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) for more information.

## 🚢 Deployment

The blog is hosted at **[blog.samson.codes](https://blog.samson.codes)**.

### Building for Production

```bash
npm run build
```

This creates a static site in the `./dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🙏 Credits

- Built with [Astro](https://astro.build)
- Theme based on [Bear Blog](https://github.com/HermanMartinus/bearblog/)
- Content generated by [OpenAI](https://openai.com)
- Icons from [Font Awesome](https://fontawesome.com)

## 📧 Contact

For questions or feedback about this blog, visit [blog.samson.codes](https://blog.samson.codes).
