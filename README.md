# NA Region App — multi-region PWA

A high-quality, web-first PWA for a Narcotics Anonymous region. Built with SvelteKit + Svelte 5, installable from the browser today and designed to support App Store / Play Store builds via Capacitor.

One codebase, multiple regions: the app is parameterized by a build-time region (BMLT service body, events feed URL, branding, icons). See [Multi-region builds](#multi-region-builds) below.

This is a greenfield rebuild of [NA-Carolina-App-Ionic-6](https://github.com/pjaudiomv/NA-Carolina-App-Ionic-6).

## Tech Stack

- **SvelteKit 2 + Svelte 5** — framework and routing
- **Tailwind CSS 4** — styling
- **vite-plugin-pwa** — service worker, offline support, installability
- **Capacitor 8** — native iOS/Android shell (deferred; web-first for now)
- **@lucide/svelte** — Svelte 5 icon components
- **crumb-widget** — BMLT meeting finder (Phase 2)

## Development

```bash
npm install

# Local web dev (HMR, no device) — defaults to carolina region
npm run dev:start        # http://localhost:5001

# Dev server for a specific region
npm run dev:carolina
npm run dev:nc

# Type checking
npm run validate

# Production build (carolina is the default for `npm run build`)
npm run build            # alias for build:carolina
npm run build:carolina
npm run build:nc
```

## Multi-region builds

The app supports multiple NA regions from a single codebase. Each region has its own:

- **BMLT service body id** (aggregator lookup)
- **Events feed URL**
- **App name / short name / description / about text**
- **Icons** (favicon + PWA icons)
- **Theme color**

### Adding a new region

1. Create an env file `.env.<region>` at the repo root. Copy `.env.carolina` and adjust every `VITE_*` value. Required keys:
   - `VITE_SERVICE_BODY_ID` — BMLT aggregator service body id
   - `VITE_EVENTS_URL` — JSON endpoint for the events feed
   - `VITE_APP_NAME`, `VITE_APP_SHORT_NAME`, `VITE_REGION_NAME`
   - `VITE_APP_DESCRIPTION`, `VITE_ABOUT_TEXT`
   - `VITE_THEME_COLOR` (optional, defaults to `#1d4ed8`)
2. Create `regions/<region>/icons/` and drop in: `favicon.png`, `apple-touch-icon.png`, `icon-192x192.png`, `icon-512x512.png`, `icon-1024x1024.png`.
3. Add npm scripts in `package.json` (mirroring `build:carolina` / `dev:carolina`).
4. Build: `npm run build:<region>`. The `scripts/configure-region.mjs` prebuild step copies the region icons into `static/` and Vite picks up the matching `.env.<region>` via `--mode <region>`.

### How it works

- Runtime values live in [`src/lib/config.ts`](./src/lib/config.ts), which reads `import.meta.env.VITE_*` at build time.
- All UI copy, titles, fetch URLs, and storage keys import from that module — no hardcoded region strings in components.
- `vite.config.ts` uses `loadEnv(mode, ...)` to populate the PWA manifest (name, short_name, description, theme_color).
- Static icons are swapped by `scripts/configure-region.mjs` before every `dev:*` / `build:*` script.

## Device / Native (when ready)

```bash
# Add platforms (first time)
npx cap add android
npx cap add ios

# Build + open in native IDE
npm run build:android    # build → cap sync → Android Studio
npm run build:ios        # build → cap sync → Xcode

# Live reload on device
npm run dev:android
npm run dev:ios
```

For Android live reload, `capacitor.config.ts` has `server.url` pointing to `http://10.0.2.2:5001`. For iOS or physical devices, change to `http://<your-machine-ip>:5001`. **Remove the `server` block before a production build.**

## Splash Screen & Icons

```bash
# Add icon.png (512×512) and splash.png (1920×1920) to resources/
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```

## Routes

| Route | Feature |
|-------|---------|
| `/` | Home — hero + quick-nav cards |
| `/meetings` | Meeting finder (crumb-widget + BMLT) |
| `/calculator` | Clean time calculator + keytag milestones |
| `/jft` | Just For Today daily meditation |
| `/spad` | Spiritual Principle A Day |
| `/events` | Region events (JSON feed, configurable via `VITE_EVENTS_URL`) |
| `/contact` | Service bodies and helpful links |
| `/settings` | Theme, clean date, about |

## Data Sources

| Data | Source |
|------|--------|
| Meetings | `https://aggregator.bmltenabled.org/main_server/` (BMLT aggregator, filtered by `VITE_SERVICE_BODY_ID`) |
| Just For Today | `https://justforto.day/?format=json` |
| Spiritual Principle A Day | `https://spiritualprinciplea.day/?format=json` |
| Events | `VITE_EVENTS_URL` (per region) |
| Service contacts | BMLT aggregator `GetServiceBodies` (filtered by `VITE_SERVICE_BODY_ID`) |

## Project Status

See [PLAN.md](./PLAN.md) for the full implementation roadmap. Phase 1 (foundation) is complete.
