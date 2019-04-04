jQuery(function($){
    var $input =  $("#reg_form").find("input");
    $(".register").on("click",function(event){
        var ipt = "";
        $input.each(function () { 
            if($(this).val() == ""){
               ipt = "文本框不能为空";
               return false;
            }
        });
        if(ipt){
            alert(ipt);
            event.preventDefault();
        }
        else if(!/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test($input.first().val())){
            alert("手机号格式不正确！");
            event.preventDefault();
        }
        else if($input.eq(1).val() != $(".ver_code").text()){
            alert("验证码不正确！");
            event.preventDefault();
        }
        else if(!/^\w{6,22}$/.test( $input.eq(2).val())){
            alert("设置密码格式不正确！");
            event.preventDefault();
        }
        else if($input.eq(3).val() !=  $input.eq(2).val()){
            alert("两次密码不一致！");
            event.preventDefault();
        }
    });
});