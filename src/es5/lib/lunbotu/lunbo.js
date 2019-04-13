"use strict";

/* 
* @Author: Marte
* @Date:   2019-04-01 17:06:30
* @Last Modified by:   Marte
* @Last Modified time: 2019-04-02 08:55:18
*/

(function ($) {

    $.fn.lunbo = function (opt) {
        var _this = this;

        var defaults = {
            width: "1200",
            height: "471",
            imgurl: [],
            type: "horizontal",
            idx: 0
        };
        var newopt = Object.assign({}, defaults, opt);
        var len = newopt.imgurl.length;
        var timer;
        var $ul;
        var init = function init() {
            $ul = $("<ul></ul>");
            $ul.appendTo($(_this).addClass('lunbo'));
            $page = $('<div></div>');
            $page.addClass('page').appendTo($(_this));
            for (var i = 0; i < len; i++) {
                $('<img src="' + newopt.imgurl[i] + '"/>').width(newopt.width).height(newopt.height).appendTo($('<li></li>').appendTo($ul));
                $('<span>' + (i + 1) + '</span>').appendTo($page);
            }
            $page.children().filter(":eq(" + newopt.idx + ")").addClass('active');
            $($ul.children()[0]).clone(true).appendTo($ul);
            $(_this).width(newopt.width).height(newopt.height);
            if (newopt.type == "horizontal") {
                $ul.width(newopt.width * (len + 1)).addClass('horizontal');
            } else if (newopt.type == "visible") {
                $ul.height(newopt.height * (len + 1));
            } else if (newopt.type = "faded") {
                $ul.height(newopt.height).width(newopt.width).addClass('faded');
            }
            dianji();
            move();
            ustop();
        };
        var move = function move() {
            timer = setInterval(function () {
                newopt.idx++;
                if (newopt.idx > len) {
                    $ul.css({ "left": 0, "top": 0 });
                    newopt.idx = 1;
                }
                yidong();
                gaoliang(newopt.idx);
            }, 2000);
        };
        var gaoliang = function gaoliang(idx) {
            if (idx == len) {
                idx = 0;
            }
            $page.children().not(":eq(" + idx + ")").removeClass('active');
            $page.children().filter(":eq(" + idx + ")").addClass('active');
        };
        var dianji = function dianji() {
            $page.on("click", "span", function () {
                newopt.idx = $(this).text() - 1;
                yidong();
                gaoliang(newopt.idx);
            });
        };
        var ustop = function ustop() {
            $(_this).hover(function () {
                clearInterval(timer);
            }, function () {
                move();
            });
        };

        var yidong = function yidong() {
            if (newopt.type == "horizontal") {
                $ul.stop(true).animate({ left: -newopt.idx * newopt.width }, 1000);
            } else if (newopt.type == "visible") {
                $ul.stop(true).animate({ top: -newopt.idx * newopt.height }, 1000);
            } else if (newopt.type = "faded") {
                $ul.stop(true).children().not(":eq(" + newopt.idx + ")").fadeOut(1000);
                $ul.stop(true).children().filter(":eq(" + newopt.idx + ")").fadeIn(1000);
            }
        };
        init();
    };
})(jQuery);