# Base44 Dev Environment

## Project Overview
Voltage is a frontend-only React + TypeScript + Vite admin dashboard template. No backend, database, or external services.

## Running the App
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
The Vite dev server runs on port 5173 inside the container, mapped to host port 3000. Live reload is active.

## Package Manager
npm (uses `package-lock.json`). Dependencies are installed via `npm ci` at container startup.

## Key Details
- Vite 4.4.9 with `@vitejs/plugin-react`
- Path alias `@` → `src/`
- `process.env` is defined as `{}` in vite.config.ts (shim for browser builds)
- No `.env` files required — the app is self-contained with mock data
