# Base44 Development Guide

## Project Overview
"Voltage" is a React + TypeScript + Vite admin dashboard template (by WRAPCODERS). Pure frontend — no backend, no database. Uses React 18, react-bootstrap, react-router-dom v6, and many chart/visualization libraries (apexcharts, chart.js, recharts).

## Running the App
- `docker compose -f docker-compose.base44.yml up -d` starts a Vite dev server on port 3000 with live reload.
- Dependencies install on container startup via `npm install` (node_modules in a named volume).
- No environment variables or secrets required to boot.

## Architecture
- `src/routes/index.tsx` — all route definitions (dashboards, apps, UI components, auth, pages).
- `src/views/dashboards/` — dashboard view pages (Ecommerce default at `/`, Analytics, CRM).
- `src/components/Dashboards/` — dashboard sub-components organized by type (Ecommerce, Analytics, CRM).
- `src/Layouts/` — layout components (Vertical, Horizontal, Default, Public).
- `src/assets/scss/` — SCSS overrides for Bootstrap components.
- Auth is mock-based (`src/views/auth/useAuth/useLogin.tsx`), no real backend.

## Key Notes
- The root route `/` renders the Ecommerce dashboard (not a landing page).
- `vite.config.ts` has `base: ""` and aliases `@` to `src/`.
- Vite v4 with `@vitejs/plugin-react`.
