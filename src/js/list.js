jQuery(function($){
    $("#fixBox").load("index.html .fixBox");
    $(".w_footer").load("index.html #footer");
    $(".w_header").load("index.html #header",function(){
        $.getScript("js/common.js",function(){  
            dl(); 
        }); 

        xhr(1);
        $(".zong").on("click",function(){
            xhr(1,"zong");
        });
        $(".xiao").on("click",function(){
            xhr(1,"xiao");
        });
        $(".jia").on("click",function(){
            xhr(1,"jia");
        });
        $(".ping").on("click",function(){
            xhr(1,"ping");
        });
        $(".last").on("click",function(){
            xhr(1,"last");
        });
    
        $(".page").on("click","span",function(){
            var page = $(this).text();
            xhr(page);
            $(document).scrollTop(0);
        });
        $(".xiangzuo").on("click",function(){
            var page = $(".active").text();
            page--;
            if(page == 0){
                page = 1;
            }
            xhr(page);
            $(document).scrollTop(0);
        });
        $(".xiangyou").on("click",function(){
            var page = $(".active").text();
            var count = $(".page").children().length;
            page++;
            if(page > count){
                page = count;
            }
            xhr(page);
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
        function xhr(page,type){
            $.ajax({
                url: "api/list.php",
                data: {page:page,qty:20,type:type},
                success: function (res) {
                    obj = JSON.parse(res);
                    rander(obj.data);
                    $(".page").html("");
                    var count = Math.ceil(obj.count/obj.qty);
                    for($i=1;$i<=count;$i++){
                        $("<span/>").appendTo($(".page")).text($i).addClass($i==obj.page? "active" : "");
                    }
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