"use strict";

jQuery(function () {
    $(".car_footer").load("index.html #footer #fuwu");
    $(".car_header").load("index.html #header #topNav", function () {
        $.getScript("js/common.js", function () {
            dl();
            var user = $("#login_name").text();
            xhr(user);
            xhr2(1, user);
        });

        function operation(user) {
            $(".jianBtn").on("click", function () {
                var id = $(this).parents(".list").attr("data-id");
                if ($(this).next().val() != 1) {
                    xhr_count(id, "-", user, 0);
                }
            });
            $(".jiaBtn").on("click", function () {
                var id = $(this).parents(".list").attr("data-id");
                xhr_count(id, "+", user, 0);
            });
            $(".deleteBtn").on("click", function () {
                var id = $(this).parents(".list").attr("data-id");
                xhr_count(id, "", user, 1);
            });
            $(".clear_car").on("click", function () {
                xhr_count("*", "", user, 1);
            });
            $(".dele_ck").on("click", function () {
                var list = $(".li_ck").filter(":checked").parents(".list");
                $.each(list, function (idx, item) {
                    xhr_count(item.dataset.id, "", user, 1);
                });
            });
            $(".check_ll").on("click", function () {
                $(".check_ll").prop("checked", $(this).prop("checked"));
                $(".li_ck").prop("checked", $(this).prop("checked"));
            });
            $(".li_ck").on("click", function () {
                var cked = $(".li_ck").filter(":checked").length;
                var ck = $(".li_ck").length;
                $(".check_ll").prop("checked", ck == cked ? true : false);
            });
        }

        function totalva() {
            var add = 0;
            $(".totalvl").each(function () {
                add += Number($(this).text());
            });
            return add;
        }

        function xhr_count(id, count, user, type) {
            $.ajax({
                url: "api/car_count.php",
                data: { id: id, count: count, user: user, type: type },
                success: function success(s) {
                    if (s == "1") {
                        xhr(user);
                    }
                }
            });
        }

        function addCar(user) {
            $(".xy_addCar").on("click", function () {
                var id = $(this).parents("li").attr("data-id");
                $.ajax({
                    url: "api/add_car.php",
                    data: { id: id, user: user },
                    success: function success(res) {
                        xhr(user);
                    }
                });
            });
        }

        function xhr(user) {
            if (user != "") {
                $.ajax({
                    url: "api/ready_car.php",
                    data: { user: user },
                    success: function success(res) {
                        car_obj = JSON.parse(res);
                        render(car_obj);
                        operation(user);
                    }
                });
            }
        }

        function xhr2(page, user) {
            $.ajax({
                url: "api/list.php",
                data: { page: page, qty: 12 },
                success: function success(res) {
                    obj = JSON.parse(res);
                    render2(obj.data);
                    addCar(user);
                }
            });
        }

        function render(car_obj) {
            $(".car_lists").html($.map(car_obj, function (item, idx) {
                return "<div class=\"list\" data-id=\"" + item.com_id + "\">\n                                <ul class=\"clearfix\">\n                                    <li class=\"ck\">\n                                        <input type=\"checkbox\" class=\"li_ck\">\n                                    </li>\n                                    <li class=\"img_name\">\n                                        <img src=\"" + item.com_img + "\" alt=\"\" class=\"fl\">\n                                        <p class=\"fl\">" + item.com_name + "</p>\n                                    </li>\n                                    <li class=\"dangjia\">\n                                        \uFFE5<span class=\"z_price\">" + item.com_price + "</span>\n                                    </li>\n                                    <li class=\"youhui\">-</li>\n                                    <li class=\"yun\">\n                                        <input type=\"button\" class=\"jianBtn\" value=\"-\" /><input type=\"text\" value=\"" + item.count + "\"  class=\"shuLiang\" /><input type=\"button\" class=\"jiaBtn\" value=\"+\" />\n                                    </li>\n                                    <li class=\"zongjia\">\n                                        \uFFE5<span class=\"totalvl\">" + item.com_price * item.count + "</span>\n                                    </li>\n                                    <li class=\"caozuo\">\n                                        <a class=\"collectBtn\">\u6536\u85CF</a>\n                                        <a class=\"deleteBtn\">\u5220\u9664</a>\n                                    </li>\n                                </ul>\n                            </div>";
            }));
            $(".total_money").html(totalva());
        }

        function render2(xyobj) {
            $(".xy_libox").html($.map(xyobj, function (item, idx) {
                return "<li data-id=\"" + item.com_id + "\">\n                                <a class=\"go_goods\">\n                                    <img src=\"" + item.com_img + "\" alt=\"\">\n                                    <p>" + item.com_name + "</p>\n                                </a>\n                                <p>\uFFE5<span class=\"xy_money\">" + item.com_price + "</span></p>\n                                <span class=\"xy_addCar\"></span>\n                            </li>";
            }));
            $(".go_goods").on("click", function () {
                var id = $(this).parents("li").attr("data-id");
                location.href = "html/goods.html?comId=" + id;
            });
        }
    });
});
'use strict';

