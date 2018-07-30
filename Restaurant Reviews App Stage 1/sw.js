var staticCacheName = "v1";
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log("opened cache")
            return cache.addAll([
                '/',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/css/styles.css',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg'
            ])

        })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request).then(resp => resp).catch(error => console.log(new Error(error)));
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheName => (
            Promise.all(cacheName.filter(cacheName =>
                cacheName.startsWith("v") && cacheName != staticCacheName
            ).map(cacheName => cache.delete(cacheName)))
        ))
    )
});