const CACHE_NAME = 'haroon-exchange-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// تثبيت السيرفس وركر وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📌 CACHE OPENED');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// تفعيل السيرفس وركر
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  console.log('📌 SW ACTIVATED');
});

// اعتراض الطلبات وتقديمها من الكاش لو مافي نت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});