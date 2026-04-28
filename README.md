# gregoriomarchesini.github.io

Personal academic website for [Gregorio Marchesini](https://gregoriomarchesini.github.io), built with React, TypeScript, Vite, and Tailwind CSS.

## Editing the site

The site is now organized so that writing and layout live in different places:

- `src/templates/` - reusable page templates
- `src/content/pages/` - Markdown content for standalone pages such as the homepage/about page
- `src/content/blog/` - Markdown blog posts
- `src/content/projects/` - Markdown project pages
- `src/pages/` - route components that connect content to templates
- `public/assets/img/` - images used by the site

### Normal editing workflow

1. Edit Markdown in `src/content/...`
2. Keep layout changes inside `src/templates/...` or `src/pages/...`
3. Avoid editing generated files in `public/blog/...` and `public/projects/...`

### Example

If you want to update your bio, edit:

- `src/content/pages/about.md`

If you want to add or revise a blog post, edit:

- `src/content/blog/<year>/<slug>.md`

If you want to update a project page, edit:

- `src/content/projects/<slug>.md`

Blog posts and project pages are auto-discovered from those folders, so adding a new file there is the main step. You should only touch code if you want a new layout or a new content type.

This way the meaningful text lives in Markdown, like a README, and the React app is only responsible for presentation.

## Local development

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- [npm](https://www.npmjs.com/)

### Install dependencies

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

The site will be available at <http://localhost:8080>.

### Build for production

```bash
npm run build
```

The compiled output is placed in the `dist/` directory.

### Run tests

```bash
npm test
```

## Deploying to GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that automatically builds and deploys the site to GitHub Pages.

### Automatic deployment

Every push to the `main` branch triggers the workflow and deploys the latest version of the site.

### Manual deployment (workflow_dispatch)

You can also trigger a deployment manually at any time without pushing code:

1. Go to the **Actions** tab of this repository on GitHub.
2. Select the **"Deploy to GitHub Pages"** workflow in the left sidebar.
3. Click the **"Run workflow"** button on the right side of the page.
4. Confirm by clicking the green **"Run workflow"** button in the dropdown.

The workflow will build the site and deploy it to <https://gregoriomarchesini.github.io>.

### First-time GitHub Pages setup

If GitHub Pages has not been enabled for this repository yet:

1. Go to **Settings → Pages** in the repository.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Save the changes, then trigger the workflow using either method above.
