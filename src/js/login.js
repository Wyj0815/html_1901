jQuery(function($){
    var show_num = [];
    draw(show_num);
    var $autologin = $("#autologin");
    var date = new Date();
    date.setDate(date.getDate() + 7);

    var cook_uname = Cookie.getCookie("uname");
    var cook_upsd = Cookie.getCookie("upsd");
    console.log(cook_uname,cook_upsd);
    if(cook_uname){
        $.ajax({
            type: "POST",
            url: "../api/login.php",
            data: {uname:cook_uname,upsd:cook_upsd},
            success: function (res) {
                if(res){
                    location.href = '../index1.html?uname='+cook_uname;
                }
            }
        });
    }
    $("#btnSubmit").on("click",function(){
        var _name  = $("#txtUserName").val();
        var _psd = $("#txtPassword").val();
        var $code = $("#loginCode");
        var show_code = show_num.join("");
        var yanzheng;
        $.ajax({
            type: "POST",
            url: "../api/login.php",
            data: {uname:_name,upsd:_psd},
            success: function (res) {
                yanzheng = res;
                if($code[0].style.display == "none"){
                    if(!yanzheng){
                        alert("用户名或密码错误！");
                        $("#loginCode").show();
                    }else{
                        if($autologin[0].checked){
                            Cookie.setCookie("uname",_name,date);
                            Cookie.setCookie("upsd",_psd,date);
                        }
                        location.href = '../index1.html?uname='+_name;
                    }
                }else{
                    console.log(!yanzheng);
                    if(!yanzheng){
                        alert("用户名或密码错误！");
                    }else{
                        if($("#txtCode").val() != show_code){
                            alert("验证码不正确！");
                            draw(show_num);
                        }else{
                            if($autologin[0].checked){
                                Cookie.setCookie("uname",_name,date);
                                Cookie.setCookie("upsd",_psd,date);
                            }
                            location.href = '../index1.html?uname='+_name;
                        }
                    }
                }
            }
        });
    }); 
})