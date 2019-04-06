<?php
    $servername = "localhost";
    $sqlname = "root";
    $sqlpsd = "WX0720";
    $dbname = "buy_wine";
    $con = new mysqli($servername,$sqlname,$sqlpsd,$dbname);
    if($con->connect_errno){
        die("连接失败：" . $con->connect_errno);
    }
    $con->set_charset("utf-8");
?>