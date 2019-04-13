jQuery(function(){
    $("#fixBox").load("index.html .fixBox");
    $(".g_footer").load("index.html #footer");
    $(".g_header").load("index.html #header",function(){
        $.getScript("js/common.js",function(){  
            dl(); 
            dongtai(comId);
            addCar(comId);
            xhr2();
        });
        var comId = location.search.slice(1).split("=")[1]; 
        $.ajax({
            url: "api/commodity.php",
            data: {id:comId},
            success: function (res) {
                render(JSON.parse(res));
            }
        });
       
        $(".listpic").on("mouseover",function(){
            $(".datu").children("img").prop("src",$(this).children("img")[0].src);
        });

        $(".datu").mouseover(function(){
            $(".datuBtn").show();
            $(".glassImg img").prop("src",$(this).children("img")[0].src);
            $(".glassImg").show();
        });
        $(".datu").mouseout(function(){
            $(".datuBtn").hide();
            $(".glassImg").hide();
        });
        $(".datu").mousemove(function(e){ 
            var etop = e.pageY - $(this).offset().top -  $(".datuBtn").height()/2;
            var eleft = e.pageX - $(this).offset().left -  $(".datuBtn").width()/2;
            var thisX = $(this).width() - $(".datuBtn").width();
            var thisY =  $(this).height() - $(".datuBtn").height();
            if(eleft < 0){
                eleft = 0;
            }else if(eleft > thisX){
                eleft =  thisX;
            }
            if(etop < 0){
                etop = 0;
            }else if(etop > thisY){
                etop =  thisY;
            }
            $(".datuBtn").css("left",eleft);
            $(".datuBtn").css("top",etop);
            var pX = eleft / thisX;
            var pY = etop / thisY;
            $(".glassImg img").css({
                "left": -pX * ($(".glassImg img").width() - $(".glassImg").width()),
                "top": -pY * ($(".glassImg img").height() - $(".glassImg").height())
            })
        });
    });
    function render(obj){
        $(".datu").children("img").prop("src",obj[0].com_img);
        $(".select").children("img").prop("src",obj[0].com_img);
        $(".msg_top").children("h3").text(obj[0].com_name);
        $(".ps_money").text(obj[0].com_price);
        $(".pj").children("span").text(obj[0].com_eval);
    }
    function dongtai(){
        $(".jia").on("click",function(){ 
            var val = $(".c_count").val();
            $(".c_count").val(Number(val)+1);
        });
        $(".jian").on("click",function(){
            var val = $(".c_count").val();
            if(val != 1){
                $(".c_count").val(Number(val)-1);
            }
        });
    }
    function addCar(comId){
        var user = $("#login_name").text();
        $(".m_addCar").on("click",function(){          
            var count = $(".c_count").val();
            $.ajax({
                url: "api/add_car.php",
                data: {id:comId,user:user,count:count},
                success: function (res) {
                    console.log(res)
                    if(res == 1){
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
    }
    function xhr2(){
        $.ajax({
            url: "api/list.php",
            data: {page:5,qty:4},
            success: function (res) {
                obj = JSON.parse(res);
                render2(obj.data);
            }
        });
    }
    function render2(obj){
        $(".tj_ul").html(
            $.map(obj, function (item) {
                return `<li data-id="${item.com_id}">
                            <a class="go_goods clearfix">
                                <img src="${item.com_img}" alt="">
                                <div class="fl">
                                    <p>${item.com_name}</p>
                                    <span>￥<span class="t_money">${item.com_price}</span></span>
                                </div>
                            </a>
                        </li>`;
            })
        );
        $(".lsc2").children("img").prop("src",obj[0].com_img);
        $(".lsc3").children("img").prop("src",obj[1].com_img);
        $(".lsc4").children("img").prop("src",obj[2].com_img);
        $(".last").children("img").prop("src",obj[3].com_img);
        $(".go_goods").on("click",function(){
            var id = $(this).parents("li").attr("data-id");
            location.href = "html/goods.html?comId="+id;
        });
    }
});