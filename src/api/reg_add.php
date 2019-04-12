<?php
    include './mysql.php';
    $uname = isset($_POST["uname"]) ? $_POST["uname"] : null;
    $upsd = isset($_POST["upsd"]) ? $_POST["upsd"] : null;
    $sql = "INSERT INTO `user` (us_name,us_psd) VALUES ('".$uname."','".$upsd."')";
    $res = $con->query($sql);
    if($res){
        $sql2 = "CREATE TABLE `".$uname."`
        (
            com_id int NOT NULL,
            PRIMARY KEY(com_id),
            com_name varchar(255) NOT NULL,
            com_price int NOT NULL,
            com_img	varchar(255) NOT NULL,	
            count int DEFAULT 1
        )";
        $con->query($sql2);
        mysql_close($con);
        echo true;
    }else {
        echo "Error: " . $sql . "<br>" . $con->error;
    }
?>