//1.封装a-b的随机整数，包含a、b
function getRandomNum(a, b) {
	return parseInt(Math.random() * (b - a + 1) + a);
}

//2.封装一个随机颜色 rgb(0-255,0-255,0-255)
function getRandomColor() {
	var r = getRandomNum(0, 255);
	var g = getRandomNum(0, 255);
	var b = getRandomNum(0, 255);
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

//3.封装获取元素节点
var Element = {
	// 1.从所有节点的数组中，过滤出来只有元素节点的数组
	getElement: function getElement(nodes) {
		var eleArr = [];
		// eleArr = Array.prototype.filter.call(nodes,function(item){
		// 	return item.nodeType == 1;
		// })
		nodes.forEach(function (item) {
			if (item.nodeType == 1) {
				eleArr.push(item);
			}
		});
		return eleArr;
	},
	//2.获取所有子元素节点
	getSonElement: function getSonElement(parent) {
		return this.getElement(parent.childNodes);
	},
	//3.获取到下一个兄弟元素节点
	getNextElement: function getNextElement(current) {
		var next = current.nextSibling;
		if (next.nodeType != 1) {
			next = next.nextSibling;
		}
		return next;
	}
	//...

	//4.获取css样式
};function getStyle(ele, key) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(ele)[key];
	} else if (ele.currentStyle) {
		return ele.currentStyle[key];
	} else {
		return ele.style[key];
	}
}

// 5.事件绑定，兼容浏览器
function bind(ele, type, fn, iscapture) {
	if (ele.addEventListener) {
		ele.addEventListener(type, fn, iscapture);
	} else if (ele.attachEvent) {
		ele.attachEvent("on" + type, fn);
	} else {
		ele["on" + type] = fn;
	}
}

//封装匀速动画


//封装缓冲动画
// 开启定时器
//     （1）获取当前值，赋给变量
//     （2）动态计算速度。(目标值-当前值)/10.若为正值则向上取整，负值则向下取整
//     （3）对变量进行更新
//      * 在赋值样式之前进行边界处理：判断目标值==当前值，清除定时器
//     （4）将变量的更新后的值赋给样式
// *在事件里面使用定时器，一开始要清除定时器

//基础版
//1.获取到的当前值是有单位的
//(1)如何获取单位
//(2)如何只要current的值
//2.透明度变大100倍
// * 目标值的问题


// function bufferAnimation(ele,key,target,timer){
// 	target = key == "opacity"? target *100 : target;
// 	clearInterval(ele[key+"timer"]);
// 	ele[key+"timer"] = setInterval(function(){
// 		var current = window.getComputedStyle(ele)[key];//120px
// 		var unit = current.match(/[a-z]+/);
// 		unit = unit? unit[0] : "";
// 		current = parseFloat(current); 
// 		current = key == "opacity"? current *100 : current;
// 		var speed = (target-current)/10;
// 		speed = speed>0? Math.ceil(speed) : Math.floor(speed);
// 		current += speed;
// 		if(current == target){
// 			clearInterval(ele[key+"timer"]);
// 		}
// 		current = key == "opacity"? current/100 : current;
// 		ele.style[key] = current + unit;
// 	},timer)

// }

//进阶版
//1.考虑传递多个属性，用对象。
//	* for循环比定时器快。
//		* 块级作用域 
//		* 局部作用域
//2.等待所有动画执行完毕后，帮你执行回调函数
//	利用count统计有多少个动画，每执行完一次动画，count--。当count
// 为0，说明所有动画执行完毕，此时帮你执行回调函数
//3.判断传入的fn是否为函数，函数才执行

