jQuery(function($){
    var serch = location.search.slice(1).split("&");  
    var obj = {};
    serch.forEach(function(item){
        var arr = item.split('=');
        obj[arr[0]] = arr[1];
    });
    for (const key in obj) {
        if(key == "uname"){
            $("#login").hide();
            $("#quit").show();
            $("#login_name").text(obj[key]);
        }
    }
    $(".tuichu").on("click",function(){
        $("#quit").hide();
        $("#login").show();
        location.search = "";
        return false;
    });
});