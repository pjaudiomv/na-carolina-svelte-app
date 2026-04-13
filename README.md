# CRNA — Carolina Region Narcotics Anonymous

A high-quality, web-first PWA for the Carolina Region of Narcotics Anonymous. Built with SvelteKit + Svelte 5, installable from the browser today and designed to support App Store / Play Store builds via Capacitor in the future.

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

# Local web dev (HMR, no device)
npm run dev:start        # http://localhost:5001

# Type checking
npm run validate

# Production build
npm run build:app        # outputs to build/
```

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
| `/events` | CRNA events (WordPress feed) |
| `/contact` | Service bodies and helpful links |
| `/settings` | Theme, clean date, about |

## Data Sources

| Data | Source |
|------|--------|
| Meetings | `https://bmlt.sezf.org/main_server/` (BMLT) |
| Just For Today | `src/lib/data/jft.json` (static, 366 entries) |
| Spiritual Principle A Day | `src/lib/data/spad.json` (static, 366 entries) |
| Events | `https://crna.org/crna_docs/crna-events-app.php` |
| Service contacts | `src/lib/data/contacts.json` (static) |

## Project Status

See [PLAN.md](./PLAN.md) for the full implementation roadmap. Phase 1 (foundation) is complete.