// 甲
function bufferAnimation(ele, obj, timer, fn) {
	var count = 0;
	for (var key in obj) {
		count++;
		var target = obj[key];
		donghua(key, target);
	}
	function donghua(key, target) {
		console.log(target);
		target = key == "opacity" ? target * 100 : target;
		clearInterval(ele[key + "timer"]);
		ele[key + "timer"] = setInterval(function () {
			var current = window.getComputedStyle(ele)[key]; //120px
			var unit = current.match(/[a-z]+/);
			unit = unit ? unit[0] : "";
			current = parseFloat(current);
			current = key == "opacity" ? current * 100 : current;
			var speed = (target - current) / 10;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			current += speed;
			if (current == target) {
				clearInterval(ele[key + "timer"]);
				count--;
			}
			current = key == "opacity" ? current / 100 : current;
			ele.style[key] = current + unit;
			if (count == 0) {
				typeof fn == "function" ? fn() : fn;
			}
		}, timer);
	}
}

//封装设置、获取、移除cookie
var Cookie = {
	setCookie: function setCookie(name, value, data, path) {
		var str = name + '=' + value;
		if (data) {
			str += '; expires=' + data.toUTCString();
		}
		if (path) {
			str += '; path=' + path;
		}
		document.cookie = str;
	},
	getCookie: function getCookie(name) {
		var cookieArr = document.cookie.split("; ");
		var res = "";
		cookieArr.forEach(function (item) {
			var arr = item.split("=");
			if (arr[0] == name) {
				res = arr[1];
			}
		});
		return res;
	},
	removeCookie: function removeCookie(name, path) {
		var d = new Date();
		d.setDate(d.getDate() - 1);
		this.setCookie(name, "", d, path);
	}
};

function draw(show_num) {
	var canvas_width = $('.ver_code').width();
	var canvas_height = $('.ver_code').height();
	var canvas = document.querySelector(".ver_code"); //获取到canvas的对象，演员
	var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
	canvas.width = canvas_width;
	canvas.height = canvas_height;
	var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
	var aCode = sCode.split(",");
	var aLength = aCode.length; //获取到数组的长度

	for (var i = 0; i < 4; i++) {
		//这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
		var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
		// var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
		var deg = Math.random() - 0.5; //产生一个随机弧度
		var txt = aCode[j]; //得到随机的一个内容
		show_num[i] = txt.toLowerCase();
		var x = 10 + i * 18; //文字在canvas上的x坐标
		var y = 20 + Math.random() * 10; //文字在canvas上的y坐标
		context.font = "bold 23px 微软雅黑";

		context.translate(x, y);
		context.rotate(deg);

		context.fillStyle = getRandomColor();
		context.fillText(txt, 0, 0);

		context.rotate(-deg);
		context.translate(-x, -y);
	}
	for (var i = 0; i <= 5; i++) {
		//验证码上显示线条
		context.strokeStyle = getRandomColor();
		context.beginPath();
		context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.stroke();
	}
	for (var i = 0; i <= 30; i++) {
		//验证码上显示小点
		context.strokeStyle = getRandomColor();
		context.beginPath();
		var x = Math.random() * canvas_width;
		var y = Math.random() * canvas_height;
		context.moveTo(x, y);
		context.lineTo(x + 1, y + 1);
		context.stroke();
	}
}

function dl() {
	var cookName = Cookie.getCookie('uname');
	if (cookName != "") {
		$("#login").hide();
		$("#quit").show();
		$("#login_name").text(cookName);
	}
	$(".tuichu").on("click", function () {
		$("#quit").hide();
		$("#login").show();
		Cookie.removeCookie("uname", "/");
		window.location.reload();
	});
	setInterval(function () {
		$(".friendLinkList").animate({ top: "-32px" }, 1500, function () {
			$(".friendLinkList").animate({ top: "0px" }, 1500);
		});
	}, 4000);

	$(".app_p").hover(function () {
		$(".appImg").show();
	}, function () {
		$(".appImg").hide();
	});
	$(window).scroll(function () {
		var top = $(window).scrollTop();
		if (top > 800) {
			$("#fixNav").show();
		} else {
			$("#fixNav").hide();
		}
	});
	if (cookName != "") {
		$.ajax({
			url: "api/ready_car.php",
			data: { user: cookName },
			success: function success(res) {
				var obj = JSON.parse(res);
				var count = 0;
				$.each(obj, function (idx, item) {
					count += Number(item.count);
				});
				$(".count").text(count);
			}
		});
	}
	if ($(".fixBox") != "") {
		$(".fanghui").on("click", function () {
			window.scrollTo(0, 0);
		});
		$(".fixBox ul li a").hover(function () {
			$(this).children(".tangchu").css({ display: "block" });
			$(this).children(".tangchu").stop(true).animate({ opacity: 1, right: "32px" }, 500);
		}, function () {
			$(this).children(".tangchu").stop(true).animate({ opacity: 0, right: "80px" }, 500, function () {
				$(this).css({ display: "none" });
			});
		});
	}
}
"use strict";

