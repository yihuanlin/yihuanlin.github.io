self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('search')
            .then(function (cache) {
                return Promise.all([
                    cache.add("/index.html"),
                    cache.add("/script.min.js"),
                    cache.add("/style.min.css"),
                    cache.add("/font/icon.woff"),
                    cache.add("/font/comfortaa.woff"),
                    cache.add("/icon/server.svg"),
                    cache.add("/icon/lab.svg"),
                    cache.add("/icon/school.svg"),
                    cache.add("/icon/panel.svg"),
                    cache.add("/gsap.min.js"),
                    cache.add("/MotionPathPlugin.min.js"),
                    cache.add("/snap.svg.min.js"),
                    cache.addAll([
                        "/background/",
                        "/Misc/"
                    ])
                ]);
            })
    );
});