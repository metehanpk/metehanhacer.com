const CACHE_NAME = 'metehanhacer-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './main.js',
    './styles.css',
    './assets/zula_compressed.mp4',
    './assets/corporate_compressed.mp4',
    './assets/yeni_klip_compressed.mp4',
    './assets/halloween_compressed.mp4',
    './assets/son_deneme_compressed.mp4',
    './assets/sirk_compressed.mp4',
    './assets/4_compressed.mp4',
    './assets/3_compressed.mp4',
    './assets/comp_1_compressed.mp4',
    './assets/alevli_adidas_compressed.mp4'
];

// Video uzantılarını tanımla
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg'];

// Service Worker Kurulumu
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache ve Network Stratejisi
self.addEventListener('fetch', event => {
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
                    return caches.match(event.request)
                        .then(response => {
                            if (response) {
                                return response;
                            }
                            return new Response('Video yüklenemedi', { 
                                status: 404,
                                headers: { 'Content-Type': 'text/plain' }
                            });
                        });
                })
        );
        return;
    }

    // Diğer kaynaklar için cache-first stratejisi
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    response => {
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Eski cache'leri temizle
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
