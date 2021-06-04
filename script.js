// Day & Night animations
let duration = 0.4;
let isDay = true;
let scale = 30;
let toNightAnimation = gsap.timeline();
if (!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    toNightAnimation.pause();
}
toNightAnimation
    .to(
        "#circle", {
            duration: duration,
            ease: "power4.in",
            scaleX: scale,
            scaleY: scale,
            x: 1,
            transformOrigin: "100% 50%",
        },
        0
    )
    .set(
        "#circle", {
            scaleX: -scale,
        },
        duration
    )
    .to(
        "#circle", {
            duration: duration,
            ease: "power4.out",
            scaleX: -1,
            scaleY: 1,
            x: 2,
        },
        duration
    )
    .fromTo(
        ".filter", {
            filter: "brightness(100%)",
        }, {
            filter: "brightness(50%)",
            duration: duration,
        },
        0
    )
    .to(
        ".nmtext,.nmbar", {
            color: "white",
            duration: duration * 2,
        },
        0
    )
    .to(
        ".nmbar", {
            background: "rgba(0,0,0,.3)",
            duration: duration * 2,
        },
        0
    )
    .fromTo(
        ".nmbar", {
            boxShadow: "0 0 18px rgba(70, 70, 40, .255)",
        }, {
            boxShadow: "0 0 18px rgba(0, 0, 0, .255)",
            duration: duration,
        },
        0
    )
    .to(
        "#cloud1", {
            fill: "#101010",
            duration: duration * 2,
        },
        0
    )
    .to(
        "#cloud2", {
            fill: "#191919",
            duration: duration * 2,
        },
        0
    )
    .to(
        "#cloud3", {
            fill: "#2a2a2a",
            duration: duration * 2,
        },
        0
    )
    .to(
        "#sun", {
            fill: "#3e3f57",
            duration: duration * 2,
        },
        0
    )
    .to(
        "#sunburst", {
            display: "none",
            duration: duration * 2,
        },
        0
    );

let stars = Array.from(document.getElementsByClassName("star"));
stars.map((star) =>
    gsap.to(star, {
        duration: "random(0.4, 1.5)",
        repeat: -1,
        yoyo: true,
        opacity: "random(0.2, 0.5)",
    })
);
gsap.to(".clouds-big", {
    duration: 15,
    repeat: -1,
    x: -74,
    ease: "linear",
});
gsap.to(".clouds-medium", {
    duration: 20,
    repeat: -1,
    x: -65,
    ease: "linear",
});
gsap.to(".clouds-small", {
    duration: 25,
    repeat: -1,
    x: -71,
    ease: "linear",
});

let switchToggle = document.getElementById("input");
switchToggle.addEventListener("change", () => toggle());

let toggle = () => {
    isDay = switchToggle.checked === true;
    if (isDay) {
        toNightAnimation.reverse();
    } else {
        toNightAnimation.play();
    }
};
// Clickeffects
function clickEffect(e) {
    var i = document.createElement("div");
    (i.className = "clickEffect"),
    (i.style.top = e.clientY + "px"),
    (i.style.left = e.clientX + "px"),
    document.body.appendChild(i),
        i.addEventListener(
            "animationend",
            function() {
                i.parentElement.removeChild(i);
            }.bind(this)
        );
}
document.addEventListener("click", clickEffect);
// Baidu search suggestions
var bid = document.getElementById("search_baidu");
bid.addEventListener("keyup", function() {
    if (!bid.value) {
        return;
    }
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://suggestion.baidu.com/su?wd=' + bid.value + '&cb=baidu';
    var h = document.getElementsByTagName('script')[0];
    h.parentNode.insertBefore(s, h);
}, false);

