# CRNA App — Implementation Plan

Carolina Region of Narcotics Anonymous — SvelteKit PWA

---

## Goal

Rebuild the [NA-Carolina-App-Ionic-6](https://github.com/pjaudiomv/NA-Carolina-App-Ionic-6) as a high-quality, web-first PWA using SvelteKit + Svelte 5. Installable from the browser today; buildable for App Store / Play Store via Capacitor in the future.

---

## Tech Stack

| Concern | Choice |
|---------|--------|
| Framework | SvelteKit 2 + Svelte 5 |
| PWA | `vite-plugin-pwa` + Workbox |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Icons | `@lucide/svelte` (Svelte 5 native) |
| Meeting Finder | `crumb-widget` (npm) |
| Clean Time Calc | Custom TypeScript — no moment.js |
| JFT / SPAD | Static JSON (`src/lib/data/`) — 366-entry `MM-DD` keyed files |
| Events | CRNA WordPress REST API |
| Maps | Leaflet (bundled inside crumb-widget) |
| Storage | `localStorage` — clean date persistence |
| Native | Capacitor 8 — deferred to Phase 5 |

---

## Data Sources

| Data | Source |
|------|--------|
| Meetings | `https://bmlt.sezf.org/main_server/` — BMLT CRNA server |
| Just For Today | `src/lib/data/jft.json` (static, bundled) |
| Spiritual Principle A Day | `src/lib/data/spad.json` (static, bundled) |
| Events | `https://crna.org/crna_docs/crna-events-app.php` |
| Service contacts | `src/lib/data/contacts.json` (static, curated) |

---

## Routes

```
/             → Home — hero + quick-nav cards
/meetings     → Meeting Finder (crumb-widget + BMLT)
/calculator   → Clean Time Calculator + keytag milestones
/jft          → Just For Today (today auto-selected, prev/next nav)
/spad         → Spiritual Principle A Day (same structure as JFT)
/events       → Events (WordPress feed)
/contact      → Service bodies and links
/settings     → Theme toggle, clean date management, about
```

Navigation shell: fixed bottom nav (Home, Meetings, Calculator, Daily) + "More" slide-up drawer (Events, Contact, Settings).

---

## Feature Specs

### Home (`/`)
- Blue gradient hero with CRNA name
- 2×2 card grid + two full-width cards linking to all sections
- No data fetching — offline-safe

### Meeting Finder (`/meetings`)
- `crumb-widget` embedded full-page
- Config: `serverUrl = https://bmlt.sezf.org/main_server/`, CRNA service body IDs
- View: `'both'` (list + map toggle), geolocation enabled, distance unit `'mi'`
- Dark mode: `'auto'`

### Clean Time Calculator (`/calculator`)
- Month / day / year selectors (no calendar widget)
- Persists clean date to `localStorage` key `crna_clean_date`
- Displays: total days, human breakdown (Y yrs M mo D days)
- Keytag milestone grid: 1d, 30d, 60d, 90d, 6mo, 9mo, 18mo, 1yr, 2yr+
- Keytag color SVGs in `static/keytags/`
- Logic in `src/lib/cleantime.ts` — plain `Date` arithmetic, no external deps

### Just For Today (`/jft`)
- Load `src/lib/data/jft.json`
- Auto-select today via `MM-DD` key, fallback `01-01`
- Prev / next day navigation
- Shows: date, title, page ref, quote + source, body, thought/reflection
- Fully offline (bundled data)

### Spiritual Principle A Day (`/spad`)
- Identical structure to JFT
- Loads `src/lib/data/spad.json`

### Events (`/events`)
- Fetch `https://crna.org/crna_docs/crna-events-app.php`
- Chronological event cards: title, date, description, optional link
- Graceful offline/error state (cached or "check back later")

### Contact (`/contact`)
- Static data from `src/lib/data/contacts.json`
- Service body list with contact info
- Links: CRNA website, NA.org, BMLT

### Settings (`/settings`)
- Theme: Light / Dark / System — persists to `localStorage`, applied via `data-theme` on `<html>`
- Clean date: show stored date, button to clear
- About: version, source repo link

---

## Implementation Phases

### Phase 1 — Foundation ✅
- [x] Tailwind CSS 4 installed and configured
- [x] `vite-plugin-pwa` configured — manifest, service worker, Workbox precaching + runtime caching
- [x] `+layout.svelte` — bottom nav shell with slide-up "More" drawer (`svelte/transition`)
- [x] Home page — blue gradient hero, 2×2 card grid + full-width cards
- [x] Placeholder pages for all 7 routes (navigable, styled)
- [x] `capacitor.config.ts` updated — `appId: 'org.na.crna'`, `appName: 'CRNA'`
- [x] `app.html` — PWA meta tags (`viewport-fit=cover`, Apple web app, theme-color)
- [x] `@lucide/svelte` (Svelte 5 native) — replaces `lucide-svelte`
- [x] `vite build` produces clean static output, 0 type errors

### Phase 2 — Core Features
- [ ] Install `crumb-widget` + `leaflet`; embed and configure on `/meetings`
- [ ] Implement `src/lib/cleantime.ts` — milestone logic in plain TypeScript
- [ ] Build `/calculator` — date selectors, milestone grid, keytag SVGs
- [ ] Source and format `jft.json` (366 entries, `MM-DD` keys)
- [ ] Source and format `spad.json`
- [ ] Build `/jft` — reading display + prev/next navigation
- [ ] Build `/spad` — same as JFT

### Phase 3 — Secondary Features
- [ ] Build `/events` — fetch WordPress API, error/offline handling
- [ ] Build `/contact` — static service body data
- [ ] Build `/settings` — theme toggle wired to `data-theme` on `<html>`, clean date management
- [ ] Dark mode CSS variables in `app.css`

### Phase 4 — Polish & QA
- [ ] Proper PWA icons (192×192, 512×512, maskable) — replace favicon.png placeholder
- [ ] Lighthouse PWA audit (target: 100)
- [ ] Offline smoke test — all bundled pages work without network
- [ ] Responsive QA: 320px → 1440px
- [ ] Accessibility pass (WCAG AA)

### Phase 5 — Capacitor Native (Future)
- [ ] `npx cap add ios && npx cap add android`
- [ ] Test on simulators
- [ ] Splash + icon assets via `cordova-res`
- [ ] Remove `server` block from `capacitor.config.ts` before production build
- [ ] Submit to App Store / Play Store

---

## Notes & Decisions

- **`@lucide/svelte` not `lucide-svelte`** — the `@lucide/svelte` package is the Svelte 5 native version; exports `LucideIcon = Component<LucideProps>` for proper typing.
- **No moment.js** — clean time calc uses plain `Date` arithmetic.
- **Static JFT/SPAD** — bundled JSON, not scraped from `justforto.day` / `spiritualprinciplea.day` at runtime. Scraping is fragile.
- **Capacitor deferred** — template is already configured (`org.na.crna`). No native platforms added until Phase 5.
- **BMLT server** — `https://bmlt.sezf.org/main_server/`. Verify CRNA service body IDs before embedding in crumb-widget config.
- **Theme** — apply via `data-theme` attribute on `<html>`. Tailwind 4 uses `@variant dark` with selector strategy.
- **All routes prerendered** — `export const prerender = true` in root `+layout.js` covers all routes. No SSR, no server endpoints.
