// register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
}
// Clickeffects
function clickEffect (e) {
  const i = document.createElement('div');
  (i.className = 'clickEffect'),
  (i.style.top = e.clientY + 'px'),
  (i.style.left = e.clientX + 'px'),
  document.body.appendChild(i),
  i.addEventListener(
    'animationend',
    function () {
      i.parentElement.removeChild(i)
    }
  )
}
document.addEventListener('click', clickEffect)
// Baidu search suggestions
const bid = document.getElementById('search_baidu')
bid.addEventListener('input', function () {
  if (!bid.value) {
    return
  }
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.src = 'https://suggestion.baidu.com/su?wd=' + bid.value + '&cb=baidu'
  const h = document.getElementsByTagName('script')[0]
  h.parentNode.insertBefore(s, h)
}, false)

function baidu (keys) {
  const len = keys.s.length
  const boxid = document.getElementById('keywordb')
  const hid = document.getElementById('googlebar')
  if (len === 0) {
    boxid.style.display = 'none'
    hid.style.display = 'block'
  } else {
    boxid.style.transform = 'scaleY(1)'
    boxid.style.display = 'block'
    hid.style.display = 'none'
  }
  let spans = ''
  for (let i = 0; i < len; i++) {
    spans += '<span>' + keys.s[i] + '</span>'
  }
  boxid.innerHTML = spans
  for (let i = 0; i < boxid.children.length; i++) {
    const ele = boxid.children[i]
    ele.onclick = function () {
      bid.value = this.innerHTML
      bid.focus()
      tobaidu()
    }
  }
  document.body.addEventListener('click', function (evt) {
    const target = evt.target
    if (target.id !== 'keywordb' && target.id !== 'baidubar' && target.id !== 'search_baidu') {
      boxid.style.transform = 'scaleY(0)'
      hid.style.display = 'block'
      boxid.style.display = 'none'
    }
  }, false)
}
// Google search suggestions
const gid = document.getElementById('search_google')
gid.addEventListener('input', function () {
  if (!gid.value) {
    return
  }
  const s = document.createElement('script')
  s.type = 'text/javascript'
  s.src = 'https://suggestqueries.google.com/complete/search?q=' + gid.value + '&output=firefox&callback=google'
  const h = document.getElementsByTagName('script')[0]
  h.parentNode.insertBefore(s, h)
}, false)

function google (keys) {
  const len = keys[1].length
  const boxid = document.getElementById('keywordg')
  const hid = document.getElementById('baidubar')
  if (len === 0) {
    boxid.style.display = 'none'
    hid.style.display = 'block'
  } else {
    boxid.style.transform = 'scaleY(1)'
    boxid.style.display = 'block'
    hid.style.display = 'none'
  }
  let spans = ''
  for (let i = 0; i < len; i++) {
    spans += '<span>' + keys[1][i] + '</span>'
  }
  boxid.innerHTML = spans
  for (let i = 0; i < boxid.children.length; i++) {
    const ele = boxid.children[i]
    ele.onclick = function () {
      gid.value = this.innerHTML
      gid.focus()
      togoogle()
    }
  }
  document.body.addEventListener('click', function (evt) {
    const target = evt.target
    if ((target.id !== 'keywordb') && (target.id !== 'googlebar') && (target.id !== 'search_google')) {
      boxid.style.transform = 'scaleY(0)'
      hid.style.display = 'block'
      boxid.style.display = 'none'
    }
  }, false)
}
// go to search results
function tobaidu () {
  return bid.value !== '' && ((window.location.href = 'https://www.baidu.com/s?wd=' + bid.value), (bid.value = '')), !1
}

