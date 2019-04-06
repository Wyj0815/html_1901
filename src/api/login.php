<?php
    include './mysql.php';
    $uname = isset($_POST["uname"]) ? $_POST["uname"] : null;
    $upsd = isset($_POST["upsd"]) ? $_POST["upsd"] : null;
    $sql = "SELECT * FROM user WHERE us_name='".$uname."' AND us_psd = '".$upsd."'";
    $res = $con->query($sql);
    if($res->num_rows){
        echo true;
    }


?>