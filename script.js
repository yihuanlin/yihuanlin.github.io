// Redirect to reverse proxy
function checkProtocol(url) {
  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    return ('https://' + url);
  } else {
    return (url);
  }
}

function redirectToReverseProxy(redirectURL) {
  redirectURL = checkProtocol(redirectURL).replace(/(https?:\/\/)([^\/]+)/g, (match, p1, p2) => {
    const newUrl = p2.replace(/\./g, '-') + '.hlyi.eu.org';
    return `${p1}${newUrl}`;
  });
  window.location = redirectURL;
}

const urlParams = new URLSearchParams(window.location.search);
url = urlParams.get("url");
if (url) {
  redirectToReverseProxy(url);
}

// Register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
// Clickeffects

function clickEffect(e) {
  const target = e.target;
  const boxid = document.getElementById('keywordg');
  if ((target.id == 'bingbar') || (target.id == 'search_bing')) {
    if (boxid.children.length > 0) {
      boxid.style.transform = 'scaleY(1)';
      boxid.style.display = 'block';
    }
  }
  if (!('ontouchstart' in window)) {
    document.getElementById('search_bing').focus();
  }
  const i = document.createElement('div');
  i.className = 'clickEffect';
  i.style.top = e.clientY + 'px';
  i.style.left = e.clientX + 'px';
  document.body.appendChild(i);
  i.addEventListener('animationend', function () {
    i.parentElement.removeChild(i);
  });
}
document.addEventListener('click', clickEffect);

// Google search suggestions

const gid = document.getElementById('search_bing');
const regex = /!(.*?)(?:\s|$)/;
gid.addEventListener('input', function () {
  if (!gid.value) {
    document.getElementById('keywordg').style.display = 'none';
    return;
  }
  if (regex.exec(gid.value)) {
    match = regex.exec(gid.value)[1];
    gidValue = gid.value.replace(regex, '');
  } else {
    match = undefined;
    gidValue = gid.value;
  }
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = 'https://suggestqueries.google.com/complete/search?q=' + gidValue + '&output=firefox&callback=bing';
  const h = document.getElementsByTagName('script')[0];
  h.parentNode.insertBefore(s, h);
}, false);

function bing(keys) {
  const len = keys[1].length;
  const boxid = document.getElementById('keywordg');
  if (len === 0) {
    boxid.style.display = 'none';
  } else {
    boxid.style.transform = 'scaleY(1)';
    boxid.style.display = 'block';
  }
  let spans = '';
  for (let i = 0; i < len; i++) {
    spans += '<span>' + keys[1][i] + '</span>';
  }
  boxid.innerHTML = spans;
  for (let i = 0; i < boxid.children.length; i++) {
    const ele = boxid.children[i];
    ele.onclick = function () {
      gidValue = this.innerHTML;
      gid.focus();
      tobing();
    };
  }
  let tabPressed = false;
  document.body.addEventListener('keydown', function (evt) {
    if (evt.key === 'Tab') {
      tabPressed = true;
    } else if (tabPressed && !isNaN(evt.key)) {
      const index = parseInt(evt.key) - 1;
      if (index >= 0 && index < boxid.children.length) {
        const ele = boxid.children[index];
        ele.click();
      }
    } else if (tabPressed && evt.key === '§') {
      return gidValue !== '' && ((redirectToReverseProxy(gidValue)), (gidValue = '')), false;
    } else if (evt.key === 'Escape' || evt.key === "Esc") {
      return gidValue !== '' && ((window.location.href = checkProtocol(gidValue)), (gidValue = '')), false;
    }
  }, false);

  document.body.addEventListener('keyup', function (evt) {
    if (evt.key === 'Tab') {
      tabPressed = false;
    }
  }, false);
  document.body.addEventListener('click', function (evt) {
    const target = evt.target;
    if ((target.id !== 'bingbar') && (target.id !== 'search_bing')) {
      boxid.style.transform = 'scaleY(0)';
      boxid.style.display = 'none';
    }
  }, false);
}

// go to search results
function isValidURL(str) {
  var a = document.createElement('a');
  a.href = str;
  var hostParts = a.host.split(".");
  return (hostParts.length === 3 && (a.host != window.location.host) || false);
}