function baidu(keys) {
    var len = keys.s.length;
    var boxid = document.getElementById("keywordb");
    var hid = document.getElementById("googlebar");
    if (len === 0) {
        boxid.style.display = "none";
        hid.style.display = "block";
    } else {
        boxid.style.transform = "scaleY(1)";
        boxid.style.display = "block";
        hid.style.display = "none";
    }
    var spans = "";
    for (var i = 0; i < len; i++) {
        spans += "<span>" + keys.s[i] + "</span>";
    }
    boxid.innerHTML = spans;
    for (var i = 0; i < boxid.children.length; i++) {
        var ele = boxid.children[i];
        ele.onclick = function() {
            bid.value = this.innerHTML;
            bid.focus();
            tobaidu();
        };
    }
    document.body.addEventListener('click', function(evt) {
        var target = evt.target;
        if ((target.id !== "keywordb") && (target.id !== "baidubar") && (target.id !== "search_baidu")) {
            boxid.style.transform = "scaleY(0)";
            hid.style.display = "block";
            boxid.style.display = "none";
        }
    }, false);
}
// Google search suggestions
var gid = document.getElementById("search_google");
gid.addEventListener("keyup", function() {
    if (!gid.value) {
        return;
    }
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://suggestqueries.google.com/complete/search?q=' + gid.value + '&output=firefox&callback=google';
    var h = document.getElementsByTagName('script')[0];
    h.parentNode.insertBefore(s, h);
}, false);

function google(keys) {
    var len = keys[1].length;
    var boxid = document.getElementById("keywordg");
    var hid = document.getElementById("baidubar");
    if (len === 0) {
        boxid.style.display = "none";
        hid.style.display = "block";
    } else {
        boxid.style.transform = "scaleY(1)";
        boxid.style.display = "block";
        hid.style.display = "none";
    }
    var spans = "";
    for (var i = 0; i < len; i++) {
        spans += "<span>" + keys[1][i] + "</span>";
    }
    boxid.innerHTML = spans;
    for (var i = 0; i < boxid.children.length; i++) {
        var ele = boxid.children[i];
        ele.onclick = function() {
            gid.value = this.innerHTML;
            gid.focus();
            togoogle();
        };
    }
    document.body.addEventListener('click', function(evt) {
        var target = evt.target;
        if ((target.id !== "keywordb") && (target.id !== "googlebar") && (target.id !== "search_google")) {
            boxid.style.transform = "scaleY(0)";
            hid.style.display = "block";
            boxid.style.display = "none";
        }
    }, false);
}
// go to search results
function tobaidu() {
    return "" !== bid.value && ((window.location.href = "https://www.baidu.com/s?wd=" + bid.value), (bid.value = "")), !1;
}

function togoogle() {
    return "" !== gid.value && ((window.location.href = "https://www.google.com/search?q=" + gid.value), (gid.value = "")), !1;
}
// start of weather set up
gsap.registerPlugin(MotionPathPlugin);
if (window.innerWidth <= 717) {
    document.getElementById("card").classList.remove("nmbar");
}
var container = $("#weathercontainer");
var card = $("#card");
var innerSVG = Snap("#inner");
var outerSVG = Snap("#outer");
var backSVG = Snap("#back");
var weatherContainer1 = Snap.select("#layer1");
var weatherContainer2 = Snap.select("#layer2");
var weatherContainer3 = Snap.select("#layer3");
var innerRainHolder1 = weatherContainer1.group();
var innerRainHolder2 = weatherContainer2.group();
var innerRainHolder3 = weatherContainer3.group();
var innerLeafHolder = weatherContainer1.group();
var innerSnowHolder = weatherContainer1.group();
var innerLightningHolder = weatherContainer1.group();
var leafMask = outerSVG.rect();
var leaf = Snap.select("#leaf");
var sun = Snap.select("#sun");
var sunburst = Snap.select("#sunburst");
var outerSplashHolder = outerSVG.group();
var outerLeafHolder = outerSVG.group();
var outerSnowHolder = outerSVG.group();
var lightningTimeout;
outerLeafHolder.attr({
    "clip-path": leafMask,
});
var sizes = {
    container: {
        width: 0,
        height: 0,
    },
    card: {
        width: 0,
        height: 0,
    },
};
var clouds = [{
        group: Snap.select("#cloud1"),
    },
    {
        group: Snap.select("#cloud2"),
    },
    {
        group: Snap.select("#cloud3"),
    },
];
var weather = [{
        type: "snow",
    },
    {
        type: "wind",
    },
    {
        type: "rain",
    },
    {
        type: "thunder",
    },
    {
        type: "sun",
    },
    {
        type: "cloud",
    },
    {
        type: "haze",
    },
    {
        type: "drizzle",
    },
    {
        type: "clearwind",
    },
];
var settings = {
    windSpeed: 2,
    rainCount: 0,
    leafCount: 0,
    snowCount: 0,
    cloudHeight: 100,
    cloudSpace: 30,
    cloudArch: 50,
    renewCheck: 10,
    splashBounce: 80,
};
var tickCount = 0;
var rain = [];
var leafs = [];
var snow = [];
ipLookUp();

