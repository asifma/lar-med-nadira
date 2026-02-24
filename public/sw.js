const CACHE_NAME = 'lmn-cache-v1';
const SHELL_URLS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192.svg',
    '/icon-512.svg',
];

// Install: cache the app shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_URLS))
    );
    self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch: NETWORK-FIRST strategy - always try to get latest from internet
self.addEventListener('fetch', (event) => {
    // Skip non-http(s) requests (chrome-extension, data:, blob:, etc.)
    if (!event.request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        // Try network first
        fetch(event.request)
            .then((response) => {
                // If successful, update cache with latest version
                if (event.request.method === 'GET' && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                }
                return response;
            })
            .catch(() => {
                // Network failed (offline) - use cache as fallback
                return caches.match(event.request).then((cached) => {
                    if (cached) {
                        return cached;
                    }
                    // If navigation request and no cache, return index.html
                    if (event.request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }
                    // Otherwise, let it fail
                    return new Response('Offline and not cached', { status: 503 });
                });
            })
    );
});
