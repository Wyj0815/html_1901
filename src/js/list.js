jQuery(function($){
    $("#fixBox").load("index.html .fixBox");
    $(".w_footer").load("index.html #footer");
    $(".w_header").load("index.html #header",function(){
        $.getScript("js/common.js",function(){  
            dl(); 
            
        }); 
        xhr(1);
        paixu();

        $(".jiu_name").on("click",function(){
            if($(".search-jiu")){
                $(".search-jiu").remove();
            }
            $(".search-hassel").append(
                `<a class="search-jiu fl" id="search_1" data-hr="qingjiu"><em class="jiuName">${$(this).text()}</em>&nbsp;<span class="close_tj">✖</span></a> `
            );
            xhr(1,"com_price",$(".search-selected .sta_val").text(),$(".search-selected .over_val").text(),$(".jiuName").text());
            $(".close_tj").on("click",function() {
                $(this).parents("a").remove();
                paixu();
            });
        });

        $(".cd-table").on("click","a",function(){
            if($(".search-selected")){
                $(".search-selected").remove();
            }
            var aClass = $(this).attr("class");
            if(aClass == "nfw1"){
                $(".search-hassel").append(
                    `<a class="search-selected fl" id="search_1" data-hr="qingjiu"><em><span class="sta_val">1</span>-<span class="over_val">199</span>元</em>&nbsp;<span class="close_tj">✖</span></a> `
                );
                 xhr(1,"com_price",$(".search-selected .sta_val").text(),$(".search-selected .over_val").text(),$(".jiuName").text());
            }
            if(aClass == "nfw2"){
                $(".search-hassel").append(
                    `<a class="search-selected fl" id="search_1" data-hr="qingjiu"><em><span class="sta_val">200</span>-<span class="over_val">399</span>元</em>&nbsp;<span class="close_tj">✖</span></a> `
                );
                 xhr(1,"com_price",$(".search-selected .sta_val").text(),$(".search-selected .over_val").text(),$(".jiuName").text());
            }
            if(aClass == "nfw3"){
                $(".search-hassel").append(
                    `<a class="search-selected fl" id="search_1" data-hr="qingjiu"><em><span class="sta_val">400</span>-<span class="over_val">599</span>元</em>&nbsp;<span class="close_tj">✖</span></a> `
                );
                 xhr(1,"com_price",$(".search-selected .sta_val").text(),$(".search-selected .over_val").text(),$(".jiuName").text());
            }
            if(aClass == "nfw4"){
                $(".search-hassel").append(
                    `<a class="search-selected fl" id="search_1" data-hr="qingjiu"><em><span class="sta_val">600</span><span class="over_val">元及以上</span></em>&nbsp;<span class="close_tj">✖</span></a> `
                );
                 xhr(1,"com_price",$(".search-selected .sta_val").text(),$(".search-selected .over_val").text(),$(".jiuName").text());
            }
            $(".close_tj").on("click",function() {
                $(this).parents("a").remove();
                paixu();
            });
            paixu();
        })

        function paixu(){
            $("#com_id").on("click",function(){
                $(this).addClass("active").siblings().removeClass("active");
                xhr(1,"com_id",$(".search-selected .sta_val").text(),$(".search-selected .over_val").text(),$(".jiuName").text());
            });
            $("#com_name").on("click",function(){
                $(this).addClass("active").siblings().removeClass("active");
                xhr(1,"com_name",$(".search-selected .sta_val").text(),$(".search-selected .over_val").text(),$(".jiuName").text());
            });
            $("#com_price").on("click",function(){
                $(this).addClass("active").siblings().removeClass("active");
                xhr(1,"com_price",$(".search-selected .sta_val").text(),$(".search-selected .over_val").text(),$(".jiuName").text());
            });
            $("#com_eval").on("click",function(){
                $(this).addClass("active").siblings().removeClass("active");
                xhr(1,"com_eval",$(".search-selected .sta_val").text(),$(".search-selected .over_val").text(),$(".jiuName").text());
            });
            $("#time").on("click",function(){
                $(this).addClass("active").siblings().removeClass("active");
                xhr(1,"time",$(".search-selected .sta_val").text(),$(".search-selected .over_val").text(),$(".jiuName").text());
            });
        }

        $(".page").on("click","span",function(){
            var page = $(this).text();
            if($(".sort-box .active").attr("id")){
                var a = $(".sort-box .active").attr("id");
            }
            xhr(page,a);
            $(document).scrollTop(0);
        });
        $(".xiangzuo").on("click",function(){
            var page = $(".active").text();
            page--;         
            if(page == 0){
                page = 1;
            }
            if($(".sort-box .active").attr("id")){
                var a = $(".sort-box .active").attr("id");
            }
            xhr(page,a);
            $($(".page span")[page-1]).addClass("active").siblings().removeClass("active");
            
            $(document).scrollTop(0);
        });
        $(".xiangyou").on("click",function(){
            var page = $(".active").text();
            var count = $(".page").children().length;
            page++;
            if(page > count){
                page = count;
            }
            if($(".sort-box .active").attr("id")){
                var a = $(".sort-box .active").attr("id");
            }
            xhr(page,a);
            $($(".page span")[page+1]).addClass("active").siblings().removeClass("active");
            $(document).scrollTop(0);
        });
    
        function addCar(){
            var user = $("#login_name").text();
            $(".add").on("click",function(){
                var id = $(this).parents("li").attr("data-id");
                $.ajax({
                    url: "api/add_car.php",
                    data: {id:id,user:user},
                    success: function (res) {
                        if(res == "1"){
                            $.ajax({
                                url: "api/ready_car.php",
                                data: {user:user,type:0},
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
                    }
                });
            });
            $(".go_goods").on("click",function(){
                var id = $(this).parents("li").attr("data-id");
                location.href = "html/goods.html?comId="+id;
            });
        }
        function xhr(page,type,data1,data2,data3){
            $.ajax({
                url: "api/list.php",
                data: {page:page,qty:8,type:type,start_val:data1,over_val:data2,jiu_val:data3},
                success: function (res) {
                    obj = JSON.parse(res);
                    // console.log(obj)
                    rander(obj.data);
                    $(".page").html("");
                    var count = Math.ceil(obj.count/obj.qty);
                    for($i=1;$i<=count;$i++){
                        $("<span/>").appendTo($(".page")).text($i).addClass($i==obj.page? "active" : "");
                    }
                    $($(".page span")[page-1]).addClass("active").siblings().removeClass("active");
                }
            });
        }
        function rander(obj){
            $(".pr_list").html(
                $.map(obj, function (item, idx){
                    return `<li data-id="${item.com_id}">
                                <a class="go_goods">
                                    <img src="${item.com_img}" alt="">
                                    <p class="pr_name"><span>${item.com_name}</span><em>${item.com_recom}</em></p>
                                    <p class="pr_huodong"></p>
                                </a>
                                <div class="add_car clearfix">
                                    <p class="fl"><i>￥</i><span>${item.com_price}</span></p>
                                    <button class="fr add">加入购物车</button>
                                </div>
                                <p class="pr_pingjia">评价：${item.com_eval}条</p>
                            </li>`
                })
            );
            addCar();
        }
    });
});