function togoogle () {
  return gid.value !== '' && ((window.location.href = 'https://www.google.com/search?q=' + gid.value), (gid.value = '')), !1
}
// start of weather set up
gsap.registerPlugin(MotionPathPlugin)
const container = document.getElementById('weathercontainer')
const card = document.getElementById('card')
if (window.innerWidth <= 717) {
  card.classList.remove('nmbar')
}
const innerSVG = Snap('#inner')
const outerSVG = Snap('#outer')
const backSVG = Snap('#back')
const weatherContainer1 = Snap.select('#layer1')
const weatherContainer2 = Snap.select('#layer2')
const weatherContainer3 = Snap.select('#layer3')
const innerRainHolder1 = weatherContainer1.group()
const innerRainHolder2 = weatherContainer2.group()
const innerRainHolder3 = weatherContainer3.group()
const innerLeafHolder = weatherContainer1.group()
const innerSnowHolder = weatherContainer1.group()
const innerLightningHolder = weatherContainer1.group()
const leafMask = outerSVG.rect()
const leaf = Snap.select('#leaf')
const sun = Snap.select('#sun')
const sunburst = Snap.select('#sunburst')
const outerSplashHolder = outerSVG.group()
const outerLeafHolder = outerSVG.group()
const outerSnowHolder = outerSVG.group()
let currentWeather
let lightningTimeout
outerLeafHolder.attr({
  'clip-path': leafMask
})
const sizes = {
  container: {
    width: 0,
    height: 0
  },
  card: {
    width: 0,
    height: 0
  }
}
const clouds = [{
  group: Snap.select('#cloud1')
},
{
  group: Snap.select('#cloud2')
},
{
  group: Snap.select('#cloud3')
}
]
const weather = [{
  type: 'snow'
},
{
  type: 'wind'
},
{
  type: 'rain'
},
{
  type: 'thunder'
},
{
  type: 'sun'
},
{
  type: 'cloud'
},
{
  type: 'haze'
},
{
  type: 'drizzle'
},
{
  type: 'clearwind'
}
]
const settings = {
  windSpeed: 2,
  rainCount: 0,
  leafCount: 0,
  snowCount: 0,
  cloudHeight: 100,
  cloudSpace: 30,
  cloudArch: 50,
  renewCheck: 10,
  splashBounce: 80
}
let tickCount = 0
const rain = []
const leafs = []
const snow = []
getWeather()

function init (index) {
  onResize()
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].offset = Math.random() * sizes.card.width
    drawCloud(clouds[i], i)
  }
  gsap.set(sunburst.node, {
    opacity: 0
  })
  changeWeather(weather[index])
}

function onResize () {
  sizes.container.width = container.offsetWidth
  sizes.container.height = container.offsetHeight
  sizes.card.width = card.offsetWidth
  sizes.card.height = card.offsetHeight
  innerSVG.attr({
    width: sizes.card.width,
    height: sizes.card.height
  })
  outerSVG.attr({
    width: sizes.container.width,
    height: sizes.container.height
  })
  backSVG.attr({
    width: sizes.container.width,
    height: sizes.container.height
  })
  gsap.set(sunburst.node, {
    transformOrigin: '50% 50%',
    x: sizes.container.width / 2,
    y: sizes.container.height / 2
  })
  gsap.fromTo(
    sunburst.node,
    20, {
      rotation: 0
    }, {
      rotation: 360,
      repeat: -1,
      ease: 'power0.inOut'
    }
  )
  leafMask.attr({
    x: 0,
    y: 0,
    width: sizes.container.width,
    height: sizes.container.height
  })
}

function drawCloud (cloud, i) {
  const space = settings.cloudSpace * i
  const height = space + settings.cloudHeight
  const arch = height + settings.cloudArch + Math.random() * settings.cloudArch
  const width = sizes.card.width
  const points = []
  points.push('M' + [-width, 0].join(','))
  points.push([width, 0].join(','))
  points.push('Q' + [width * 2, height / 2].join(','))
  points.push([width, height].join(','))
  points.push('Q' + [width * 0.5, arch].join(','))
  points.push([0, height].join(','))
  points.push('Q' + [width * -0.5, arch].join(','))
  points.push([-width, height].join(','))
  points.push('Q' + [-(width * 2), height / 2].join(','))
  points.push([-width, 0].join(','))

  const path = points.join(' ')
  if (!cloud.path) cloud.path = cloud.group.path()
  cloud.path.animate({
    d: path
  },
  0
  )
}

function makeRain () {
  const lineWidth = Math.random() * 3
  const lineLength = currentWeather.type === 'thunder' ? 35 : 14
  const x = Math.random() * (sizes.card.width - 40) + 20
  const line = this['innerRainHolder' + (3 - Math.floor(lineWidth))].path('M0,0 0,' + lineLength).attr({
    fill: 'none',
    stroke: currentWeather.type === 'thunder' ? '#777' : '#0000ff',
    strokeWidth: lineWidth
  })
  rain.push(line)
  gsap.fromTo(
    line.node, {
      x: x,
      y: 0 - lineLength
    }, {
      duration: 1,
      delay: Math.random(),
      y: sizes.card.height,
      ease: 'power2.in',
      onComplete: onRainEnd,
      onCompleteParams: [line, lineWidth, x, currentWeather.type]
    }
  )
}

