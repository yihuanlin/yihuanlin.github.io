var appShellFiles = [
    "/index.html",
    "/script.min.js",
    "/style.min.js",
    "/icon/server.svg",
    "/icon/lab.svg",
    "/icon/school.svg",
    "/icon/panel.svg",
    "/background/d0.jpg",
    "/background/d1.jpg",
    "/background/d1a.jpg",
    "/background/d2.jpg",
    "/background/d3.jpg",
    "/background/d4.jpg",
    "/background/d5.jpg",
    "/background/d6.jpg",
    "/background/d7.jpg",
    "/background/d8.jpg",
    "/background/n0.jpg",
    "/background/n1.jpg",
    "/background/n2.jpg",
    "/background/n3.jpg",
    "/background/n4.jpg",
    "/background/n5.jpg",
    "/background/n6.jpg",
    "/gsap.min.js",
    "/MotionPathPlugin.min.js",
    "/snap.svg.min.js"
];
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open("Search")
            .then(function (cache) {
                return cache.addAll(appShellFiles);
            })
    );
});