var appShellFiles = [
    "/index.html",
    "/script.min.js",
    "/style.min.js",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/icon/cropped-search-32x32.png",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/icon/cropped-search-192x192.png",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/icon/cropped-search-180x180.png",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/icon/server.svg",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/icon/lab.svg",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/icon/school.svg",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/icon/panel.svg",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/n5.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/n6.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/d0.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/d1.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/d2.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/d3.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/d4.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/d5.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/d6.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/d7.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/d8.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/n0.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/n1.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/n2.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/n3.webp",
    "//cdn.jsdelivr.net/gh/yihuanlin/yihuanlin.github.io/background/n4.webp",
    "//cdn.jsdelivr.net/npm/gsap/dist/gsap.min.js",
    "//cdn.jsdelivr.net/npm/gsap/dist/MotionPathPlugin.min.js",
    "//cdn.jsdelivr.net/npm/snapsvg/dist/snap.svg.min.js"
];
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(search)
            .then(function (cache) {
                return cache.addAll(appShellFiles);
            })
    );
});