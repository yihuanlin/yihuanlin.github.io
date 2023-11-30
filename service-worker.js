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
                    cache.add("/background/d0.jpg"),
                    cache.add("/background/d1.jpg"),
                    cache.add("/background/d1a.jpg"),
                    cache.add("/background/d2.jpg"),
                    cache.add("/background/d3.jpg"),
                    cache.add("/background/d4.jpg"),
                    cache.add("/background/d5.jpg"),
                    cache.add("/background/d6.jpg"),
                    cache.add("/background/d7.jpg"),
                    cache.add("/background/d8.jpg"),
                    cache.add("/background/n0.jpg"),
                    cache.add("/background/n1.jpg"),
                    cache.add("/background/n2.jpg"),
                    cache.add("/background/n3.jpg"),
                    cache.add("/background/n4.jpg"),
                    cache.add("/background/n5.jpg"),
                    cache.add("/background/n6.jpg"),
                    cache.add("/gsap.min.js"),
                    cache.add("/MotionPathPlugin.min.js"),
                    cache.add("/snap.svg.min.js")
                ]);
            })
    );
});