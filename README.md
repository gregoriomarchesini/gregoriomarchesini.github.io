# gregoriomarchesini.github.io

Personal academic website for [Gregorio Marchesini](https://gregoriomarchesini.github.io), built with React, TypeScript, Vite, and Tailwind CSS.

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