function init(index) {
    onResize();
    for (var i = 0; i < clouds.length; i++) {
        clouds[i].offset = Math.random() * sizes.card.width;
        drawCloud(clouds[i], i);
    }
    gsap.set(sunburst.node, {
        opacity: 0,
    });
    changeWeather(weather[index]);
}

function onResize() {
    sizes.container.width = container.width();
    sizes.container.height = container.height();
    sizes.card.width = card.width();
    sizes.card.height = card.height();
    innerSVG.attr({
        width: sizes.card.width,
        height: sizes.card.height,
    });
    outerSVG.attr({
        width: sizes.container.width,
        height: sizes.container.height,
    });
    backSVG.attr({
        width: sizes.container.width,
        height: sizes.container.height,
    });
    gsap.set(sunburst.node, {
        transformOrigin: "50% 50%",
        x: sizes.container.width / 2,
        y: sizes.container.height / 2,
    });
    gsap.fromTo(
        sunburst.node,
        20, {
            rotation: 0,
        }, {
            rotation: 360,
            repeat: -1,
            ease: "power0.inOut",
        }
    );
    leafMask.attr({
        x: 0,
        y: 0,
        width: sizes.container.width,
        height: sizes.container.height,
    });
}

function drawCloud(cloud, i) {
    var space = settings.cloudSpace * i;
    var height = space + settings.cloudHeight;
    var arch = height + settings.cloudArch + Math.random() * settings.cloudArch;
    var width = sizes.card.width;
    var points = [];
    points.push("M" + [-width, 0].join(","));
    points.push([width, 0].join(","));
    points.push("Q" + [width * 2, height / 2].join(","));
    points.push([width, height].join(","));
    points.push("Q" + [width * 0.5, arch].join(","));
    points.push([0, height].join(","));
    points.push("Q" + [width * -0.5, arch].join(","));
    points.push([-width, height].join(","));
    points.push("Q" + [-(width * 2), height / 2].join(","));
    points.push([-width, 0].join(","));

    var path = points.join(" ");
    if (!cloud.path) cloud.path = cloud.group.path();
    cloud.path.animate({
            d: path,
        },
        0
    );
}

function makeRain() {
    var lineWidth = Math.random() * 3;
    var lineLength = currentWeather.type == "thunder" ? 35 : 14;
    var x = Math.random() * (sizes.card.width - 40) + 20;
    var line = this["innerRainHolder" + (3 - Math.floor(lineWidth))].path("M0,0 0," + lineLength).attr({
        fill: "none",
        stroke: currentWeather.type == "thunder" ? "#777" : "#0000ff",
        strokeWidth: lineWidth,
    });
    rain.push(line);
    gsap.fromTo(
        line.node, {
            x: x,
            y: 0 - lineLength,
        }, {
            duration: 1,
            delay: Math.random(),
            y: sizes.card.height,
            ease: "power2.in",
            onComplete: onRainEnd,
            onCompleteParams: [line, lineWidth, x, currentWeather.type],
        }
    );
}

