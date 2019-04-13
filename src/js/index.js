jQuery(function($){
    $("#output").lunbo({
        imgurl:["img/index/7d2f0da441884ab98365e768dfa61d5e.jpg",
                "img/index/ba40a2e1b72d40b99065cfe4419fe2bd.jpg",
                "img/index/65e3c6fd815645f497e2b35e12800a09.jpg",
                "img/index/8518fd4a74f443a896df10921bfcf905.jpg",
                "img/index/8702d80f5662476d92794ff04b7283ba.jpg",
                "img/index/b5a3ba84a4354702bce87068d5b59ec6.jpg",
                "img/index/4b089ae5e1c7472296fbbaae77bc0fad.jpg"
        ],
        type:"faded"
    });
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal', 
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    }); 

    $(".erji").show();
    
    dl(); 



    // jqajax();
    jqajax2(".maotai",{type:0});
    jqajax2(".laojiu",{type:1});
    jqajax2(".zhekou",{type:2});
    jqajax2(".chaozhi",{type:3});
    jqajax2(".remai",{type:4});

    jqajax3(".mthuodong",{type:0});
    jqajax3(".ljhuodong",{type:1});
    jqajax3(".zkhuodong",{type:2});
    jqajax3(".czhuodong",{type:3});
    jqajax3(".rmhuodong",{type:4});

    jqajax4(5,render,7);
    jqajax4(1,render4,5);
    jqajax4(2,render5,5);


    function jqajax3(ele,a){
        $.ajax({
            url: "api/activity.php",
            data: a,
            success: function (res) {
                obj = JSON.parse(res);
                render3(ele,obj);
            }
        });
    }
    function render3(ele,obj){
        $(ele).html(
            $.map(obj, function (item, idx) {
                return `<a href="">
                            <img src="${item.com_img}" alt="">
                        </a>`
            })
        );
    }
    function jqajax2(ele,a){
        $.ajax({
            url: "api/commodity.php",
            data: a,
            success: function (res) {
                obj = JSON.parse(res);
                render2(ele,obj);
            }
        });
    }

    function jqajax4(page,render,qty){
        $.ajax({
            url: "api/list.php",
            data: {page:page,qty:qty},
            success: function (res) {
                obj = JSON.parse(res);
                render(obj.data);
            }
        });
    }
    
    function render2(ele,obj){
        $(ele).html(
            $.map(obj, function (item, idx) {
                return `<li data-id="${item.com_id}">
                            <a class="go_goods">
                                <div>${item.com_recom}</div>
                                <img src="${item.com_img}" alt="">
                                <p>${item.com_name}</p>
                                <span>${item.com_price}元</span>
                            </a>
                        </li>`
            })
        );
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
    function tiaozhuang(){
        $(".go_goods").on("click",function(){
            var id = $(this).parents("li").attr("data-id");
            location.href = "html/goods.html?comId="+id;
        });
    }
    function render(obj){
        $(".cont_ul").html(
            $.map(obj, function (item, idx) {
                return `<li data-id="${item.com_id}">
                            <a class="go_goods">
                                <img src="${item.com_img}" alt="">
                                <p> <span id="a_name">${item.com_name}</span> <span id="a_price">${item.com_price}元</span></p>
                            </a>
                        </li>`
            })
        );
        tiaozhuang();
    }
    function render4(obj){
        $(".slide1").html(
            $.map(obj, function (item, idx) {
                return `<li data-id="${item.com_id}">
                            <a class="go_goods">
                                <img src="${item.com_img}" alt="">
                                <p class="s_name">${item.com_name}</p>
                                <p class="s_price">${item.com_price}元</p>
                                <p class="s_pinglun">${item.com_eval} 人好评</p>
                            </a>
                        </li>`
            })
        );
        tiaozhuang();
    }
    function render5(obj){
        $(".slide2").html(
            $.map(obj, function (item, idx) {
                return `<li data-id="${item.com_id}">
                            <a class="go_goods">
                                <img src="${item.com_img}" alt="">
                                <p class="s_name">${item.com_name}</p>
                                <p class="s_price">${item.com_price}元</p>
                                <p class="s_pinglun">${item.com_eval} 人好评</p>
                            </a>
                        </li>`
            })
        );
        tiaozhuang();
    }
});