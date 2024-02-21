// ==UserScript==
// @name         ReaderAdRemoval
// @namespace    http://tampermonkey.net/
// @version      1
// @description  AdRemoval
// @author       yihuanlin
// @match        https://*.ydxs8.com/*
// @icon         https://yhl.ac.cn/icon/Avatar.png
// @grant        none
// ==/UserScript==

(function () {
    var swiperContainers = document.querySelectorAll('.swiper-container');
    swiperContainers.forEach(function (element) {
        element.remove();
    });
    var swiperContainers = document.querySelectorAll('.category');
    swiperContainers.forEach(function (element) {
        element.remove();
    });
    var insElements = document.querySelectorAll('ins');
    insElements.forEach(function (element) {
        element.style.display = 'none';
    });
    var gsagewadwElements = document.querySelectorAll('[id^="gsagewadw"]');
    gsagewadwElements.forEach(function (element) {
        element.remove();
    });
})();