// ==UserScript==
// @name         AssessmentUCL/UCL Moodle Calculator
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Add a calculator to webpage
// @author       yihuanlin
// @match        https://moodle.ucl.ac.uk/*
// @match        https://europe.wiseflow.net/*
// @icon         https:/yhl.ac.cn/icon/Avatar.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var form = document.createElement("form");
    form.style.cssText = "all:initial;transparent;box-shadow:0 0 18px rgba(70,70,40,0.255);background-color:rgba(255,255,255,0.8);border-radius:50px;position:fixed;bottom:30px;left:40px;height:30px;z-index:9999;";
    form.setAttribute("class", "fromShortcuts");
    var input = document.createElement("input");
    input.style.cssText = "all:initial;background-color: transparent;height:30px;margin:0 10px;border:none;font-size:18px;";
    input.setAttribute("class", "fromShortcuts");
    input.setAttribute('size', 3);
    input.setAttribute("spellcheck", "false");
    var list = document.createElement("div");
    list.style.cssText = "all:initial;transparent;box-shadow:0 0 18px rgba(70,70,40,0.255);background-color:rgba(255,255,255,0.8);border-radius:20px;position:fixed;bottom:70px;left:40px;height:90px;z-index:9999;display:none;";
    list.setAttribute("class", "fromShortcuts");
    document.body.appendChild(form);
    form.appendChild(input);
    document.body.appendChild(list);
    document.querySelector('.userpicture').src = 'https://yhl.ac.cn/icon/Avatar.png';
    form.onsubmit = function() {
        window.open("https://www.bing.com/search?q=" + input.value, '_blank');
        return false
    }
    input.addEventListener('input', function() {
        try {
            input.setAttribute('size', Math.max(input.value.length, 3));
            let x = eval(input.value.replace("log", "Math.log10").replace("lg", "Math.log10").replace("ln", "Math.log").replace("sqrt", "Math.sqrt").replace("^", "**").replace("^", "**").replace("*", "*").replace("x", "*").replace("e*p", "Math.exp").replace("NA", "6.022e23").replace("R", "8.314").replace("F", "96485").replace("C", "2.998e8").replace("H", "6.626e-34").replace("K", "273.15"));
            let a = x.toExponential().split("e");
            let b = Math.round(a[0] * 1000) / 1000;
            b = b.toString() + "e" + a[1].replace("+", "");
            a = x.toFixed(3).replace(".000", "").replace("e+", "e");
            list.innerHTML = "<span style='margin:0 10px;line-height:30px;display:block;font-size:18px;'>" + x + "</span>" + "<span style='margin:0 10px;line-height:30px;display:block;font-size:18px;'>" + a + '</span>' + "<span style='margin:0 10px;line-height:30px;display:block;font-size:18px;'>" + b + '</span>';
            list.style.display = 'block';
            for (let i = 0; i < list.children.length; i++) {
                const span = list.children[i]
                span.onclick = function() {
                    navigator.clipboard.writeText(this.innerHTML);
                }
            }
        } catch (error) {
            list.style.display = 'none';
        }
    }, false);
})();