function onRainEnd(line, width, x, type) {
    line.remove();
    line = null;
    for (var i in rain) {
        if (!rain[i].paper) rain.splice(i, 1);
    }
    if (rain.length < settings.rainCount) {
        makeRain();
        if (width > 2) makeSplash(x, type);
    }
}

function makeSplash(x, type) {
    var splashLength = type == "thunder" ? 30 : 20;
    var splashBounce = type == "thunder" ? 120 : 100;
    var splashDistance = 80;
    var speed = type == "thunder" ? 0.7 : 0.5;
    var splashUp = 0 - Math.random() * splashBounce;
    var randomX = Math.random() * splashDistance - splashDistance / 2;
    var points = [];
    points.push("M" + 0 + "," + 0);
    points.push("Q" + randomX + "," + splashUp);
    points.push(randomX * 2 + "," + splashDistance);
    var splash = outerSplashHolder.path(points.join(" ")).attr({
        fill: "none",
        stroke: type == "thunder" ? "#777" : "#0000ff",
        strokeWidth: 1,
    });
    var pathLength = Snap.path.getTotalLength(splash);
    var xOffset = (sizes.container.width - sizes.card.width) / 2;
    var yOffset = (sizes.container.height - sizes.card.height) / 2 + sizes.card.height;
    splash.node.style.strokeDasharray = splashLength + " " + pathLength;
    gsap.fromTo(
        splash.node, {
            strokeWidth: 2,
            y: yOffset,
            x: xOffset + 20 + x,
            opacity: 1,
            strokeDashoffset: splashLength,
        }, {
            duration: speed,
            strokeWidth: 0,
            strokeDashoffset: -pathLength,
            opacity: 1,
            onComplete: onSplashComplete,
            onCompleteParams: [splash],
            ease: "slow(0.4, 0.1, false)",
        }
    );
}

function onSplashComplete(splash) {
    splash.remove();
    splash = null;
}

function makeLeaf() {
    var scale = 0.5 + Math.random() * 0.5;
    var newLeaf;
    var outerLeaf;
    var areaY = sizes.card.height / 2;
    var y = areaY + Math.random() * areaY;
    var endY = y - (Math.random() * (areaY * 2) - areaY);
    var x;
    var endX;
    var colors = ["#76993E", "#4A5E23", "#6D632F"];
    var color = colors[Math.floor(Math.random() * colors.length)];
    var xBezier;

    if (scale > 0.8) {
        outerLeaf = leaf.clone().appendTo(outerLeafHolder).attr({
            fill: color,
        });
        x = (sizes.container.width - sizes.card.width) / 2;
        y = y + 10;
        endY = endY + 10;
        xBezier = (sizes.container.width + x) / 2;
        endX = sizes.container.width + 50;
        leafs.push(outerLeaf);
        var motionPath = [{
                x: x,
                y: y,
            },
            {
                x: xBezier,
                y: Math.random() * endY + endY / 3,
            },
            {
                x: endX,
                y: endY,
            },
        ];
        gsap.fromTo(
            outerLeaf.node, {
                rotation: Math.random() * 180,
                x: x,
                y: areaY + Math.random() * areaY + 10,
                scale: scale,
            }, {
                duration: 2,
                rotation: Math.random() * 360,
                motionPath: motionPath,
                onComplete: onLeafEnd,
                onCompleteParams: [outerLeaf],
                ease: "power0.in",
            }
        );
    } else {
        newLeaf = leaf.clone().appendTo(innerLeafHolder).attr({
            fill: color,
        });
        x = -100;
        xBezier = sizes.card.width / 2;
        endX = sizes.card.width + 50;
        leafs.push(newLeaf);
        var motionPath = [{
                x: x,
                y: y,
            },
            {
                x: xBezier,
                y: Math.random() * endY + endY / 3,
            },
            {
                x: endX,
                y: endY,
            },
        ];
        gsap.fromTo(
            newLeaf.node, {
                rotation: Math.random() * 180,
                x: x,
                y: areaY + Math.random() * areaY,
                scale: scale,
            }, {
                duration: 2,
                rotation: Math.random() * 360,
                motionPath: motionPath,
                onComplete: onLeafEnd,
                onCompleteParams: [newLeaf],
                ease: "power0.in",
            }
        );
    }
    //	var motionPath = [{x:60, y:60}, {x:Math.random()*200+60, y:Math.random()*150+60}, {x:Math.random()*250+260, y:Math.random()*150+260}];
}

