import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // auto updates the SW when a new version is deployed
      registerType: 'autoUpdate',
      // include all public assets in precache
      includeAssets: [
        'favicon.svg',
        'offline.html',
        'icons/*.png',
        'src/assets/*.png',
      ],
      manifest: {
        name: 'BurnOut — Elite HIIT & Gym Tracker',
        short_name: 'BurnOut',
        description:
          'Elite HIIT, cardio, and lower-body workout tracker with AI-powered custom plans. Fully offline-capable.',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#0b1d35',
        theme_color: '#22d3ee',
        categories: ['fitness', 'health', 'sports'],
        icons: [
          { src: '/icons/icon-72.png',  sizes: '72x72',   type: 'image/png' },
          { src: '/icons/icon-96.png',  sizes: '96x96',   type: 'image/png' },
          { src: '/icons/icon-128.png', sizes: '128x128', type: 'image/png' },
          { src: '/icons/icon-144.png', sizes: '144x144', type: 'image/png' },
          { src: '/icons/icon-152.png', sizes: '152x152', type: 'image/png' },
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/icons/icon-384.png', sizes: '384x384', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        // Cache strategy: CacheFirst for assets, NetworkFirst for HTML
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        // Don't cache Gemini/Google API calls
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/__vite/, /^\/api/],
        runtimeCaching: [
          // Google Fonts — StaleWhileRevalidate
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'burnout-google-fonts-stylesheets',
              expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'burnout-google-fonts-webfonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // App images — CacheFirst
          {
            urlPattern: /\.(?:png|jpg|jpeg|gif|webp|svg)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'burnout-images',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          // JS/CSS bundles — StaleWhileRevalidate
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'burnout-static-resources',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
          // Gemini API — NetworkOnly (no offline cache, needs internet)
          {
            urlPattern: /^https:\/\/generativelanguage\.googleapis\.com\/.*/i,
            handler: 'NetworkOnly',
            options: { cacheName: 'burnout-gemini-api' },
          },
        ],
      },
      devOptions: {
        // Enable SW in dev mode for testing
        enabled: true,
        type: 'module',
      },
    }),
  ],
})