function onRainEnd (line, width, x, type) {
  line.remove()
  line = null
  for (const i in rain) {
    if (!rain[i].paper) rain.splice(i, 1)
  }
  if (rain.length < settings.rainCount) {
    makeRain()
    if (width > 2) makeSplash(x, type)
  }
}

function makeSplash (x, type) {
  const splashLength = type === 'thunder' ? 30 : 20
  const splashBounce = type === 'thunder' ? 120 : 100
  const splashDistance = 80
  const speed = type === 'thunder' ? 0.7 : 0.5
  const splashUp = 0 - Math.random() * splashBounce
  const randomX = Math.random() * splashDistance - splashDistance / 2
  const points = []
  points.push('M' + 0 + ',' + 0)
  points.push('Q' + randomX + ',' + splashUp)
  points.push(randomX * 2 + ',' + splashDistance)
  const splash = outerSplashHolder.path(points.join(' ')).attr({
    fill: 'none',
    stroke: type === 'thunder' ? '#777' : '#0000ff',
    strokeWidth: 1
  })
  const pathLength = Snap.path.getTotalLength(splash)
  const xOffset = (sizes.container.width - sizes.card.width) / 2
  const yOffset = (sizes.container.height - sizes.card.height) / 2 + sizes.card.height
  splash.node.style.strokeDasharray = splashLength + ' ' + pathLength
  gsap.fromTo(
    splash.node, {
      strokeWidth: 2,
      y: yOffset,
      x: xOffset + 20 + x,
      opacity: 1,
      strokeDashoffset: splashLength
    }, {
      duration: speed,
      strokeWidth: 0,
      strokeDashoffset: -pathLength,
      opacity: 1,
      onComplete: onSplashComplete,
      onCompleteParams: [splash],
      ease: 'slow(0.4, 0.1, false)'
    }
  )
}

function onSplashComplete (splash) {
  splash.remove()
  splash = null
}

function makeLeaf () {
  const scale = 0.5 + Math.random() * 0.5
  let newLeaf
  let outerLeaf
  const areaY = sizes.card.height / 2
  let y = areaY + Math.random() * areaY
  let endY = y - (Math.random() * (areaY * 2) - areaY)
  let x
  const colors = ['#76993E', '#4A5E23', '#6D632F']
  const color = colors[Math.floor(Math.random() * colors.length)]
  let xBezier

  if (scale > 0.8) {
    outerLeaf = leaf.clone().appendTo(outerLeafHolder).attr({
      fill: color
    })
    x = (sizes.container.width - sizes.card.width) / 2
    y = y + 10
    endY = endY + 10
    xBezier = (sizes.container.width + x) / 2
    leafs.push(outerLeaf)
    const motionPath = [{
      x: x,
      y: y
    },
    {
      x: xBezier,
      y: Math.random() * endY + endY / 3
    },
    {
      x: sizes.container.width + 50,
      y: endY
    }
    ]
    gsap.fromTo(
      outerLeaf.node, {
        rotation: Math.random() * 180,
        x: x,
        y: areaY + Math.random() * areaY + 10,
        scale: scale
      }, {
        duration: 2,
        rotation: Math.random() * 360,
        motionPath: motionPath,
        onComplete: onLeafEnd,
        onCompleteParams: [outerLeaf],
        ease: 'power0.in'
      }
    )
  } else {
    newLeaf = leaf.clone().appendTo(innerLeafHolder).attr({
      fill: color
    })
    x = -100
    xBezier = sizes.card.width / 2
    leafs.push(newLeaf)
    const motionPath = [{
      x: x,
      y: y
    },
    {
      x: xBezier,
      y: Math.random() * endY + endY / 3
    },
    {
      x: sizes.card.width + 50,
      y: endY
    }
    ]
    gsap.fromTo(
      newLeaf.node, {
        rotation: Math.random() * 180,
        x: x,
        y: areaY + Math.random() * areaY,
        scale: scale
      }, {
        duration: 2,
        rotation: Math.random() * 360,
        motionPath: motionPath,
        onComplete: onLeafEnd,
        onCompleteParams: [newLeaf],
        ease: 'power0.in'
      }
    )
  }
  // var motionPath = [{x:60, y:60}, {x:Math.random()*200+60, y:Math.random()*150+60}, {x:Math.random()*250+260, y:Math.random()*150+260}];
}