function onLeafEnd(leaf) {
    leaf.remove();
    leaf = null;
    for (var i in leafs) {
        if (!leafs[i].paper) leafs.splice(i, 1);
    }
    if (leafs.length < settings.leafCount) {
        makeLeaf();
    }
}

function makeSnow() {
    var scale = 0.5 + Math.random() * 0.5;
    var newSnow;
    var x = 20 + Math.random() * (sizes.card.width - 40);
    var endX; // = x - ((Math.random() * (areaX * 2)) - areaX)
    var y = -10;
    var endY;
    if (scale > 0.8) {
        newSnow = outerSnowHolder.circle(0, 0, 5).attr({
            fill: "white",
        });
        endY = sizes.container.height + 10;
        y = (sizes.container.height - sizes.card.height) / 2 + settings.cloudHeight;
        x = x + (sizes.container.width - sizes.card.width) / 2;
        //xBezier = x + (sizes.container.width - sizes.card.offset.left) / 2;
        //endX = sizes.container.width + 50;
    } else {
        newSnow = innerSnowHolder.circle(0, 0, 5).attr({
            fill: "white",
        });
        endY = sizes.card.height + 10;
        //x = -100;
        //xBezier = sizes.card.width / 2;
        //endX = sizes.card.width + 50;
    }

    snow.push(newSnow);

    gsap.fromTo(
        newSnow.node, {
            x: x,
            y: y,
        }, {
            duration: 3 + Math.random() * 5,
            y: endY,
            onComplete: onSnowEnd,
            onCompleteParams: [newSnow],
            ease: "power0.in",
        }
    );
    gsap.fromTo(
        newSnow.node, {
            scale: 0,
        }, {
            duration: 1,
            scale: scale,
            ease: "power1.inOut",
        }
    );
    gsap.to(newSnow.node, {
        duration: 2,
        x: x + (Math.random() * 150 - 75),
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
    });
}

function onSnowEnd(flake) {
    flake.remove();
    flake = null;

    for (var i in snow) {
        if (!snow[i].paper) snow.splice(i, 1);
    }

    if (snow.length < settings.snowCount) {
        makeSnow();
    }
}

function tick() {
    tickCount++;
    var check = tickCount % settings.renewCheck;

    if (check) {
        if (rain.length < settings.rainCount) makeRain();
        if (leafs.length < settings.leafCount) makeLeaf();
        if (snow.length < settings.snowCount) makeSnow();
    }

    for (var i = 0; i < clouds.length; i++) {
        if (currentWeather.type == "sun" || currentWeather.type == "clearwind") {
            if (clouds[i].offset > -(sizes.card.width * 1.5)) clouds[i].offset += settings.windSpeed / (i + 1);
            if (clouds[i].offset > sizes.card.width * 2.5) clouds[i].offset = -(sizes.card.width * 1.5);
            clouds[i].group.transform("t" + clouds[i].offset + "," + 0);
        } else {
            clouds[i].offset += settings.windSpeed / (i + 1);
            if (clouds[i].offset > sizes.card.width) clouds[i].offset = 0 + (clouds[i].offset - sizes.card.width);
            clouds[i].group.transform("t" + clouds[i].offset + "," + 0);
        }
    }

    requestAnimationFrame(tick);
}

function reset() {
    for (var i = 0; i < weather.length; i++) {
        container.removeClass(weather[i].type);
    }
}

function startLightningTimer() {
    if (lightningTimeout) clearTimeout(lightningTimeout);
    if (currentWeather.type == "thunder") {
        lightningTimeout = setTimeout(lightning, Math.random() * 6000);
    }
}

