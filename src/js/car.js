jQuery(function(){
    $(".car_footer").load("index.html #footer #fuwu");
    $(".car_header").load("index.html #header #topNav",function(){
        $.getScript("js/common.js",function(){  
            dl(); 
            var user = $("#login_name").text();
            xhr(user);
            xhr2(1,user);
        }); 

        function operation(user){
            $(".jianBtn").on("click",function(){
                var id = $(this).parents(".list").attr("data-id");
                if($(this).next().val() != 1){
                    xhr_count(id,"-",user,0);
                }
            });
            $(".jiaBtn").on("click",function(){
                var id = $(this).parents(".list").attr("data-id");
                xhr_count(id,"+",user,0);
            });
            $(".deleteBtn").on("click",function(){
                var id = $(this).parents(".list").attr("data-id");
                xhr_count(id,"",user,1);
            });
            $(".clear_car").on("click",function(){
                xhr_count("*","",user,1);
            });
            $(".dele_ck").on("click",function(){
                var list = $(".li_ck").filter(":checked").parents(".list");
                $.each(list,function(idx,item){     
                    xhr_count(item.dataset.id,"",user,1);
                });
            });
            $(".check_ll").on("click",function(){
                $(".check_ll").prop("checked",$(this).prop("checked"));
                $(".li_ck").prop("checked",$(this).prop("checked"));
            });
            $(".li_ck").on("click",function(){
                var cked = $(".li_ck").filter(":checked").length;
                var ck = $(".li_ck").length;
                $(".check_ll").prop("checked",ck == cked ? true : false);
            });
        }

        function totalva(){
            var add = 0;
            $(".totalvl").each(function(){
                add += Number($(this).text());
            });
            return add;
        }

        function xhr_count(id,count,user,type){
            $.ajax({
                url:"api/car_count.php",
                data:{id:id,count:count,user:user,type:type},
                success:function(s){
                    if(s == "1"){
                        xhr(user);
                    }
                }
            }); 
        }

        function addCar(user){
            $(".xy_addCar").on("click",function(){
                var id = $(this).parents("li").attr("data-id");
                $.ajax({
                    url: "api/add_car.php",
                    data: {id:id,user:user},
                    success: function (res) {
                        xhr(user);
                    }
                });
            });
        }

        function xhr(user){
            if(user != ""){
                $.ajax({
                    url: "api/ready_car.php",
                    data: {user:user},
                    success: function (res) {
                        car_obj = JSON.parse(res);
                        render(car_obj);
                        operation(user);
                    }
                });
            }
        }

        function xhr2(page,user){
            $.ajax({
                url: "api/list.php",
                data: {page:page,qty:12},
                success: function (res) {
                    obj = JSON.parse(res);
                    render2(obj.data);
                    addCar(user);
                }
            });
        }

        function render(car_obj){
            $(".car_lists").html(
                $.map(car_obj, function (item,idx) {
                    return `<div class="list" data-id="${item.com_id}">
                                <ul class="clearfix">
                                    <li class="ck">
                                        <input type="checkbox" class="li_ck">
                                    </li>
                                    <li class="img_name">
                                        <img src="${item.com_img}" alt="" class="fl">
                                        <p class="fl">${item.com_name}</p>
                                    </li>
                                    <li class="dangjia">
                                        ￥<span class="z_price">${item.com_price}</span>
                                    </li>
                                    <li class="youhui">-</li>
                                    <li class="yun">
                                        <input type="button" class="jianBtn" value="-" /><input type="text" value="${item.count}"  class="shuLiang" /><input type="button" class="jiaBtn" value="+" />
                                    </li>
                                    <li class="zongjia">
                                        ￥<span class="totalvl">${item.com_price*item.count}</span>
                                    </li>
                                    <li class="caozuo">
                                        <a class="collectBtn">收藏</a>
                                        <a class="deleteBtn">删除</a>
                                    </li>
                                </ul>
                            </div>`
                })
            );
            $(".total_money").html(totalva());
        }

        function render2(xyobj){
            $(".xy_libox").html(
                $.map(xyobj,function(item,idx){
                    return `<li data-id="${item.com_id}">
                                <a class="go_goods">
                                    <img src="${item.com_img}" alt="">
                                    <p>${item.com_name}</p>
                                </a>
                                <p>￥<span class="xy_money">${item.com_price}</span></p>
                                <span class="xy_addCar"></span>
                            </li>`
                })
            );
            $(".go_goods").on("click",function(){
                var id = $(this).parents("li").attr("data-id");
                location.href = "html/goods.html?comId="+id;
            });
        }
    });
});