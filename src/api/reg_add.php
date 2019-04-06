<?php
    include './mysql.php';
    $uname = isset($_POST["uname"]) ? $_POST["uname"] : null;
    $upsd = isset($_POST["upsd"]) ? $_POST["upsd"] : null;
    $sql = "INSERT INTO `user` (us_name,us_psd) VALUES ('".$uname."','".$upsd."')";
    $res = $con->query($sql);
    if($res){
        echo true;
    }else {
        echo "Error: " . $sql . "<br>" . $con->error;
    }
?>