function lightning() {
    startLightningTimer();
    gsap.fromTo(
        card, {
            y: -30,
        }, {
            duration: 0.75,
            y: 0,
            ease: "elastic",
        }
    );

    var pathX = 30 + Math.random() * (sizes.card.width - 60);
    var yOffset = 20;
    var steps = 20;
    var points = [pathX + ",0"];
    for (var i = 0; i < steps; i++) {
        var x = pathX + (Math.random() * yOffset - yOffset / 2);
        var y = (sizes.card.height / steps) * (i + 1);
        points.push(x + "," + y);
    }

    var strike = weatherContainer1.path("M" + points.join(" ")).attr({
        fill: "none",
        stroke: "white",
        strokeWidth: 2 + Math.random(),
    });

    gsap.to(strike.node, {
        duration: 1,
        opacity: 0,
        ease: "power4.out",
        onComplete: function() {
            strike.remove();
            strike = null;
        },
    });
}

function changeWeather(weather) {
    if (weather.data) weather = weather.data;
    reset();

    currentWeather = weather;

    container.addClass(weather.type);

    // windSpeed

    switch (weather.type) {
        case "cloud":
            gsap.to(settings, {
                duration: 3,
                windSpeed: 1.5,
                ease: "power2.inOut",
            });
            break;
        case "wind":
            gsap.to(settings, {
                duration: 3,
                windSpeed: 8,
                ease: "power2.inOut",
            });
            break;
        case "sun":
        case "clearwind":
            gsap.to(settings, {
                duration: 3,
                windSpeed: 20,
                ease: "power2.inOut",
            });
            break;
        default:
            gsap.to(settings, {
                duration: 3,
                windSpeed: 0.5,
                ease: "power2.out",
            });
            break;
    }

    // rainCount

    switch (weather.type) {
        case "rain":
            gsap.to(settings, {
                duration: 3,
                rainCount: 20,
                ease: "power2.inOut",
            });
            break;
        case "drizzle":
            gsap.to(settings, {
                duration: 3,
                rainCount: 5,
                ease: "power2.inOut",
            });
            break;
        case "thunder":
            gsap.to(settings, {
                duration: 3,
                rainCount: 60,
                ease: "power2.inOut",
            });
            break;
        default:
            gsap.to(settings, {
                duration: 1,
                rainCount: 0,
                ease: "power2.out",
            });
            break;
    }

    // leafCount

    switch (weather.type) {
        case "wind":
        case "clearwind":
            gsap.to(settings, {
                duration: 3,
                leafCount: 5,
                ease: "power2.inOut",
            });
            break;
        default:
            gsap.to(settings, {
                duration: 1,
                leafCount: 0,
                ease: "power2.out",
            });
            break;
    }

    // snowCount

    switch (weather.type) {
        case "snow":
            gsap.to(settings, {
                duration: 3,
                snowCount: 40,
                ease: "power2.inOut",
            });
            break;
        default:
            gsap.to(settings, {
                duration: 1,
                snowCount: 0,
                ease: "power2.out",
            });
            break;
    }

    // sun position

    switch (weather.type) {
        case "sun":
        case "clearwind":
            gsap.to(sun.node, {
                duration: 4,
                x: sizes.card.width / 2,
                y: sizes.card.height / 2,
                ease: "power2.inOut",
            });
            if (window.innerWidth <= 717) {
                gsap.to(sunburst.node, {
                    duration: 4,
                    scale: 1,
                    opacity: 0.8,
                    y: sizes.container.height / 2 - 80,
                    ease: "power2.inOut",
                });
            } else {
                gsap.to(sunburst.node, {
                    duration: 4,
                    scale: 1,
                    opacity: 0.8,
                    y: sizes.container.height / 2,
                    ease: "power2.inOut",
                });
            }
            break;
        default:
            gsap.to(sun.node, {
                duration: 2,
                x: sizes.card.width / 2,
                y: -100,
                ease: "power2.inOut",
            });
            gsap.to(sunburst.node, {
                duration: 2,
                scale: 0.4,
                opacity: 0,
                y: sizes.container.height / 2 - 50,
                ease: "power2.inOut",
            });
            break;
    }

    // lightning

    startLightningTimer();
}
// end of weather set up
function ipLookUp() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "https://freegeoip.app/json/");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var response = JSON.parse(xhr.responseText);
            getWeather(response.longitude, response.latitude);
        }
    };
    xhr.send();
}

