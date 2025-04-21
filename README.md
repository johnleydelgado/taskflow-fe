# Task Flow

A lightweight front-end demo for the Front-End Developer Technical Assessment: a link-based task approval system. This React app allows a manager to view and manage tasks, send approval emails, and handle user responses via tokenized links. Intended only for local development and experimentation.

## Project Overview

**Objective:** Build a full-stack web application where a manager can create tasks, assign them to users by email, and receive approvals or rejections through a unique tokenized email link.  
**This front-end repo** implements the UI using React and React Router v7.

## Tech Stack

- **Frontend:** React 19, React Router v7  
- **State & Data Fetching:** @tanstack/react-query, axios  
- **Forms:** react-hook-form  
- **Styling:** Tailwind CSS, Heroicons  
- **Tooling:** Vite, TypeScript, ESLint

## Getting Started

### Prerequisites

- Node.js v18+  
- npm v9+  

### Installation

```bash
git clone https://github.com/johnleydelgado/taskflow-fe.git
cd taskflow-fe
npm install
```

### Environment Variables

> You will receive a `.env` file with the necessary configuration variables. Place this file at the project root before running any scripts.

### Development

```bash
npm run dev
```

Launches the Vite-powered dev server with React Router’s dev tools.  
Visit <http://localhost:5173> to explore.

> **Note:** Since this is a demo front-end, only the local `dev` workflow is officially supported here.

## Available Scripts

- `npm run dev` — Start the app in watch mode for local development.  
- `npm run build` — Compile production artifacts into `./build`.  
- `npm run start` — Serve the built app via React Router’s server-side renderer.  
- `npm run typecheck` — Generate route types & run the TypeScript compiler.  
- `npm run lint` / `npm run lint:fix` — Run ESLint (auto-fix mode available).

## Features (Front-End)

- **Dashboard:** View tasks and their statuses.  
- **Task Form:** Create, edit, and delete tasks.  
- **Email Preview:** Preview the tokenized approval link.  
- **Response Pages:** Simulated landing pages for approve/reject actions.

MIT © Johnley Delgado

