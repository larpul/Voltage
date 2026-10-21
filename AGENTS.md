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

## Routing Quirk
- Dashboard views are registered under their **child** path, so the Solar dashboard renders at `/`. Navigating to `/dashboards` matches the parent group route (no element) and shows the layout with an empty content area — that is not a broken page, use `/`.
- Auth-protected routes redirect to `/auth/minimal/login`. The form is pre-filled and accepts any credentials; the session lives in localStorage under `WINDOW_AUTH_SESSION`. The auth context shows a full-screen preloader for ~2s on every load, so wait for content rather than asserting immediately.
- Typecheck with `docker compose -f docker-compose.base44.yml exec -T web npx tsc --noEmit` (0 errors is the baseline).

## Plivo Dialer
- `src/components/Dashboards/Solar/PlivoDialerCard.tsx` renders in the Solar dashboard right after the Smart Scheduling card (`src/views/dashboards/index.tsx`); its logic is split into `.../Solar/dialer/` (`usePlivoDialer`, `DialerKeypad`, `RecentCallsList`, config + storage helpers).
- Uses the `plivo-browser-sdk` browser softphone (added to `package.json`). Runtime env: `VITE_PLIVO_ENDPOINT_USERNAME`, `VITE_PLIVO_ENDPOINT_PASSWORD`, optional `VITE_PLIVO_CALLER_ID`.
- With no endpoint credentials the card shows a "Setup required" badge and keeps Call disabled — the expected state, not a bug. Recent calls are kept in localStorage under `solar.plivoDialer.recentCalls` (last 8, per browser).
- Outbound calls only complete when the Plivo endpoint is attached to a Plivo application whose answer URL returns a `<Dial>` XML; that lives in the user's Plivo console, not in this repo.
- The endpoint password is client-side by design of the Plivo browser SDK and is therefore visible in the bundle — use a dedicated agent endpoint, not a Plivo account password.
