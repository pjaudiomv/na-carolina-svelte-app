/// <reference types="vitest/config" />

import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const themeColor = env.VITE_THEME_COLOR || '#1d4ed8';

  return {
  plugins: [
    tailwindcss(),
    sveltekit(),
    svelteTesting(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifestFilename: 'manifest.json',
      includeAssets: ['favicon.png', 'apple-touch-icon.png', 'icon-192x192.png', 'icon-512x512.png'],
      manifest: {
        name: env.VITE_APP_NAME || 'NA Region App',
        short_name: env.VITE_APP_SHORT_NAME || 'NA',
        description: env.VITE_APP_DESCRIPTION || '',
        theme_color: themeColor,
        background_color: themeColor,
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
        skipWaiting: true,
        clientsClaim: true,
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
          // Region events feed
          {
            urlPattern: /^https:\/\/crna\.org\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'region-events',
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
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/unit/setup.ts',
    include: ['src/tests/unit/**/*.{test,spec}.{js,ts}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'cobertura'],
      include: ['src/**/*.{ts,svelte}'],
      exclude: ['src/tests/**', 'src/main.ts'],
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80
      }
    }
  }
  };
});
