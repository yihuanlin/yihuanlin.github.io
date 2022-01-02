var appShellFiles = [
    "/index.html",
    "/script.min.js",
    "/style.min.js",
    "/icon/server.svg",
    "/icon/lab.svg",
    "/icon/school.svg",
    "/icon/panel.svg",
    "/background/n5.webp",
    "/background/n6.webp",
    "/background/d0.webp",
    "/background/d1.webp",
    "/background/d2.webp",
    "/background/d3.webp",
    "/background/d4.webp",
    "/background/d5.webp",
    "/background/d6.webp",
    "/background/d7.webp",
    "/background/d8.webp",
    "/background/n0.webp",
    "/background/n1.webp",
    "/background/n2.webp",
    "/background/n3.webp",
    "/background/n4.webp",
    "/gsap.min.js",
    "/MotionPathPlugin.min.js",
    "/snap.svg.min.js"
];
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(search)
            .then(function (cache) {
                return cache.addAll(appShellFiles);
            })
    );
});