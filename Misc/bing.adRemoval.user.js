// ==UserScript==
// @name         Bing AdRemoval
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Automatically remove ads from www.bing.com
// @author       yihuanlin
// @match        https://www.bing.com/*
// @icon         https:/yhl.ac.cn/icon/Avatar.png
// @grant        none
// ==/UserScript==

(function() {
    const removeElement = (selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements) {
            elements.forEach(el => el.remove());
        }
    };
    document.getElementById("id_p")?.setAttribute("src", "https://yhl.ac.cn/icon/Avatar.png");
    removeElement(".b_ad");
    removeElement(".b_spa_adblock");
    removeElement("#id_rh");
    removeElement("#id_n");
    removeElement("#id_nc");
    removeElement("#tob_rail_container");
    removeElement("#id_mobile");
    removeElement(".b_fullb");
    removeElement(".fdbk_thmb_root");
    setTimeout(() => {
        document.getElementById("id_p")?.setAttribute("src", "https://yhl.ac.cn/icon/Avatar.png");
    }, 1000);
})();