function onLeafEnd (leaf) {
  leaf.remove()
  leaf = null
  for (const i in leafs) {
    if (!leafs[i].paper) leafs.splice(i, 1)
  }
  if (leafs.length < settings.leafCount) {
    makeLeaf()
  }
}

function makeSnow () {
  const scale = 0.5 + Math.random() * 0.5
  let newSnow
  let x = 20 + Math.random() * (sizes.card.width - 40)
  // let endX = x - ((Math.random() * (areaX * 2)) - areaX)
  let y = -10
  let endY
  if (scale > 0.8) {
    newSnow = outerSnowHolder.circle(0, 0, 5).attr({
      fill: 'white'
    })
    endY = sizes.container.height + 10
    y = (sizes.container.height - sizes.card.height) / 2 + settings.cloudHeight
    x = x + (sizes.container.width - sizes.card.width) / 2
    // xBezier = x + (sizes.container.width - sizes.card.offset.left) / 2;
    // endX = sizes.container.width + 50;
  } else {
    newSnow = innerSnowHolder.circle(0, 0, 5).attr({
      fill: 'white'
    })
    endY = sizes.card.height + 10
    // x = -100;
    // xBezier = sizes.card.width / 2;
    // endX = sizes.card.width + 50;
  }

  snow.push(newSnow)

  gsap.fromTo(
    newSnow.node, {
      x: x,
      y: y
    }, {
      duration: 3 + Math.random() * 5,
      y: endY,
      onComplete: onSnowEnd,
      onCompleteParams: [newSnow],
      ease: 'power0.in'
    }
  )
  gsap.fromTo(
    newSnow.node, {
      scale: 0
    }, {
      duration: 1,
      scale: scale,
      ease: 'power1.inOut'
    }
  )
  gsap.to(newSnow.node, {
    duration: 2,
    x: x + (Math.random() * 150 - 75),
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  })
}

function onSnowEnd (flake) {
  flake.remove()
  flake = null

  for (const i in snow) {
    if (!snow[i].paper) snow.splice(i, 1)
  }

  if (snow.length < settings.snowCount) {
    makeSnow()
  }
}

function tick () {
  tickCount++
  const check = tickCount % settings.renewCheck

  if (check) {
    if (rain.length < settings.rainCount) makeRain()
    if (leafs.length < settings.leafCount) makeLeaf()
    if (snow.length < settings.snowCount) makeSnow()
  }

  for (let i = 0; i < clouds.length; i++) {
    if (currentWeather.type === 'sun' || currentWeather.type === 'clearwind') {
      if (clouds[i].offset > -(sizes.card.width * 1.5)) clouds[i].offset += settings.windSpeed / (i + 1)
      if (clouds[i].offset > sizes.card.width * 2.5) clouds[i].offset = -(sizes.card.width * 1.5)
      clouds[i].group.transform('t' + clouds[i].offset + ',' + 0)
    } else {
      clouds[i].offset += settings.windSpeed / (i + 1)
      if (clouds[i].offset > sizes.card.width) clouds[i].offset = 0 + (clouds[i].offset - sizes.card.width)
      clouds[i].group.transform('t' + clouds[i].offset + ',' + 0)
    }
  }

  requestAnimationFrame(tick)
}

function reset () {
  for (let i = 0; i < weather.length; i++) {
    container.classList.remove(weather[i].type)
  }
}

function startLightningTimer () {
  if (lightningTimeout) clearTimeout(lightningTimeout)
  if (currentWeather.type === 'thunder') {
    lightningTimeout = setTimeout(lightning, Math.random() * 6000)
  }
}

function lightning () {
  startLightningTimer()
  gsap.fromTo(
    card, {
      y: -30
    }, {
      duration: 0.75,
      y: 0,
      ease: 'elastic'
    }
  )

  const pathX = 30 + Math.random() * (sizes.card.width - 60)
  const yOffset = 20
  const steps = 20
  const points = [pathX + ',0']
  for (let i = 0; i < steps; i++) {
    const x = pathX + (Math.random() * yOffset - yOffset / 2)
    const y = (sizes.card.height / steps) * (i + 1)
    points.push(x + ',' + y)
  }

  let strike = weatherContainer1.path('M' + points.join(' ')).attr({
    fill: 'none',
    stroke: 'white',
    strokeWidth: 2 + Math.random()
  })

  gsap.to(strike.node, {
    duration: 1,
    opacity: 0,
    ease: 'power4.out',
    onComplete: function () {
      strike.remove()
      strike = null
    }
  })
}

