var CACHE_NAME = 'search';
var urlsToCache = [
    "/index.html",
    "/script.min.js",
    "/style.min.js",
    ...
];
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});