self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open('nearby-cache').then(function (cache) {
      return cache.addAll([
        '/',
        '/vendors.html',
        '/manifest.json',
        'https://cdn.shopify.com/s/files/1/0947/2340/8240/files/icon-192.png?v=1748402115',
        'https://cdn.shopify.com/s/files/1/0947/2340/8240/files/icon_512.png?v=1748402101'
      ]);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