function changeWeather (weather) {
  if (weather.data) weather = weather.data
  reset()

  currentWeather = weather

  container.classList.add(weather.type)

  // windSpeed

  switch (weather.type) {
    case 'cloud':
      gsap.to(settings, {
        duration: 3,
        windSpeed: 1.5,
        ease: 'power2.inOut'
      })
      break
    case 'wind':
      gsap.to(settings, {
        duration: 3,
        windSpeed: 8,
        ease: 'power2.inOut'
      })
      break
    case 'sun':
    case 'clearwind':
      gsap.to(settings, {
        duration: 3,
        windSpeed: 20,
        ease: 'power2.inOut'
      })
      break
    default:
      gsap.to(settings, {
        duration: 3,
        windSpeed: 0.5,
        ease: 'power2.out'
      })
      break
  }

  // rainCount

  switch (weather.type) {
    case 'rain':
      gsap.to(settings, {
        duration: 3,
        rainCount: 20,
        ease: 'power2.inOut'
      })
      break
    case 'drizzle':
      gsap.to(settings, {
        duration: 3,
        rainCount: 5,
        ease: 'power2.inOut'
      })
      break
    case 'thunder':
      gsap.to(settings, {
        duration: 3,
        rainCount: 60,
        ease: 'power2.inOut'
      })
      break
    default:
      gsap.to(settings, {
        duration: 1,
        rainCount: 0,
        ease: 'power2.out'
      })
      break
  }

  // leafCount

  switch (weather.type) {
    case 'wind':
    case 'clearwind':
      gsap.to(settings, {
        duration: 3,
        leafCount: 5,
        ease: 'power2.inOut'
      })
      break
    default:
      gsap.to(settings, {
        duration: 1,
        leafCount: 0,
        ease: 'power2.out'
      })
      break
  }

  // snowCount

  switch (weather.type) {
    case 'snow':
      gsap.to(settings, {
        duration: 3,
        snowCount: 40,
        ease: 'power2.inOut'
      })
      break
    default:
      gsap.to(settings, {
        duration: 1,
        snowCount: 0,
        ease: 'power2.out'
      })
      break
  }

  // sun position

  switch (weather.type) {
    case 'sun':
    case 'clearwind':
      gsap.to(sun.node, {
        duration: 4,
        x: sizes.card.width / 2,
        y: sizes.card.height / 2,
        ease: 'power2.inOut'
      })
      if (window.innerWidth <= 717) {
        gsap.to(sunburst.node, {
          duration: 4,
          scale: 1,
          opacity: 0.8,
          y: sizes.container.height / 2 - 80,
          ease: 'power2.inOut'
        })
      } else {
        gsap.to(sunburst.node, {
          duration: 4,
          scale: 1,
          opacity: 0.8,
          y: sizes.container.height / 2,
          ease: 'power2.inOut'
        })
      }
      break
    default:
      gsap.to(sun.node, {
        duration: 2,
        x: sizes.card.width / 2,
        y: -100,
        ease: 'power2.inOut'
      })
      gsap.to(sunburst.node, {
        duration: 2,
        scale: 0.4,
        opacity: 0,
        y: sizes.container.height / 2 - 50,
        ease: 'power2.inOut'
      })
      break
  }

  // lightning

  startLightningTimer()
}
// end of weather set up
const xhr = new XMLHttpRequest()
xhr.open('get', 'https://v1.hitokoto.cn/?c=i')
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    const response = JSON.parse(xhr.responseText)
    printH(response.hitokoto, response.from_who, response.from)
  }
}
xhr.send()

function getWeather () {
  const xhr = new XMLHttpRequest()
  xhr.open('get', 'https://api.weatherapi.com/v1/forecast.json?key=483957d90eb54b5d88552513210506&q=auto:ip&days=1')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const response = JSON.parse(xhr.responseText)
      handleJson(response.location.name, response.current.temp_c, response.current.condition.text, response.current.condition.code, response.current.wind_kph, response.current.humidity, response.forecast.forecastday[0])
    }
  }
  xhr.send()
}

