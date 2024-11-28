const CACHE_NAME = 'mh-portfolio-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/background.js',
  '/effects.js',
  '/navigation.js',
  '/transitions.js',
  '/particles-config.js',
  '/favicon.svg',
  '/toast.js'
];

// Video uzantılarını tanımla
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg'];

// Service Worker Kurulumu
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Yeni service worker'ı hemen aktif et
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Eski cache'leri temizle
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Cache ve Network Stratejisi
self.addEventListener('fetch', (event) => {
  // WebSocket bağlantılarını yoksay
  if (event.request.url.includes('/ws')) {
    return;
  }

  // Video dosyaları için özel işlem
  if (VIDEO_EXTENSIONS.some(ext => event.request.url.toLowerCase().endsWith(ext))) {
    event.respondWith(
      fetch(event.request)
        .catch(error => {
          console.error('Video fetch failed:', error);
          return new Response('Video yüklenemedi', { 
            status: 404,
            headers: { 'Content-Type': 'text/plain' }
          });
        })
    );
    return;
  }

  // Diğer dosyalar için network-first stratejisi
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Başarılı network yanıtını cache'le
        if (response.ok && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Network başarısız olursa cache'den dene
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            // Cache'de de yoksa hata döndür
            return new Response('Bağlantı hatası', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});
