// ==UserScript==
// @name         Lofter Downloader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically download all images in the lofter webpage
// @author       yihuanlin
// @match        https://*.lofter.com/post/*
// @icon         https:/yhl.ac.cn/icon/Avatar.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const images = document.getElementsByClassName("img");
    for (let i = 0; i < images.length; i++) {
        let src = images[i].children[0].children[0].src;
        let img = src.split("?")[0];
        let link = document.createElement('a');
        link.href = img;
        setTimeout(() => {
            link.click();
        }, 1000 * i);
    }
})();