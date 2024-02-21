// ==UserScript==
// @name         SciAdRemoval
// @namespace    http://tampermonkey.net/
// @version      1
// @description  AdRemoval
// @author       yihuanlin
// @match        https://*.wikipedia.org/*
// @match        https://www.nature.com/*
// @match        https://www.thermofisher.com/*
// @match        https://www.researchgate.net/*
// @match        https://*.biomedcentral.com/*
// @icon         https://yhl.ac.cn/icon/Avatar.png
// @grant        none
// ==/UserScript==

(function() {
    var d = window.location.hostname;
    switch (d) {
        case "www.biomedcentral.com":
            document.querySelectorAll(".c-ad").forEach(el => el.remove());
            break;
        case "www.nature.com":
            document.querySelectorAll(".u-lazy-ad-wrapper").forEach(el => el.remove());
            break;
        case "www.thermofisher.com":
            document.getElementById("header-offer-bar").remove();
            break;
        case "www.researchgate.net":
            document.querySelectorAll(".research-resources-summary__inner").forEach(el => el.remove());
            document.querySelectorAll(".lite-page-ad").forEach(el => el.remove());
            break;
        case "en.wikipedia.org":
        case "en.m.wikipedia.org":
        default:
            document.getElementById("centralNotice").remove();
            document.querySelectorAll(".vector-body-before-content").forEach(el => el.remove());
            break;
    }
})();