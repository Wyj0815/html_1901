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