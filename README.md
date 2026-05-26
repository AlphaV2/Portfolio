<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/87fc0a44-bfc6-4eba-afd3-c310b113edaf

## Run Locally

**Prerequisites:**  Node.js
# Hemanth Goshika Portfolio

A personal portfolio built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- Portfolio sections for About, Skills, Projects, Experience, and Contact
- Live ambient terminal with event logs and Linux-style console feel
- Heat map activity visualization tied to cursor and interaction events
- Responsive layout optimized for desktop and smaller screens
- GitHub Pages ready build output

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- lucide-react icons

## Prerequisites

- Node.js 18 or newer
- npm

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

The app runs on `http://localhost:3000` by default.

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production output locally:

```bash
npm run preview
```

## GitHub Pages Deployment

This repo is configured for GitHub Pages with a relative Vite base path and a GitHub Actions workflow.

Build locally:

```bash
npm run deploy
```

The workflow at [.github/workflows/pages.yml](.github/workflows/pages.yml) automatically publishes the `dist` folder to GitHub Pages on pushes to `updates` or `main`.

If you want to preview the built site locally, use:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - build the app for production
- `npm run preview` - preview the production build locally
- `npm run deploy` - build the app locally
- `npm run lint` - run TypeScript type checking
- `npm run clean` - remove build output

## Repository Structure

```text
index.html
package.json
vite.config.ts
src/
   App.tsx
   data.ts
   index.css
   main.tsx
   types.ts
   components/
      AmbientCanvas.tsx
      InteractiveColumns.tsx
      ProjectSandbox.tsx
      Sidebar.tsx
public/
   images/
```

## Notes

- The portfolio data and copy live in `src/data.ts`.
- GitHub Pages build settings are handled in `vite.config.ts`, `package.json`, and [.github/workflows/pages.yml](.github/workflows/pages.yml).
- If you update assets or routes, rebuild before deploying so the published `dist` stays current.