jQuery(function () {
    $("#fixBox").load("index.html .fixBox");
    $(".g_footer").load("index.html #footer");
    $(".g_header").load("index.html #header", function () {
        $.getScript("js/common.js", function () {
            dl();
            dongtai(comId);
            addCar(comId);
            xhr2();
        });
        var comId = location.search.slice(1).split("=")[1];
        $.ajax({
            url: "api/commodity.php",
            data: { id: comId },
            success: function success(res) {
                render(JSON.parse(res));
            }
        });

        $(".listpic").on("mouseover", function () {
            $(".datu").children("img").prop("src", $(this).children("img")[0].src);
        });

        $(".datu").mouseover(function () {
            $(".datuBtn").show();
            $(".glassImg img").prop("src", $(this).children("img")[0].src);
            $(".glassImg").show();
        });
        $(".datu").mouseout(function () {
            $(".datuBtn").hide();
            $(".glassImg").hide();
        });
        $(".datu").mousemove(function (e) {
            var etop = e.pageY - $(this).offset().top - $(".datuBtn").height() / 2;
            var eleft = e.pageX - $(this).offset().left - $(".datuBtn").width() / 2;
            var thisX = $(this).width() - $(".datuBtn").width();
            var thisY = $(this).height() - $(".datuBtn").height();
            if (eleft < 0) {
                eleft = 0;
            } else if (eleft > thisX) {
                eleft = thisX;
            }
            if (etop < 0) {
                etop = 0;
            } else if (etop > thisY) {
                etop = thisY;
            }
            $(".datuBtn").css("left", eleft);
            $(".datuBtn").css("top", etop);
            var pX = eleft / thisX;
            var pY = etop / thisY;
            $(".glassImg img").css({
                "left": -pX * ($(".glassImg img").width() - $(".glassImg").width()),
                "top": -pY * ($(".glassImg img").height() - $(".glassImg").height())
            });
        });
    });
    function render(obj) {
        $(".datu").children("img").prop("src", obj[0].com_img);
        $(".select").children("img").prop("src", obj[0].com_img);
        $(".msg_top").children("h3").text(obj[0].com_name);
        $(".ps_money").text(obj[0].com_price);
        $(".pj").children("span").text(obj[0].com_eval);
    }
    function dongtai() {
        $(".jia").on("click", function () {
            var val = $(".c_count").val();
            $(".c_count").val(Number(val) + 1);
        });
        $(".jian").on("click", function () {
            var val = $(".c_count").val();
            if (val != 1) {
                $(".c_count").val(Number(val) - 1);
            }
        });
    }
    function addCar(comId) {
        var user = $("#login_name").text();
        $(".m_addCar").on("click", function () {
            var count = $(".c_count").val();
            $.ajax({
                url: "api/add_car.php",
                data: { id: comId, user: user, count: count },
                success: function success(res) {
                    console.log(res);
                    if (res == 1) {
                        $.ajax({
                            url: "api/ready_car.php",
                            data: { user: user, type: 0 },
                            success: function success(res) {
                                var obj = JSON.parse(res);
                                var count = 0;
                                $.each(obj, function (idx, item) {
                                    count += Number(item.count);
                                });
                                $(".count").text(count);
                            }
                        });
                    }
                }
            });
        });
    }
    function xhr2() {
        $.ajax({
            url: "api/list.php",
            data: { page: 5, qty: 4 },
            success: function success(res) {
                obj = JSON.parse(res);
                render2(obj.data);
            }
        });
    }
    function render2(obj) {
        $(".tj_ul").html($.map(obj, function (item) {
            return "<li data-id=\"" + item.com_id + "\">\n                            <a class=\"go_goods clearfix\">\n                                <img src=\"" + item.com_img + "\" alt=\"\">\n                                <div class=\"fl\">\n                                    <p>" + item.com_name + "</p>\n                                    <span>\uFFE5<span class=\"t_money\">" + item.com_price + "</span></span>\n                                </div>\n                            </a>\n                        </li>";
        }));
        $(".lsc2").children("img").prop("src", obj[0].com_img);
        $(".lsc3").children("img").prop("src", obj[1].com_img);
        $(".lsc4").children("img").prop("src", obj[2].com_img);
        $(".last").children("img").prop("src", obj[3].com_img);
        $(".go_goods").on("click", function () {
            var id = $(this).parents("li").attr("data-id");
            location.href = "html/goods.html?comId=" + id;
        });
    }
});
"use strict";