function tobing() {
  if (gidValue.startsWith('https://') || gidValue.startsWith('http://')) {
    return gidValue !== '' && ((window.location.href = gidValue), (gidValue = '')), false;
  } else if (isValidURL("https://" + gidValue)) {
    return gidValue !== '' && ((window.location.href = "https://" + gidValue), (gidValue = '')), false;
  }
  switch (match) {
    case 'rp':
    case 'proxy':
      return gidValue !== '' && ((redirectToReverseProxy(gidValue)), (gidValue = '')), false;
    case 'zfin':
    case 'z':
      return gidValue !== '' && ((window.location.href = 'https://zfin.org/search?category=&q=' + gidValue), (gidValue = '')), false;
    case 'w':
    case 'wiki':
    case 'wikipedia':
      return gidValue !== '' && ((window.location.href = 'https://en.wikipedia.org/wiki/Special:Search?search=' + gidValue), (gidValue = '')), false;
    case 'wt':
    case 'wiktionary':
    case 'dict':
      return gidValue !== '' && ((window.location.href = 'https://en.wiktionary.org/wiki/Special:Search?go=Define&search=' + gidValue), (gidValue = '')), false;
    case 'gh':
      return gidValue !== '' && ((window.location.href = 'https://github.com/search?utf8=%E2%9C%93&q=' + gidValue), (gidValue = '')), false;
    case 'cs':
    case 'cons':
      return gidValue !== '' && ((window.location.href = 'https://consensus.app/results/?q=' + gidValue), (gidValue = '')), false;
    case 'csyn':
      return gidValue !== '' && ((window.location.href = 'https://consensus.app/results/?q=' + gidValue + "&synthesize=on"), (gidValue = '')), false;
    case 'cc':
    case 'ca':
    case 'consensus':
      return gidValue !== '' && ((window.location.href = 'https://consensus.app/results/?q=' + gidValue + "&synthesize=on&copilot=on"), (gidValue = '')), false;
    case 'bing':
    case 'copilot':
    case 'cp':
      return gidValue !== '' && ((window.location.href = 'https://www.bing.com/chat?iscopilotedu=1&sendquery=1&q=' + gidValue), (gidValue = '')), false;
    case 'c':
      return gidValue !== '' && ((window.location.href = 'https://chatgpt.com/?temporary-chat=true&q=' + gidValue), (gidValue = '')), false;
    case 'gpt':
    case 'chat':
      return gidValue !== '' && ((window.location.href = 'https://chatgpt.com/?model=gpt-4o&q=' + gidValue), (gidValue = '')), false;
    case 'pc':
    case 'chem':
    case 'pubchem':
      return gidValue !== '' && ((window.location.href = 'https://pubchem.ncbi.nlm.nih.gov/#query=' + gidValue), (gidValue = '')), false;
    case 'g':
    case 'google':
      return gidValue !== '' && ((window.location.href = 'https://www.google.com/search?q=' + gidValue), (gidValue = '')), false;
    case 'lf':
    case 'lofter':
      return gidValue !== '' && ((window.location.href = 'Misc/lofter.html?url=' + gidValue), (gidValue = '')), false;
    case 'bi':
    case 'bili':
      return gidValue !== '' && ((window.location.href = 'https://www.bilibili.com/search?keyword=' + gidValue), (gidValue = '')), false;
    case 'b':
    case 'bd':
      return gidValue !== '' && ((window.location.href = 'https://www.baidu.com/s?wd=' + gidValue), (gidValue = '')), false;
    case 's':
    case 'gs':
      return gidValue !== '' && ((window.location.href = 'https://scholar.google.com/scholar?q=' + gidValue), (gidValue = '')), false;
    case 'sougou':
      return gidValue !== '' && ((window.location.href = 'https://www.sogou.com/web?query=' + gidValue), (gidValue = '')), false;
    case '360':
      return gidValue !== '' && ((window.location.href = 'https://www.so.com/s?q=' + gidValue), (gidValue = '')), false;
    case 'l':
    case 'lofter':
      return gidValue !== '' && ((window.location.href = 'https://www.lofter.com/tag/' + gidValue), (gidValue = '')), false;
    case 'hoyo':
    case 'hoyolab':
      return gidValue !== '' && ((window.location.href = 'https://www.hoyolab.com/search?keyword=' + gidValue), (gidValue = '')), false;
    case 'gene':
      return gidValue !== '' && ((window.location.href = 'https://www.alliancegenome.org/search?q=' + gidValue), (gidValue = '')), false;
    case 'm':
    case 'pm':
    case 'pubmed':
      return gidValue !== '' && ((window.location.href = 'https://pubmed.ncbi.nlm.nih.gov/?term=' + gidValue), (gidValue = '')), false;
    case 'mhy':
    case 'ys':
    case 'gsi':
      return gidValue !== '' && ((window.location.href = 'https://www.miyoushe.com/ys/search?keyword=' + gidValue), (gidValue = '')), false;
    case 'hsr':
    case 'sr':
      return gidValue !== '' && ((window.location.href = 'https://www.miyoushe.com/sr/search?keyword=' + gidValue), (gidValue = '')), false;
    case 'anime':
    case 'ani':
      return gidValue !== '' && ((window.location.href = 'https://www.qkan8.com/index.php/vod/search.html?wd=' + gidValue), (gidValue = '')), false;
    case 'y':
    case 'yt':
    case 'youtube':
      return gidValue !== '' && ((window.location.href = 'https://www.youtube.com/results?search_query=' + gidValue), (gidValue = '')), false;
    case 'd':
    case 'ddg':
      return gidValue !== '' && ((window.location.href = 'https://duckduckgo.com/?q=' + gidValue), (gidValue = '')), false;
    case 'a':
    case 'amz':
      return gidValue !== '' && ((window.location.href = 'https://www.amazon.co.uk/s/?field-keywords=' + gidValue), (gidValue = '')), false;
    case 'ebay':
      return gidValue !== '' && ((window.location.href = 'https://www.ebay.co.uk/sch/i.html?_nkw=' + gidValue), (gidValue = '')), false;
    case 'app':
      return gidValue !== '' && ((window.location.href = 'https://appstorrent.ru/?do=search&subaction=search&story=' + gidValue), (gidValue = '')), false;
    case 'e':
    case 'ensembl':
      return gidValue !== '' && ((window.location.href = 'https://www.ensembl.org/Zebrafish/Search/Results?q=' + gidValue + ';facet_feature_type=;site=ensembl;facet_species=Zebrafish'), (gidValue = '')), false;
    case 'protocols':
    case 'pt':
    case 'p':
      return gidValue !== '' && ((window.location.href = 'https://www.protocols.io/search?q=' + gidValue), (gidValue = '')), false;
    case 'gi':
    case 'image':
      return gidValue !== '' && ((window.location.href = 'https://www.google.com/search?tbm=isch&q=' + gidValue), (gidValue = '')), false;
    case 'f':
    case 'fp':
      return gidValue !== '' && ((window.location.href = 'https://www.fpbase.org/search/?name__iexact=' + gidValue), (gidValue = '')), false;
    case 'gt':
    case 't':
    case 'translate':
      return gidValue !== '' && ((window.location.href = 'https://translate.google.com/#auto/en/' + gidValue), (gidValue = '')), false;
    case undefined:
    default:
      return gidValue !== '' && ((window.location.href = 'https://www.bing.com/search?q=' + gidValue), (gidValue = '')), false;
  }
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
var innerRainHolder1 = weatherContainer1.group()
var innerRainHolder2 = weatherContainer2.group()
var innerRainHolder3 = weatherContainer3.group()
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

function init(index) {
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

function onResize() {
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

function drawCloud(cloud, i) {
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

function makeRain() {
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

function onRainEnd(line, width, x, type) {
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

function makeSplash(x, type) {
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

function onSplashComplete(splash) {
  splash.remove()
  splash = null
}

function makeLeaf() {
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
}

function onLeafEnd(leaf) {
  leaf.remove()
  leaf = null
  for (const i in leafs) {
    if (!leafs[i].paper) leafs.splice(i, 1)
  }
  if (leafs.length < settings.leafCount) {
    makeLeaf()
  }
}

function makeSnow() {
  const scale = 0.5 + Math.random() * 0.5
  let newSnow
  let x = 20 + Math.random() * (sizes.card.width - 40)
  let y = -10
  let endY
  if (scale > 0.8) {
    newSnow = outerSnowHolder.circle(0, 0, 5).attr({
      fill: 'white'
    })
    endY = sizes.container.height + 10
    y = (sizes.container.height - sizes.card.height) / 2 + settings.cloudHeight
    x = x + (sizes.container.width - sizes.card.width) / 2
  } else {
    newSnow = innerSnowHolder.circle(0, 0, 5).attr({
      fill: 'white'
    })
    endY = sizes.card.height + 10
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

function onSnowEnd(flake) {
  flake.remove()
  flake = null

  for (const i in snow) {
    if (!snow[i].paper) snow.splice(i, 1)
  }

  if (snow.length < settings.snowCount) {
    makeSnow()
  }
}

function tick() {
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

function reset() {
  for (let i = 0; i < weather.length; i++) {
    container.classList.remove(weather[i].type)
  }
}

function startLightningTimer() {
  if (lightningTimeout) clearTimeout(lightningTimeout)
  if (currentWeather.type === 'thunder') {
    lightningTimeout = setTimeout(lightning, Math.random() * 6000)
  }
}

function lightning() {
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

function changeWeather(weather) {
  if (weather.data) weather = weather.data
  reset()

  currentWeather = weather

  container.classList.add(weather.type)

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
xhr.open('get', 'https://international.v1.hitokoto.cn/?c=i')
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    const response = JSON.parse(xhr.responseText)
    printH(response.hitokoto, response.from_who, response.from)
  }
}
xhr.send()

function getWeather() {
  const xhr = new XMLHttpRequest();
  xhr.open('get', 'https://api.weatherapi.com/v1/forecast.json?key=483957d90eb54b5d88552513210506&q=auto:ip&days=1');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        const astro = {
          sunrise: "07:05 AM",
          sunset: "06:50 PM"
        };
        const day = {
          maxtemp_c: "NA",
          mintemp_c: "NA"
        };
        const arr = {
          astro: astro,
          day: day
        };
        handleJson(0, 0, 0, 0, 10, 0, arr);
      } else {
        const response = JSON.parse(xhr.responseText);
        handleJson(
          response.location.name,
          response.current.temp_c,
          response.current.condition.text,
          response.current.condition.code,
          response.current.wind_kph,
          response.current.humidity,
          response.forecast.forecastday[0]
        );
      }
    }
  };
  xhr.send();
}

function handleJson(city, temp, weather, code, wind, humidity, arr) {
  const rise = arr.astro.sunrise.split(":");
  let rmin = parseFloat(rise[1].split(" ")[0]);
  let rminText = "";
  if (rmin < 10) {
    rminText = "0" + rmin.toString();
  } else {
    rminText = rmin.toString();
  }
  const set = arr.astro.sunset.split(":");
  let shr = parseFloat(set[0]);
  if (set[1].indexOf("PM") === 3) {
    shr = shr + 12;
  }
  const smin = parseFloat(set[1].split(" ")[0]);
  let i;
  let t;
  settings.windSpeed = wind / 10;
  if (code !== 0) {
    document.getElementById("city").innerHTML = city + " &#xe901";
    document.getElementById("detail").innerHTML = weather;
    document.getElementById("temp").innerHTML = temp + "°C";
    document.getElementById(
      "temprange"
    ).innerHTML = `<p>${arr.day.mintemp_c}°C to ${arr.day.maxtemp_c}°C</p><p> &#xe90b ${humidity}%</p><p>&#xe9d6 ${rise[0]}:${rminText} to ${shr}:${smin}</p>`;
    if (code === 1066 || code === 1069 || code === 1114 || (code > 1203 && code < 1238)) {
      i = 0;
      t = "Snow";
    } else if ((code > 1272 && code < 1283) || code === 1087) {
      i = 3;
      t = "Thunder";
    } else if (code === 1000 && wind < 29) {
      i = 4;
      t = "Clear";
      settings.windSpeed = 30;
    } else if (code === 1000) {
      i = 8;
      t = "Wind";
    } else if (code > 1002 && code < 1010 && wind < 29) {
      i = 5;
      t = "Cloud";
    } else if (code > 1002 && code < 1010) {
      i = 1;
      t = "Wind";
    } else if (code === 1030 || code === 1135 || code === 1147) {
      i = 6;
      t = "Fog";
    } else if (code === 1072 || (code > 1149 && code < 1172)) {
      i = 7;
      t = "Drizzle";
    } else {
      i = 2;
      t = "Rain";
    }
    document.getElementById("summary").innerHTML = t;
  } else {
    i = 5;
    document.getElementById("temp").innerHTML = "Offline";
  }
  document.getElementById("time").innerHTML = new Date().getHours() + ":" + checkTime(new Date().getMinutes());
  const risemin = parseFloat(rise[0]) * 60 + rmin;
  const setmin = shr * 60 + smin;
  setBackground(risemin, setmin);
  init(i);
  window.addEventListener("resize", widgetResize);
  requestAnimationFrame(tick);
}

function printH(content, author, origin) {
  if (author == null) {
    document.getElementById("hitokoto").innerHTML = content + '<p>──' + "《" + origin + "》</p>";
  } else {
    document.getElementById("hitokoto").innerHTML = content + '<p>──' + author + "《" + origin + "》</p>";
  }
}

function widgetResize() {
  onResize();
  for (let i = 0; i < clouds.length; i++) {
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

setInterval(() => {
  document.getElementById("time").innerHTML = new Date().getHours() + ":" + checkTime(new Date().getMinutes());
}, 60000);

setInterval(() => {
  getWeather();
}, 900000);

function loadStyleString(cssText) {
  const style = document.createElement("style");
  try {
    style.appendChild(document.createTextNode(cssText));
  } catch (ex) {
    style.styleSheet.cssText = cssText;
  }
  document.getElementsByTagName("head")[0].appendChild(style);
}

function setBackground(risemin, setmin) {
  const realmin = new Date().getHours() * 60 + new Date().getMinutes();
  let setint;
  let int;
  let i;
  let color;
  let hres = "0";
  let anime = "0";
  hres = urlParams.get("hres");
  if (hres == 1) {
    j = "-4x-AnimeSharp.webp";
  } else {
    j = ".webp";
  }
  anime = urlParams.get("anime");
  if (anime == 1) {
    int = (setmin - risemin) / 14;
    setint = (1440 - setmin) / 8;
    j = ".jpg";
    if (realmin <= risemin / 4) {
      i = "n4b";
      color = "#1e1518";
    } else if (realmin > risemin / 4 && realmin <= risemin / 2) {
      i = "n5";
      color = "#0f2d41";
    } else if (realmin > risemin / 2 && realmin <= 3 * risemin / 4) {
      i = "n6";
      color = "#090818";
    } else if (realmin > 3 * risemin / 4 && realmin <= risemin) {
      i = "d0";
      color = "#101f48";
    } else if (realmin > risemin && realmin <= risemin + int) {
      i = "d1";
      color = "#43558d";
    } else if (realmin > risemin + int && realmin <= risemin + int * 2) {
      i = "d1a";
      color = "#274625";
    } else if (realmin > risemin + int * 2 && realmin <= risemin + int * 3) {
      i = "d2";
      color = "#39a3e2";
    } else if (realmin > risemin + int * 3 && realmin <= risemin + int * 4) {
      i = "d3";
      color = "#776b5f";
    } else if (realmin > risemin + int * 4 && realmin <= risemin + int * 5) {
      i = "d4";
      color = "#cde6bf";
    } else if (realmin > risemin + int * 5 && realmin <= risemin + int * 6) {
      i = "d4a";
      color = "#dae1f5";
    } else if (realmin > risemin + int * 6 && realmin <= risemin + int * 7) {
      i = "d5";
      color = "#ffffff";
    } else if (realmin > risemin + int * 7 && realmin <= risemin + int * 8) {
      i = "d5a";
      color = "#ffffff";
    } else if (realmin > risemin + int * 8 && realmin <= risemin + int * 9) {
      i = "d5b";
      color = "#ffffff";
    } else if (realmin > risemin + int * 9 && realmin <= risemin + int * 10) {
      i = "d5c";
      color = "#f3f4f6";
    } else if (realmin > risemin + int * 10 && realmin <= risemin + int * 11) {
      i = "d5d";
      color = "#f5eee6";
    } else if (realmin > risemin + int * 11 && realmin <= risemin + int * 12) {
      i = "d5e";
      color = "#f2eeeb";
    } else if (realmin > risemin + int * 12 && realmin <= risemin + int * 13) {
      i = "d6";
      color = "#a8c5c1";
    } else if (realmin > risemin + int * 13 && realmin <= setmin) {
      i = "d7";
      color = "bB78473";
    } else if (realmin > setmin && realmin <= setmin + setint) {
      i = "d8";
      color = "#dadad8";
    } else if (realmin > setmin + setint && realmin <= setmin + setint * 2) {
      i = "n0";
      color = "#dbc3b9";
    } else if (realmin > setmin + setint * 2 && realmin <= setmin + setint * 3) {
      i = "n1";
      color = "#e9cdb8";
    } else if (realmin > setmin + setint * 3 && realmin <= setmin + setint * 4) {
      i = "n2";
      color = "#3c3c48";
    } else if (realmin > setmin + setint * 4 && realmin + setint * 5) {
      i = "n3";
      color = "#030713";
    } else if (realmin > setmin + setint * 5 && realmin + setint * 6) {
      i = "n3a";
      color = "#090818";
    } else if (realmin > setmin + setint * 6 && realmin + setint * 7) {
      i = "n4";
      color = "#1f1f27";
    } else {
      i = "n4a";
      color = "#1f1f27";
    }
  } else {
    int = (setmin - risemin) / 8;
    setint = (1440 - setmin) / 6;
    if (realmin <= risemin / 3) {
      i = "n5";
      color = "#755be3";
    } else if (realmin > risemin / 3 && realmin <= 2 * risemin / 2) {
      i = "n6";
      color = "#2a6a9e";
    } else if (realmin > 2 * risemin / 2 && realmin <= risemin) {
      i = "d0";
      color = "#ed95d1";
    } else if (realmin > risemin && realmin <= risemin + int / 2) {
      i = "d1";
      color = "#5e659b";
    } else if (realmin > risemin + int * 1.5 && realmin <= risemin + int * 2.5) {
      i = "d2";
      color = "#3c82cc";
    } else if (realmin > risemin + int * 2.5 && realmin <= risemin + int * 3.5) {
      i = "d3";
      color = "#95bdcc";
    } else if (realmin > risemin + int * 3.5 && realmin <= risemin + int * 4.5) {
      i = "d4";
      color = "#364e3d";
    } else if (realmin > risemin + int * 4.5 && realmin <= risemin + int * 5.5) {
      i = "d5";
      color = "#2fa0e6";
    } else if (realmin > risemin + int * 5.5 && realmin <= risemin + int * 6.5) {
      i = "d6";
      color = "#6b8b4c";
    } else if (realmin > risemin + int * 6.5 && realmin <= risemin + int * 7.5) {
      i = "d7";
      color = "#af5c18";
    } else if (realmin > risemin + int * 7.5 && realmin <= setmin + setint / 2) {
      i = "d8";
      color = "#da644f";
    } else if (realmin > setmin + setint / 2 && realmin <= setmin + setint * 1.5) {
      i = "n0";
      color = "#b6bbf5";
    } else if (realmin > setmin + setint * 1.5 && realmin <= setmin + setint * 2.5) {
      i = "n1";
      color = "#897ddc";
    } else if (realmin > setmin + setint * 2.5 && realmin <= setmin + setint * 3.5) {
      i = "n2";
      color = "#3e7ee3";
    } else if (realmin > setmin + setint * 3.5 && realmin + setint * 5) {
      i = "n3";
      color = "#36315a";
    } else {
      i = "n4";
      color = "#3d3d88";
    }
  }
  document.querySelector("meta[name=theme-color]").setAttribute("content", color);
  loadStyleString("#fill_screen{background:url('/background/" + i + j + "') no-repeat local center center/cover;}");
}

// Day & Night animations

const duration = 0.4;
let isDay = true;
const scale = 30;
const toNightAnimation = gsap.timeline();
if (!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  toNightAnimation.pause();
} else {
  document.getElementById("sunburst").style.display = "none";
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
    duration: duration,
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
    duration: duration,
  },
    0
  )
  .to(
    "#cloud2", {
    fill: "#191919",
    duration: duration,
  },
    0
  )
  .to(
    "#cloud3", {
    fill: "#2a2a2a",
    duration: duration,
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
    scale: "0",
    duration: duration * 2,
  },
    0
  );

const stars = Array.from(document.getElementsByClassName("star"));
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

const switchToggle = document.getElementById("input");
switchToggle.addEventListener("change", () => toggle());
const toggle = () => {
  isDay = switchToggle.checked === true;
  if (isDay) {
    if (currentWeather.type === "sun" || currentWeather.type === "clearwind") {
      document.getElementById("sunburst").style.display = "block";
    }
    toNightAnimation.reverse();
  } else {
    toNightAnimation.play();
  }
};