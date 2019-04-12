<?php
    include './mysql.php';
    $id = isset($_GET["id"]) ? $_GET["id"] : "";
    $count = isset($_GET["count"]) ? $_GET["count"] : "";
    $user = isset($_GET["user"]) ? $_GET["user"] : ""; 
    $type = isset($_GET["type"]) ? $_GET["type"] : ""; 
    if($type == "0"){
        $sql = "UPDATE `".$user."` set count=count".$count."1 WHERE com_id = ".$id;
        if ($con->query($sql)) {
            echo true;
        } else {
            echo "Error: " . $sql . "<br>" . $con->error;
        }
    }else if($type == "1"){
        if($id == "*"){
            $sql = "DELETE FROM `".$user."`";
            if(mysqli_query($con,$sql) > 0){
                echo true;
            }
        }else{
            $sql = "DELETE FROM `".$user."` WHERE com_id = ".$id;
            if(mysqli_query($con,$sql) > 0){
                echo true;
            }
        }
    }
    $con->close();
?>