jQuery(function ($) {
    $("#output").lunbo({
        imgurl: ["img/index/7d2f0da441884ab98365e768dfa61d5e.jpg", "img/index/ba40a2e1b72d40b99065cfe4419fe2bd.jpg", "img/index/65e3c6fd815645f497e2b35e12800a09.jpg", "img/index/8518fd4a74f443a896df10921bfcf905.jpg", "img/index/8702d80f5662476d92794ff04b7283ba.jpg", "img/index/b5a3ba84a4354702bce87068d5b59ec6.jpg", "img/index/4b089ae5e1c7472296fbbaae77bc0fad.jpg"],
        type: "faded"
    });
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    $(".erji").show();

    dl();

    // jqajax();
    jqajax2(".maotai", { type: 0 });
    jqajax2(".laojiu", { type: 1 });
    jqajax2(".zhekou", { type: 2 });
    jqajax2(".chaozhi", { type: 3 });
    jqajax2(".remai", { type: 4 });

    jqajax3(".mthuodong", { type: 0 });
    jqajax3(".ljhuodong", { type: 1 });
    jqajax3(".zkhuodong", { type: 2 });
    jqajax3(".czhuodong", { type: 3 });
    jqajax3(".rmhuodong", { type: 4 });

    jqajax4(5, render, 7);
    jqajax4(1, render4, 5);
    jqajax4(2, render5, 5);

    function jqajax3(ele, a) {
        $.ajax({
            url: "api/activity.php",
            data: a,
            success: function success(res) {
                obj = JSON.parse(res);
                render3(ele, obj);
            }
        });
    }
    function render3(ele, obj) {
        $(ele).html($.map(obj, function (item, idx) {
            return "<a href=\"\">\n                            <img src=\"" + item.com_img + "\" alt=\"\">\n                        </a>";
        }));
    }
    function jqajax2(ele, a) {
        $.ajax({
            url: "api/commodity.php",
            data: a,
            success: function success(res) {
                obj = JSON.parse(res);
                render2(ele, obj);
            }
        });
    }

    function jqajax4(page, render, qty) {
        $.ajax({
            url: "api/list.php",
            data: { page: page, qty: qty },
            success: function success(res) {
                obj = JSON.parse(res);
                render(obj.data);
            }
        });
    }

    function render2(ele, obj) {
        $(ele).html($.map(obj, function (item, idx) {
            return "<li data-id=\"" + item.com_id + "\">\n                            <a class=\"go_goods\">\n                                <div>" + item.com_recom + "</div>\n                                <img src=\"" + item.com_img + "\" alt=\"\">\n                                <p>" + item.com_name + "</p>\n                                <span>" + item.com_price + "\u5143</span>\n                            </a>\n                        </li>";
        }));
        tiaozhuang();
    }
    // function jqajax(){
    //     $.ajax({
    //         url: "api/show_com.php",
    //         success: function (res) {
    //             obj = JSON.parse(res);
    //             if(obj != ""){
    //                 render(obj);
    //             } 
    //         }
    //     });
    // }
    function tiaozhuang() {
        $(".go_goods").on("click", function () {
            var id = $(this).parents("li").attr("data-id");
            location.href = "html/goods.html?comId=" + id;
        });
    }
    function render(obj) {
        $(".cont_ul").html($.map(obj, function (item, idx) {
            return "<li data-id=\"" + item.com_id + "\">\n                            <a class=\"go_goods\">\n                                <img src=\"" + item.com_img + "\" alt=\"\">\n                                <p> <span id=\"a_name\">" + item.com_name + "</span> <span id=\"a_price\">" + item.com_price + "\u5143</span></p>\n                            </a>\n                        </li>";
        }));
        tiaozhuang();
    }
    function render4(obj) {
        $(".slide1").html($.map(obj, function (item, idx) {
            return "<li data-id=\"" + item.com_id + "\">\n                            <a class=\"go_goods\">\n                                <img src=\"" + item.com_img + "\" alt=\"\">\n                                <p class=\"s_name\">" + item.com_name + "</p>\n                                <p class=\"s_price\">" + item.com_price + "\u5143</p>\n                                <p class=\"s_pinglun\">" + item.com_eval + " \u4EBA\u597D\u8BC4</p>\n                            </a>\n                        </li>";
        }));
        tiaozhuang();
    }
    function render5(obj) {
        $(".slide2").html($.map(obj, function (item, idx) {
            return "<li data-id=\"" + item.com_id + "\">\n                            <a class=\"go_goods\">\n                                <img src=\"" + item.com_img + "\" alt=\"\">\n                                <p class=\"s_name\">" + item.com_name + "</p>\n                                <p class=\"s_price\">" + item.com_price + "\u5143</p>\n                                <p class=\"s_pinglun\">" + item.com_eval + " \u4EBA\u597D\u8BC4</p>\n                            </a>\n                        </li>";
        }));
        tiaozhuang();
    }
});
"use strict";

