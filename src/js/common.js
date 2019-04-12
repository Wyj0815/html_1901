//1.封装a-b的随机整数，包含a、b
function getRandomNum(a,b){
	return  parseInt(Math.random()*(b-a+1)+a);
}

//2.封装一个随机颜色 rgb(0-255,0-255,0-255)
function getRandomColor(){
	var r = getRandomNum(0,255);
	var g = getRandomNum(0,255);
	var b = getRandomNum(0,255);
	return 'rgb('+r+','+g+','+b+')';
}


//3.封装获取元素节点
var Element = {
	// 1.从所有节点的数组中，过滤出来只有元素节点的数组
	getElement : function(nodes){
		var eleArr = [];
		// eleArr = Array.prototype.filter.call(nodes,function(item){
		// 	return item.nodeType == 1;
		// })
		nodes.forEach(function(item){
			if(item.nodeType == 1){
				eleArr.push(item);
			}
		})
		return eleArr;
	},
	//2.获取所有子元素节点
	getSonElement : function(parent){
		return this.getElement(parent.childNodes);
	},
	//3.获取到下一个兄弟元素节点
	getNextElement : function(current){
		var next = current.nextSibling;
		if(next.nodeType != 1){
			next = next.nextSibling;
		}
		return next;
	}
	//...

}

//4.获取css样式
function getStyle(ele,key){
 	if(window.getComputedStyle){
		return window.getComputedStyle(ele)[key];
	}else if(ele.currentStyle){
		return ele.currentStyle[key];
	}else{
		return ele.style[key];
	}
}

// 5.事件绑定，兼容浏览器
function bind(ele,type,fn,iscapture){
	if(ele.addEventListener){
		ele.addEventListener(type,fn,iscapture);
	}else if(ele.attachEvent){
		ele.attachEvent("on"+type,fn);
	}else{
		ele["on"+type] = fn;
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
function bufferAnimation(ele,obj,timer,fn){
	var count = 0;
	for(var key in obj){
		count ++;
		var target = obj[key];
		donghua(key,target);
	}
	function donghua(key,target){
		console.log(target);
		target = key == "opacity"? target *100 : target;
		clearInterval(ele[key+"timer"]);
		ele[key+"timer"] = setInterval(function(){
			var current = window.getComputedStyle(ele)[key];//120px
			var unit = current.match(/[a-z]+/);
			unit = unit? unit[0] : "";
			current = parseFloat(current); 
			current = key == "opacity"? current *100 : current;
			var speed = (target-current)/10;
			speed = speed>0? Math.ceil(speed) : Math.floor(speed);
			current += speed;
			if(current==target){
				clearInterval(ele[key+"timer"]);
				count--;
			}
			current = key == "opacity"? current/100 : current;
			ele.style[key] = current + unit;
			if(count == 0 ){
				typeof fn == "function"? fn() : fn;
			}
		},timer)

	}
}

//封装设置、获取、移除cookie
var Cookie = {
	setCookie : function(name,value,data,path){
		var str = `${name}=${value}`;
		if(data){
			str += `; expires=${data.toUTCString()}`;
		}
		if(path){
			str += `; path=${path}`;
		}
		document.cookie = str;
	},
	getCookie : function(name){
		var cookieArr = document.cookie.split("; ");
		var res = "";
		cookieArr.forEach(function(item){
			var arr = item.split("=");
			if(arr[0] == name){
				res = arr[1];
			}
		})
		return res;
	},
	removeCookie : function(name,path){
		var d = new Date();
		d.setDate(d.getDate()-1);
		this.setCookie(name,"",d,path)
	}
}

function draw(show_num) {
	var canvas_width=$('.ver_code').width();
	var canvas_height=$('.ver_code').height();
	var canvas = document.querySelector(".ver_code");//获取到canvas的对象，演员
	var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
	canvas.width = canvas_width;
	canvas.height = canvas_height;
	var sCode = "a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
	var aCode = sCode.split(",");
	var aLength = aCode.length;//获取到数组的长度
	
	for (var i = 0; i < 4; i++) {  //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
		var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
		// var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
		var deg = Math.random() - 0.5; //产生一个随机弧度
		var txt = aCode[j];//得到随机的一个内容
		show_num[i] = txt.toLowerCase();
		var x = 10 + i * 18;//文字在canvas上的x坐标
		var y = 20 + Math.random() * 10;//文字在canvas上的y坐标
		context.font = "bold 23px 微软雅黑";

		context.translate(x, y);
		context.rotate(deg);

		context.fillStyle = getRandomColor();
		context.fillText(txt, 0, 0);

		context.rotate(-deg);
		context.translate(-x, -y);
	}
	for (var i = 0; i <= 5; i++) { //验证码上显示线条
		context.strokeStyle = getRandomColor();
		context.beginPath();
		context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.stroke();
	}
	for (var i = 0; i <= 30; i++) { //验证码上显示小点
		context.strokeStyle = getRandomColor();
		context.beginPath();
		var x = Math.random() * canvas_width;
		var y = Math.random() * canvas_height;
		context.moveTo(x, y);
		context.lineTo(x + 1, y + 1);
		context.stroke();
	}
}

function dl(){
	var cookName = Cookie.getCookie('uname');
    if(cookName != ""){
        $("#login").hide();
        $("#quit").show();
        $("#login_name").text(cookName);
    }
    $(".tuichu").on("click",function(){
        $("#quit").hide();
        $("#login").show();
		Cookie.removeCookie("uname","/");
		window.location.reload();
	});
	setInterval(function(){
        $(".friendLinkList").animate({top:"-32px"},1500,function(){
            $(".friendLinkList").animate({top:"0px"},1500);
        });
    },4000);

    $(".app_p").hover(function(){
        $(".appImg").show();
    },function(){
        $(".appImg").hide();
    });
    $(window).scroll(function(){
        var top = $(window).scrollTop();
        if(top > 800){
            $("#fixNav").show();
        }else{
            $("#fixNav").hide();
        }
	});
	if(cookName != ""){
		$.ajax({
			url: "api/ready_car.php",
			data: {user:cookName},
			success: function (res) {
				var obj = JSON.parse(res)
				var count = 0;
				$.each(obj,function(idx,item) { 
					count += Number(item.count);
				});
				$(".count").text(count);
			}
		});
	}
	$(".fanghui").on("click",function(){
		window.scrollTo(0,0);
	});
	$(".fixBox ul li a").hover(function(){
		$(this).children(".tangchu").css({display:"block"});
		$(this).children(".tangchu").stop(true).animate({opacity:1,right:"32px"},500);
		
	},function(){
		$(this).children(".tangchu").stop(true).animate({opacity:0,right:"80px"},500,function(){
			$(this).css({display:"none"});
		});
	});
}