function getWeather(lon, lat) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "https://api.openweathermap.org/data/2.5/weather?lon=" + lon + "&lat=" + lat + "&appid=81687cda5c5bdb04678a2547f9a43d6d&units=metric");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var json = JSON.parse(xhr.responseText);
            handleJson(json);
        }
    };
    xhr.send();
}

!(function(e) {
    var n,
        t = {},
        o = "jinrishici-token";

    function i() {
        return 0;
    }

    function r(e, n) {
        var t = new XMLHttpRequest();
        t.open("get", n),
            (t.withCredentials = !0),
            t.send(),
            (t.onreadystatechange = function(n) {
                if (4 === t.readyState) {
                    var o = JSON.parse(t.responseText);
                    "success" === o.status ? e(o) : console.error("Hitokoto API failed to load, error message: " + o.errMessage);
                }
            });
    }
    (t.load = function(n) {
        return e.localStorage && e.localStorage.getItem(o) ?
            (function(e, n) {
                return r(e, "https://v2.jinrishici.com/one.json?client=browser-sdk/1.2&X-User-Token=" + encodeURIComponent(n));
            })(n, e.localStorage.getItem(o)) :
            (function(n) {
                return r(function(t) {
                    e.localStorage.setItem(o, t.token), n(t);
                }, "https://v2.jinrishici.com/one.json?client=browser-sdk/1.2");
            })(n);
    }),
    (e.jinrishici = t),
    i() ?
        c() :
        ((n = function() {
                i() && c();
            }),
            "loading" != document.readyState ?
            n() :
            document.addEventListener ?
            document.addEventListener("DOMContentLoaded", n) :
            document.attachEvent("onreadystatechange", function() {
                "complete" == document.readyState && n();
            }));
})(window);

function handleJson(json) {
    var realweather = json.weather[0].main;
    var weatherid = json.weather[0].id;
    document.getElementById("summary").innerHTML = realweather;
    document.getElementById("city").innerHTML = json.name + " &#xe901";
    document.getElementById("detail").innerHTML = json.weather[0].description;
    document.getElementById("temp").innerHTML = Math.round(json.main.temp * 10) / 10 + "<span>℃</span>";
    document.getElementById("temprange").innerHTML = "<p>" + Math.round(json.main.temp_min * 10) / 10 + "℃ to " + Math.round(json.main.temp_max * 10) / 10 + "℃</p><p> &#xe90b " + json.main.humidity + "%</p>";
    let i;
    if (realweather == "Snow") {
        i = 0;
    } else if (realweather == "Rain") {
        i = 2;
    } else if (realweather == "Thunderstorm") {
        i = 3;
    } else if (realweather == "Clear" && json.wind.speed < 6.7) {
        i = 4;
    } else if (realweather == "Clear") {
        i = 8;
    } else if (realweather == "Clouds" && json.wind.speed < 6.7) {
        i = 5;
    } else if (weatherid > 700 && weatherid < 800) {
        i = 6;
    } else if (realweather == "Drizzle") {
        i = 7;
    } else {
        i = 1;
    }
    init(i);

    window.addEventListener("resize", widgetResize);
    // start animations
    requestAnimationFrame(tick);
    document.getElementById("time").innerHTML = new Date().getHours() + ":" + checkTime(new Date().getMinutes());
    // realtime=setTimeout('getTime()', 20000)
    getSysSun(json.sys.sunrise, json.sys.sunset, json.timezone);
    jinrishici.load(function(result) {
        document.getElementById("hitokoto").innerHTML = result.data.content + "<p>──【" + result.data.origin.dynasty + "】" + result.data.origin.author + "《" + result.data.origin.title + "》</p>";
    });
}