jQuery(function ($) {
    $("#fixBox").load("index.html .fixBox");
    $(".w_footer").load("index.html #footer");
    $(".w_header").load("index.html #header", function () {
        $.getScript("js/common.js", function () {
            dl();
        });
        xhr(1);
        paixu();

        $(".jiu_name").on("click", function () {
            if ($(".search-jiu")) {
                $(".search-jiu").remove();
            }
            $(".search-hassel").append("<a class=\"search-jiu fl\" id=\"search_1\" data-hr=\"qingjiu\"><em class=\"jiuName\">" + $(this).text() + "</em>&nbsp;<span class=\"close_tj\">\u2716</span></a> ");
            xhr(1, "com_price", $(".search-selected .sta_val").text(), $(".search-selected .over_val").text(), $(".jiuName").text());
            $(".close_tj").on("click", function () {
                $(this).parents("a").remove();
                paixu();
            });
        });

        $(".cd-table").on("click", "a", function () {
            if ($(".search-selected")) {
                $(".search-selected").remove();
            }
            var aClass = $(this).attr("class");
            if (aClass == "nfw1") {
                $(".search-hassel").append("<a class=\"search-selected fl\" id=\"search_1\" data-hr=\"qingjiu\"><em><span class=\"sta_val\">1</span>-<span class=\"over_val\">199</span>\u5143</em>&nbsp;<span class=\"close_tj\">\u2716</span></a> ");
                xhr(1, "com_price", $(".search-selected .sta_val").text(), $(".search-selected .over_val").text(), $(".jiuName").text());
            }
            if (aClass == "nfw2") {
                $(".search-hassel").append("<a class=\"search-selected fl\" id=\"search_1\" data-hr=\"qingjiu\"><em><span class=\"sta_val\">200</span>-<span class=\"over_val\">399</span>\u5143</em>&nbsp;<span class=\"close_tj\">\u2716</span></a> ");
                xhr(1, "com_price", $(".search-selected .sta_val").text(), $(".search-selected .over_val").text(), $(".jiuName").text());
            }
            if (aClass == "nfw3") {
                $(".search-hassel").append("<a class=\"search-selected fl\" id=\"search_1\" data-hr=\"qingjiu\"><em><span class=\"sta_val\">400</span>-<span class=\"over_val\">599</span>\u5143</em>&nbsp;<span class=\"close_tj\">\u2716</span></a> ");
                xhr(1, "com_price", $(".search-selected .sta_val").text(), $(".search-selected .over_val").text(), $(".jiuName").text());
            }
            if (aClass == "nfw4") {
                $(".search-hassel").append("<a class=\"search-selected fl\" id=\"search_1\" data-hr=\"qingjiu\"><em><span class=\"sta_val\">600</span><span class=\"over_val\">\u5143\u53CA\u4EE5\u4E0A</span></em>&nbsp;<span class=\"close_tj\">\u2716</span></a> ");
                xhr(1, "com_price", $(".search-selected .sta_val").text(), $(".search-selected .over_val").text(), $(".jiuName").text());
            }
            $(".close_tj").on("click", function () {
                $(this).parents("a").remove();
                paixu();
            });
            paixu();
        });

        function paixu() {
            $("#com_id").on("click", function () {
                $(this).addClass("active").siblings().removeClass("active");
                xhr(1, "com_id", $(".search-selected .sta_val").text(), $(".search-selected .over_val").text(), $(".jiuName").text());
            });
            $("#com_name").on("click", function () {
                $(this).addClass("active").siblings().removeClass("active");
                xhr(1, "com_name", $(".search-selected .sta_val").text(), $(".search-selected .over_val").text(), $(".jiuName").text());
            });
            $("#com_price").on("click", function () {
                $(this).addClass("active").siblings().removeClass("active");
                xhr(1, "com_price", $(".search-selected .sta_val").text(), $(".search-selected .over_val").text(), $(".jiuName").text());
            });
            $("#com_eval").on("click", function () {
                $(this).addClass("active").siblings().removeClass("active");
                xhr(1, "com_eval", $(".search-selected .sta_val").text(), $(".search-selected .over_val").text(), $(".jiuName").text());
            });
            $("#time").on("click", function () {
                $(this).addClass("active").siblings().removeClass("active");
                xhr(1, "time", $(".search-selected .sta_val").text(), $(".search-selected .over_val").text(), $(".jiuName").text());
            });
        }

        $(".page").on("click", "span", function () {
            var page = $(this).text();
            if ($(".sort-box .active").attr("id")) {
                var a = $(".sort-box .active").attr("id");
            }
            xhr(page, a);
            $(document).scrollTop(0);
        });
        $(".xiangzuo").on("click", function () {
            var page = $(".active").text();
            page--;
            if (page == 0) {
                page = 1;
            }
            if ($(".sort-box .active").attr("id")) {
                var a = $(".sort-box .active").attr("id");
            }
            xhr(page, a);
            $($(".page span")[page - 1]).addClass("active").siblings().removeClass("active");

            $(document).scrollTop(0);
        });
        $(".xiangyou").on("click", function () {
            var page = $(".active").text();
            var count = $(".page").children().length;
            page++;
            if (page > count) {
                page = count;
            }
            if ($(".sort-box .active").attr("id")) {
                var a = $(".sort-box .active").attr("id");
            }
            xhr(page, a);
            $($(".page span")[page + 1]).addClass("active").siblings().removeClass("active");
            $(document).scrollTop(0);
        });

        function addCar() {
            var user = $("#login_name").text();
            $(".add").on("click", function () {
                var id = $(this).parents("li").attr("data-id");
                $.ajax({
                    url: "api/add_car.php",
                    data: { id: id, user: user },
                    success: function success(res) {
                        if (res == "1") {
                            $.ajax({
                                url: "api/ready_car.php",
                                data: { user: user, type: 0 },
                                success: function success(res) {
                                    var obj = JSON.parse(res);
                                    var count = 0;
                                    $.each(obj, function (idx, item) {
                                        count += Number(item.count);
                                    });
                                    $(".count").text(count);
                                }
                            });
                        }
                    }
                });
            });
            $(".go_goods").on("click", function () {
                var id = $(this).parents("li").attr("data-id");
                location.href = "html/goods.html?comId=" + id;
            });
        }
        function xhr(page, type, data1, data2, data3) {
            $.ajax({
                url: "api/list.php",
                data: { page: page, qty: 8, type: type, start_val: data1, over_val: data2, jiu_val: data3 },
                success: function success(res) {
                    obj = JSON.parse(res);
                    // console.log(obj)
                    rander(obj.data);
                    $(".page").html("");
                    var count = Math.ceil(obj.count / obj.qty);
                    for ($i = 1; $i <= count; $i++) {
                        $("<span/>").appendTo($(".page")).text($i).addClass($i == obj.page ? "active" : "");
                    }
                    $($(".page span")[page - 1]).addClass("active").siblings().removeClass("active");
                }
            });
        }
        function rander(obj) {
            $(".pr_list").html($.map(obj, function (item, idx) {
                return "<li data-id=\"" + item.com_id + "\">\n                                <a class=\"go_goods\">\n                                    <img src=\"" + item.com_img + "\" alt=\"\">\n                                    <p class=\"pr_name\"><span>" + item.com_name + "</span><em>" + item.com_recom + "</em></p>\n                                    <p class=\"pr_huodong\"></p>\n                                </a>\n                                <div class=\"add_car clearfix\">\n                                    <p class=\"fl\"><i>\uFFE5</i><span>" + item.com_price + "</span></p>\n                                    <button class=\"fr add\">\u52A0\u5165\u8D2D\u7269\u8F66</button>\n                                </div>\n                                <p class=\"pr_pingjia\">\u8BC4\u4EF7\uFF1A" + item.com_eval + "\u6761</p>\n                            </li>";
            }));
            addCar();
        }
    });
});
"use strict";

