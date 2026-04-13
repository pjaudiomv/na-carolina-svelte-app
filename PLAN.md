# CRNA App — Greenfield Rebuild Plan

Carolina Region of Narcotics Anonymous — SvelteKit PWA

---

## Goal

Rebuild the [NA-Carolina-App-Ionic-6](https://github.com/pjaudiomv/NA-Carolina-App-Ionic-6) as a high-quality, web-first PWA using SvelteKit + Svelte 5. The app should be installable from the browser today and buildable for the App Store / Play Store in the future via Capacitor. Start with feature parity, then improve.

---

## Tech Stack

| Concern | Choice | Reason |
|---------|--------|--------|
| Framework | SvelteKit 2 + Svelte 5 | Already bootstrapped in this repo |
| PWA | `vite-plugin-pwa` | Richer PWA control than Capacitor alone for web-first |
| Capacitor | Keep configured, build later | Native store builds when ready |
| Styling | Tailwind CSS 4 | Utility-first, Capacitor-friendly |
| Meeting Finder | `crumb-widget` (npm) | Official BMLT Svelte 5 widget |
| Clean Time Calc | Custom Svelte component | Port logic from `nacc.js`; avoid legacy jQuery dep |
| JFT / SPAD | Static JSON data files | 366-entry keyed JSON, no external HTTP needed |
| Events | CRNA WordPress REST API | Same endpoint as Ionic app |
| Maps | Leaflet (via crumb-widget) | Bundled inside crumb-widget already |
| Storage | `localStorage` wrapper | Clean date persistence (match existing behavior) |
| Icons / assets | `@capacitor/assets` + `sharp` | Already in devDeps |

---

## Data Sources

| Data | Source |
|------|--------|
| Meetings | `https://bmlt.sezf.org/main_server/` — BMLT CRNA server |
| Service bodies | BMLT `?switcher=GetServiceBodies` |
| Just For Today | `/src/lib/data/jft.json` (static, 366 entries, `MM-DD` keys) |
| Spiritual Principle A Day | `/src/lib/data/spad.json` (same shape) |
| Events | `https://crna.org/crna_docs/crna-events-app.php` (WordPress API) |
| Contacts / service groups | `/src/lib/data/contacts.json` (static, curated) |

---

## Routes / Pages

```
/                   → Home — tagline, quick-nav cards, today's anniversary count
/meetings           → Meeting Finder (crumb-widget, full-page)
/calculator         → Clean Time Calculator
/jft                → Just For Today (today's reading, auto-selected)
/spad               → Spiritual Principle A Day (today's reading, auto-selected)
/events             → Events (WordPress feed, list view)
/contact            → Service groups, links, credits
/settings           → Theme, clean date, language
```

SvelteKit file layout:
```
src/routes/
  +layout.svelte        ← shell: bottom nav, theme provider
  +layout.js            ← prerender=true (static export)
  +page.svelte          ← Home
  meetings/+page.svelte
  calculator/+page.svelte
  jft/+page.svelte
  spad/+page.svelte
  events/+page.svelte
  contact/+page.svelte
  settings/+page.svelte
```

---

## Feature Specs

### Home (`/`)
- Hero with CRNA logo + tagline
- Quick-nav grid cards (Meetings, Calculator, JFT, SPAD, Events)
- "Today's NA Birthday" — highlight of any CRNA anniversary today (nice-to-have)
- Offline-safe: no data fetching needed

### Meeting Finder (`/meetings`)
- Embed `crumb-widget` at full page height
- Config: `serverUrl = https://bmlt.sezf.org/main_server/`, `serviceBodyIds` = CRNA service body IDs
- View: `'both'` (list + map toggle)
- Geolocation enabled
- Distance unit: `'mi'`
- Dark mode: `'auto'`
- Columns: `['time', 'name', 'location', 'address', 'service_body']`

### Clean Time Calculator (`/calculator`)
- Date picker: month / day / year selectors (no calendar widget — match native look)
- Persist selected date to `localStorage` key `crna_clean_date`
- On calculate, show:
  - Total days clean
  - Human-readable breakdown: X years, X months, X days
  - Keytag milestone grid: 1d, 30d, 60d, 90d, 6mo, 9mo, 18mo, 1yr, 2yr+ 
  - Keytag color images (include as static SVGs in `/static/keytags/`)
- Logic source: port `moment-precise-range` style diff from `nacc.js` to plain TypeScript (no moment.js)

### Just For Today (`/jft`)
- Load `/src/lib/data/jft.json`
- Auto-select today's entry via `MM-DD` key, fallback to `01-01`
- Date navigation: prev / next day arrows
- Display: date header, title, page ref, pull quote + source, body paragraphs, thought/reflection
- Offline: data is bundled — works without network

### Spiritual Principle A Day (`/spad`)
- Same architecture as JFT, different dataset
- Load `/src/lib/data/spad.json`

### Events (`/events`)
- Fetch `https://crna.org/crna_docs/crna-events-app.php`
- Display chronological list of upcoming events
- Handle network errors gracefully (show cached or "check back later")
- Cards with: event title, date, description, optional link

### Contact (`/contact`)
- Static data from `contacts.json`
- Sections: Service bodies with contact info, links to CRNA website, NA.org, BMLT
- Credits: original app author, template credits

### Settings (`/settings`)
- Clean date: display stored date, button to clear/reset
- Theme: Light / Dark / System (persists to localStorage)
- Language: English only for v1, i18n-ready structure
- About: version number, source link

---

## PWA Configuration (`vite-plugin-pwa`)

```ts
// vite.config.ts
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'CRNA — Carolina Region NA',
    short_name: 'CRNA',
    theme_color: '#1a1a2e',
    background_color: '#1a1a2e',
    display: 'standalone',
    orientation: 'portrait',
    scope: '/',
    start_url: '/',
    icons: [ /* 192, 512, maskable */ ]
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/bmlt\.sezf\.org\/.*/,
        handler: 'NetworkFirst',
        options: { cacheName: 'bmlt-api', expiration: { maxAgeSeconds: 3600 } }
      },
      {
        urlPattern: /^https:\/\/crna\.org\/.*/,
        handler: 'NetworkFirst',
        options: { cacheName: 'crna-events', expiration: { maxAgeSeconds: 3600 } }
      }
    ]
  }
})
```

---

## Navigation Shell

Mobile-first bottom navigation bar (5 items) + optional hamburger/drawer for remaining items:

| Tab | Icon | Route |
|-----|------|-------|
| Home | house | `/` |
| Meetings | map-pin | `/meetings` |
| Calculator | calendar | `/calculator` |
| Daily | book-open | `/jft` (or `/spad`) |
| More | ellipsis | drawer → Events, Contact, Settings |

---

## Implementation Phases

### Phase 1 — Foundation
- [ ] Install and configure Tailwind CSS 4
- [ ] Install `vite-plugin-pwa` and configure manifest + service worker
- [ ] Create `+layout.svelte` with bottom nav shell
- [ ] Create Home page (`/`)
- [ ] Add PWA icons and splash assets to `/static/`
- [ ] Confirm `vite build` produces correct static output

### Phase 2 — Core Features
- [ ] Install `crumb-widget`, configure and embed on `/meetings`
- [ ] Implement Clean Time Calculator logic in TypeScript (`src/lib/cleantime.ts`)
- [ ] Build Calculator page (`/calculator`) with keytag display
- [ ] Source and format `jft.json` (port from southcoastalna or re-fetch)
- [ ] Source and format `spad.json`
- [ ] Build JFT and SPAD pages with day navigation

### Phase 3 — Secondary Features
- [ ] Build Events page with WordPress API fetch + error handling
- [ ] Build Contact page with static service body data
- [ ] Build Settings page (theme toggle, clean date management)
- [ ] Wire theme (light/dark/system) via CSS custom properties + `localStorage`

### Phase 4 — Polish & QA
- [ ] Lighthouse PWA audit (target: 100 PWA score)
- [ ] Offline smoke test: all bundled pages work without network
- [ ] Test crumb-widget with real BMLT data
- [ ] Responsive design QA: 320px → 1440px
- [ ] Add `manifest.json` to `src/` (already referenced in `app.html`)
- [ ] Accessibility pass (WCAG AA minimum)

### Phase 5 — Capacitor Native (Future)
- [ ] Update `capacitor.config.ts` with real `appId`
- [ ] `npx cap add ios && npx cap add android`
- [ ] Test on simulators
- [ ] Configure splash + icon assets via `cordova-res`
- [ ] Submit to stores

---

## Key Dependencies to Install

```bash
# Styling
npm install -D tailwindcss @tailwindcss/vite

# PWA
npm install -D vite-plugin-pwa workbox-window

# Meeting Finder
npm install crumb-widget leaflet
npm install -D @types/leaflet

# (Optional) Icons
npm install -D lucide-svelte
```

---

## Notes & Decisions

- **No moment.js** — clean time calculation will use native `Date` arithmetic. The logic is simple enough to write in ~50 lines of TypeScript.
- **Static JFT/SPAD** — do NOT fetch from `justforto.day` / `spiritualprinciplea.day` at runtime. The HTML-scraping approach in the Ionic app is fragile. Use bundled JSON like southcoastalna.
- **Capacitor deferred** — the existing template is already Capacitor-ready. Do not add Capacitor native platforms until Phase 5 to keep the dev loop fast.
- **BMLT server** — use `https://bmlt.sezf.org/main_server/` (same as both existing apps). Verify service body IDs for CRNA before hard-coding.
- **No i18n in v1** — build with English only. Use a consistent string constant pattern (`$lib/i18n.ts`) so Spanish can be added later without a full refactor.
- **Theme via CSS custom properties** — set `data-theme="dark"` on `<html>` and define all colors as CSS vars. Tailwind `darkMode: 'selector'` pairs with this cleanly.
