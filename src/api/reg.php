<?php
    include './mysql.php';
    $uname = isset($_GET["uname"]) ? $_GET["uname"] : null;
    $sql = "SELECT * FROM user WHERE us_name='".$uname."'";
    $res = $con->query($sql);
    if($res->num_rows){
        echo true;
    }
?>