jQuery(function ($) {
    var show_num = [];
    draw(show_num);
    var $autologin = $("#autologin");
    var cook_uname = Cookie.getCookie("uname");
    var cook_upsd = Cookie.getCookie("upsd");
    console.log(cook_uname, cook_upsd);
    if (cook_uname) {
        $.ajax({
            type: "POST",
            url: "../api/login.php",
            data: { uname: cook_uname, upsd: cook_upsd },
            success: function success(res) {
                if (res) {
                    c;
                    location.href = '../index.html?';
                }
            }
        });
    }
    $("#btnSubmit").on("click", function () {
        var _name = $("#txtUserName").val();
        var _psd = $("#txtPassword").val();
        var $code = $("#loginCode");
        var show_code = show_num.join("");
        var yanzheng;
        $.ajax({
            type: "POST",
            url: "../api/login.php",
            data: { uname: _name, upsd: _psd },
            success: function success(res) {
                yanzheng = res;
                if ($code[0].style.display == "none") {
                    if (!yanzheng) {
                        alert("用户名或密码错误！");
                        $("#loginCode").show();
                    } else {
                        if ($autologin[0].checked) {
                            Cookie.removeCookie("uname", "/");
                            Cookie.removeCookie("upsd", "/");
                        }
                        Cookie.setCookie('uname', _name, "", '/');
                        location.href = '../index.html?';
                    }
                } else {
                    console.log(!yanzheng);
                    if (!yanzheng) {
                        alert("用户名或密码错误！");
                    } else {
                        if ($("#txtCode").val() != show_code) {
                            alert("验证码不正确！");
                            draw(show_num);
                        } else {
                            if ($autologin[0].checked) {
                                Cookie.removeCookie("uname", "/");
                                Cookie.removeCookie("upsd", "/");
                            }
                            Cookie.setCookie('uname', _name, "", '/');
                            location.href = '../index.html?';
                        }
                    }
                }
            }
        });
    });
});
"use strict";

