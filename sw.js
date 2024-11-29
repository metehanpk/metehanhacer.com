const CACHE_NAME = 'metehan-hacer-cache-v1';

// Base URL'i belirle
const isGitHubPages = self.location.hostname.includes('github.io');
const baseUrl = isGitHubPages ? '/metehanhacer.com' : '';

const urlsToCache = [
  `${baseUrl}/`,
  `${baseUrl}/index.html`,
  `${baseUrl}/style.css`,
  `${baseUrl}/main.js`,
  `${baseUrl}/effects.js`,
  `${baseUrl}/navigation.js`,
  `${baseUrl}/particles-config.js`,
  `${baseUrl}/transitions.js`,
  `${baseUrl}/toast.js`,
  `${baseUrl}/favicon.svg`,
  `${baseUrl}/assets/`
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache açıldı');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Cache yükleme hatası:', error);
      })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eski cache siliniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, then network
self.addEventListener('fetch', event => {
  // WebSocket isteklerini yoksay
  if (event.request.url.includes('ws')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
