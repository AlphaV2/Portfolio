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

This repo is configured for GitHub Pages with a Vite base path and a GitHub Actions workflow.

Workflow file:

- [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

Live site:

- https://alphav2.github.io/Portfolio/

Set GitHub Pages source to GitHub Actions in repository settings.

Push flow:

- `git add .`
- `git commit -m "update"`
- `git push origin main`

GitHub Actions builds and deploys automatically.

## Available Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - build the app for production
- `npm run preview` - preview the production build locally
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
- GitHub Pages build settings are handled in `vite.config.ts`, `package.json`, and [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
- If you update assets or routes, GitHub Actions will rebuild and publish on the next push to `main`.