jQuery(function ($) {
    var $input = $(".register_inner").find("input");
    var show_num = [];
    draw(show_num);
    var yonghu;
    $input.first().on("blur", function () {
        console.log($(this).val());
        $.ajax({
            url: "../api/reg.php",
            data: { uname: $(this).val() },
            success: function success(res) {
                yonghu = res;
                if (yonghu) {
                    alert("用户名已存在");
                }
            }
        });
    });
    $("#replace_img").on("click", function () {
        draw(show_num);
    });
    $(".btnSubmit").on("click", function () {
        var yanzhengma = show_num.join("");
        var ipt = "";
        $input.each(function () {
            if ($(this).val() == "") {
                ipt = "文本框不能为空";
                return false;
            }
        });
        if (ipt) {
            alert(ipt);
            return false;
        } else if (!/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test($input.first().val())) {
            alert("手机号格式不正确！");
            return false;
        } else if ($input.eq(1).val() != yanzhengma) {
            alert("验证码不正确！");
            return false;
        } else if (!/^\w{6,22}$/.test($input.eq(2).val())) {
            alert("设置密码格式不正确！");
            return false;
        } else if ($input.eq(3).val() != $input.eq(2).val()) {
            alert("两次密码不一致！");
            return false;
        } else if (yonghu) {
            alert("用户名已存在！");
            return false;
        } else {
            $.ajax({
                type: "post",
                url: "../api/reg_add.php",
                data: { uname: $input.first().val(), upsd: $input.eq(2).val() },
                success: function success(res) {
                    if (res) {
                        Cookie.setCookie('uname', $input.first().val(), '', '/');
                        location.href = '../index.html';
                    }
                }
            });
            return false;
        }
        draw(show_num);
    });
});