function handleJson (city, temp, weather, code, wind, humidity, arr) {
  document.getElementById('city').innerHTML = city + ' &#xe901'
  document.getElementById('detail').innerHTML = weather
  document.getElementById('temp').innerHTML = temp + '<span>???</span>'
  const rise = arr.astro.sunrise.split(':')
  const rmin = parseFloat(rise[1].split(' ')[0])
  const set = arr.astro.sunset.split(':')
  let shr = parseFloat(set[0])
  if (set[1].indexOf('PM') === 3) {
    shr = shr + 12
  }
  const smin = parseFloat(set[1].split(' ')[0])
  document.getElementById('temprange').innerHTML = '<p>' + arr.day.mintemp_c + '??? to ' + arr.day.maxtemp_c + '???</p><p> &#xe90b ' + humidity + '%</p>' + '<p>&#xe9d6 ' + rise[0] + ':' + rmin + ' to ' + shr + ':' + smin + '</p>'
  let i
  let t
  if (code === 1066 || code === 1069 || code === 1114 || code === 1204 || code === 1207 || code === 1210 || code === 1213 || code === 1216 || code === 1219 || code === 1222 || code === 1225 || code === 1237 || code === 1249 || code === 1252 || code === 1255 || code === 1258 || code === 1261 || code === 1264 || code === 1279 || code === 1282) {
    i = 0
    t = 'Snow'
  } else if (code > 1272 && code < 1283) {
    i = 3
    t = 'Drizzle'
  } else if (code === 1000 && wind < 29) {
    i = 4
    t = 'Clear'
  } else if (code === 1000) {
    i = 8
    t = 'Wind'
  } else if (code > 1002 && code < 1010 && wind < 29) {
    i = 5
    t = 'Cloud'
  } else if (code > 1002 && code < 1010) {
    i = 1
    t = 'Wind'
  } else if (code === 1030 || code === 1135 || code === 1147) {
    i = 6
    t = 'Fog'
  } else if (code === 1072 || (code > 1149 && code < 1172)) {
    i = 7
  } else {
    i = 2
    t = 'Rain'
  }
  document.getElementById('summary').innerHTML = t
  document.getElementById('time').innerHTML = new Date().getHours() + ':' + checkTime(new Date().getMinutes())
  const risemin = parseFloat(rise[0]) * 60 + rmin
  const setmin = shr * 60 + smin
  setBackground(risemin, setmin)
  init(i)
  window.addEventListener('resize', widgetResize)
  // start animations
  requestAnimationFrame(tick)
}

function printH (content, author, origin) {
  if (author == null) {
    document.getElementById('hitokoto').innerHTML = content + '<p>??????' + '???' + origin + '???</p>'
  } else { document.getElementById('hitokoto').innerHTML = content + '<p>??????' + author + '???' + origin + '???</p>' }
}

function widgetResize () {
  onResize()
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].offset = Math.random() * sizes.card.width
    drawCloud(clouds[i], i)
  }
  changeWeather(currentWeather)
}

function checkTime (m) {
  if (m < 10) {
    m = '0' + m
  }
  return m
}

function loadStyleString (cssText) {
  const style = document.createElement('style')
  try {
    style.appendChild(document.createTextNode(cssText))
  } catch (ex) {
    style.styleSheet.cssText = cssText
  }
  document.getElementsByTagName('head')[0].appendChild(style)
}