function widgetResize() {
    onResize();
    for (var i = 0; i < clouds.length; i++) {
        clouds[i].offset = Math.random() * sizes.card.width;
        drawCloud(clouds[i], i);
    }
    changeWeather(currentWeather);
}

function checkTime(m) {
    if (m < 10) {
        m = "0" + m;
    }
    return m;
}

function loadStyleString(cssText) {
    var style = document.createElement("style");
    style.type = "text/css";
    try {
        style.appendChild(document.createTextNode(cssText));
    } catch (ex) {
        style.styleSheet.cssText = cssText;
    }
    document.getElementsByTagName("head")[0].appendChild(style);
}

function setBackground(sunrise, sunset) {
    risemin = sunrise.getUTCHours() * 60 + sunrise.getUTCMinutes();
    setmin = sunset.getUTCHours() * 60 + sunset.getUTCMinutes();
    noonmin = (risemin + setmin) / 2;
    realmin = new Date().getHours() * 60 + new Date().getMinutes();
    if (realmin <= risemin - 60) {
        i = "n5.webp";
        color = "#755be3";
    } else if (realmin > risemin - 60 && realmin <= risemin - 30) {
        i = "n6.webp";
        color = "#2a6a9e";
    } else if (realmin > risemin - 30 && realmin <= risemin) {
        i = "d0.webp";
        color = "#ed95d1";
    } else if (realmin > risemin && realmin <= risemin + 30) {
        i = "d1.webp";
        color = "#de9cd7";
    } else if (realmin > risemin + 30 && realmin <= risemin + 90) {
        i = "d2.webp";
        color = "#3c82cc";
    } else if (realmin > risemin + 90 && realmin <= risemin + 150) {
        i = "d3.webp";
        color = "#95bdcc";
    } else if (realmin > risemin + 150 && realmin <= risemin + 210) {
        i = "d4.webp";
        color = "#68c9f1";
    } else if (realmin > risemin + 210 && realmin <= noonmin + 60) {
        i = "d5.webp";
        color = "#2fa0e6";
    } else if (realmin > noonmin + 60 && realmin <= noonmin + 120) {
        i = "d6.webp";
        color = "#6b8b4c";
    } else if (realmin > noonmin + 120 && realmin <= setmin - 60) {
        i = "d7.webp";
        color = "#af5c18";
    } else if (realmin > setmin - 60 && realmin <= setmin) {
        i = "d8.webp";
        color = "#da644f";
    } else if (realmin > setmin && realmin <= setmin + 30) {
        i = "n0.webp";
        color = "#b6bbf5";
    } else if (realmin > setmin + 30 && realmin <= setmin + 60) {
        i = "n1.webp";
        color = "#897ddc";
    } else if (realmin > setmin + 60 && realmin <= setmin + 120) {
        i = "n2.webp";
        color = "#3e7ee3";
    } else if (realmin > setmin + 60 && realmin <= 1320) {
        i = "n3.webp";
        color = "#36315a";
    } else if (realmin > 1320) {
        i = "n4.webp";
        color = "#3d3d88";
    }
    css = "#fill_screen{background:url('./background/" + i + "') no-repeat local center center/cover;}";
    metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", color);
    loadStyleString(css);
}

function getSysSun(rise, set, timezone) {
    sunrise = new Date((rise + timezone) * 1000);
    sunset = new Date((set + timezone) * 1000);
    document.getElementById("temprange").insertAdjacentHTML("beforeend", "<p>&#xe9d6 " + sunrise.getUTCHours() + ":" + checkTime(sunrise.getUTCMinutes()) + " to " + sunset.getUTCHours() + ":" + checkTime(sunset.getUTCMinutes()) + "</p>");
    setBackground(sunrise, sunset);
}