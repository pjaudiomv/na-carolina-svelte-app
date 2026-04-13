import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifestFilename: 'manifest.json',
      includeAssets: ['favicon.png', 'apple-touch-icon.png', 'icon-192x192.png', 'icon-512x512.png'],
      manifest: {
        name: 'CRNA — Carolina Region NA',
        short_name: 'CRNA',
        description: 'Carolina Region Narcotics Anonymous — find meetings, track clean time, and read daily meditations.',
        theme_color: '#1d4ed8',
        background_color: '#1d4ed8',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        categories: ['lifestyle', 'health'],
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          // BMLT meeting data (aggregator — used by crumb-widget)
          {
            urlPattern: /^https:\/\/aggregator\.bmltenabled\.org\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'bmlt-meetings',
              expiration: { maxEntries: 100, maxAgeSeconds: 86400 },
              cacheableResponse: { statuses: [0, 200] },
              networkTimeoutSeconds: 5
            }
          },
          // JFT daily meditation
          {
            urlPattern: /^https:\/\/justforto\.day\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'jft-meditation',
              expiration: { maxEntries: 5, maxAgeSeconds: 86400 },
              cacheableResponse: { statuses: [0, 200] },
              networkTimeoutSeconds: 5
            }
          },
          // SPAD daily reading
          {
            urlPattern: /^https:\/\/spiritualprinciplea\.day\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'spad-reading',
              expiration: { maxEntries: 5, maxAgeSeconds: 86400 },
              cacheableResponse: { statuses: [0, 200] },
              networkTimeoutSeconds: 5
            }
          },
          // CRNA events
          {
            urlPattern: /^https:\/\/crna\.org\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'crna-events',
              expiration: { maxEntries: 20, maxAgeSeconds: 3600 },
              cacheableResponse: { statuses: [0, 200] },
              networkTimeoutSeconds: 5
            }
          },
          // Leaflet map tiles (used by crumb-widget)
          {
            urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles',
              expiration: { maxEntries: 500, maxAgeSeconds: 604800 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ]
});