function setBackground (risemin, setmin) {
  const int = (setmin - risemin) / 8
  const realmin = new Date().getHours() * 60 + new Date().getMinutes()
  let i
  let color
  if (realmin <= risemin - int * 1.5) {
    i = 'n5.webp'
    color = '#755be3'
  } else if (realmin > risemin - int * 1.5 && realmin <= risemin - int / 2) {
    i = 'n6.webp'
    color = '#2a6a9e'
  } else if (realmin > risemin - int / 2 && realmin <= risemin) {
    i = 'd0.webp'
    color = '#ed95d1'
  } else if (realmin > risemin && realmin <= risemin + int / 2) {
    i = 'd1.webp'
    color = '#de9cd7'
  } else if (realmin > risemin + int / 2 && realmin <= risemin + int * 1.5) {
    i = 'd2.webp'
    color = '#3c82cc'
  } else if (realmin > risemin + int * 1.5 && realmin <= risemin + int * 3) {
    i = 'd3.webp'
    color = '#95bdcc'
  } else if (realmin > risemin + int * 3 && realmin <= risemin + int * 4) {
    i = 'd4.webp'
    color = '#68c9f1'
  } else if (realmin > risemin + int * 4 && realmin <= risemin + int * 5) {
    i = 'd5.webp'
    color = '#2fa0e6'
  } else if (realmin > risemin + int * 5 && realmin <= risemin + int * 6) {
    i = 'd6.webp'
    color = '#6b8b4c'
  } else if (realmin > risemin + int * 6 && realmin <= risemin + int * 7.5) {
    i = 'd7.webp'
    color = '#af5c18'
  } else if (realmin > risemin + int * 7.5 && realmin <= setmin) {
    i = 'd8.webp'
    color = '#da644f'
  } else if (realmin > setmin && realmin <= setmin + int / 2) {
    i = 'n0.webp'
    color = '#b6bbf5'
  } else if (realmin > setmin + int / 2 && realmin <= setmin + int * 1.5) {
    i = 'n1.webp'
    color = '#897ddc'
  } else if (realmin > setmin + int * 1.5 && realmin <= setmin + int * 3) {
    i = 'n2.webp'
    color = '#3e7ee3'
  } else if (realmin > setmin + int * 3 && realmin <= 1320) {
    i = 'n3.webp'
    color = '#36315a'
  } else if (realmin > 1320) {
    i = 'n4.webp'
    color = '#3d3d88'
  }
  document.querySelector('meta[name=theme-color]').setAttribute('content', color)
  loadStyleString("#fill_screen{background:url('/background/" + i + "') no-repeat local center center/cover;}")
}
// Day & Night animations
const duration = 0.4
let isDay = true
const scale = 30
const toNightAnimation = gsap.timeline()
if (!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  toNightAnimation.pause()
} else {
  document.getElementById('sunburst').style.display = 'none'
}

toNightAnimation
  .to(
    '#circle', {
      duration: duration,
      ease: 'power4.in',
      scaleX: scale,
      scaleY: scale,
      x: 1,
      transformOrigin: '100% 50%'
    },
    0
  )
  .set(
    '#circle', {
      scaleX: -scale
    },
    duration
  )
  .to(
    '#circle', {
      duration: duration,
      ease: 'power4.out',
      scaleX: -1,
      scaleY: 1,
      x: 2
    },
    duration
  )
  .fromTo(
    '.filter', {
      filter: 'brightness(100%)'
    }, {
      filter: 'brightness(50%)',
      duration: duration
    },
    0
  )
  .to(
    '.nmtext,.nmbar', {
      color: 'white',
      duration: duration * 2
    },
    0
  )
  .to(
    '.nmbar', {
      background: 'rgba(0,0,0,.3)',
      duration: duration
    },
    0
  )
  .fromTo(
    '.nmbar', {
      boxShadow: '0 0 18px rgba(70, 70, 40, .255)'
    }, {
      boxShadow: '0 0 18px rgba(0, 0, 0, .255)',
      duration: duration
    },
    0
  )
  .to(
    '#cloud1', {
      fill: '#101010',
      duration: duration
    },
    0
  )
  .to(
    '#cloud2', {
      fill: '#191919',
      duration: duration
    },
    0
  )
  .to(
    '#cloud3', {
      fill: '#2a2a2a',
      duration: duration
    },
    0
  )
  .to(
    '#sun', {
      fill: '#3e3f57',
      duration: duration * 2
    },
    0
  )
  .to(
    '#sunburst', {
      opacity: '0',
      duration: duration * 2
    },
    0
  )

const stars = Array.from(document.getElementsByClassName('star'))
stars.map((star) =>
  gsap.to(star, {
    duration: 'random(0.4, 1.5)',
    repeat: -1,
    yoyo: true,
    opacity: 'random(0.2, 0.5)'
  })
)
gsap.to('.clouds-big', {
  duration: 15,
  repeat: -1,
  x: -74,
  ease: 'linear'
})
gsap.to('.clouds-medium', {
  duration: 20,
  repeat: -1,
  x: -65,
  ease: 'linear'
})
gsap.to('.clouds-small', {
  duration: 25,
  repeat: -1,
  x: -71,
  ease: 'linear'
})

const switchToggle = document.getElementById('input')
switchToggle.addEventListener('change', () => toggle())
const toggle = () => {
  isDay = switchToggle.checked === true
  if (isDay) {
    document.getElementById('sunburst').style.display = 'block'
    toNightAnimation.reverse()
  } else {
    toNightAnimation.play()
  }
}
