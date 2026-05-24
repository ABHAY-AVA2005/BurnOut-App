// BurnOut PWA - Service Worker
// Handles offline caching with a Cache-First strategy

const CACHE_NAME = 'burnout-v1';
const OFFLINE_URL = '/offline.html';

// Assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/favicon.svg',
];

// ── INSTALL ─────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE ────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// ── FETCH ────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Never intercept Gemini / Google API calls (need live internet)
  if (
    url.hostname.includes('generativelanguage.googleapis.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    return; // let browser handle it normally
  }

  // For navigation requests → return index.html from cache (SPA fallback)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match('/index.html').then((r) => r || caches.match(OFFLINE_URL))
      )
    );
    return;
  }

  // Cache-first for everything else (assets, JS, CSS, images)
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          // Cache successful GET responses
          if (
            response.ok &&
            request.method === 'GET' &&
            !url.hostname.includes('googleapis.com')
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          // Return offline page for HTML requests
          if (request.headers.get('Accept')?.includes('text/html')) {
            return caches.match(OFFLINE_URL);
          }
        });
    })
  );
});
