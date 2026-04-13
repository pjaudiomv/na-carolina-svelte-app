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
      manifestFilename: 'manifest.json',
      includeAssets: ['favicon.png', 'apple-touch-icon.png'],
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
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/bmlt\.sezf\.org\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'bmlt-api',
              expiration: { maxEntries: 50, maxAgeSeconds: 3600 }
            }
          },
          {
            urlPattern: /^https:\/\/crna\.org\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'crna-events',
              expiration: { maxEntries: 20, maxAgeSeconds: 3600 }
            }
          }
        ]
      }
    })
  ]
});
