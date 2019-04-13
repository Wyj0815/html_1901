<?php
    include './mysql.php';
    $id = isset($_GET["id"]) ? $_GET["id"] : "";
    $user = isset($_GET["user"]) ? $_GET["user"] : ""; 
    $count = isset($_GET["count"]) ? $_GET["count"] : 1; 
    $sql = "SELECT * FROM commodity WHERE com_id =".$id;
    $res = $con->query($sql);
    $row = $res->fetch_all(MYSQLI_ASSOC);
    $sql2 = "SELECT * FROM `".$user."` WHERE com_id =".$id;
    $res2 = $con->query($sql2);
    if($row != "" and $res2->num_rows <= 0){
        $sql3 = "INSERT INTO `".$user."`(com_id,com_name,com_price,com_img,count) VALUES (".$row[0]["com_id"].",'".$row[0]["com_name"]."','".$row[0]["com_price"]."','".$row[0]["com_img"]."',".$count.")";
        if ($con->query($sql3)) {
            echo true;
        } else {
            echo "Error: " . $sql . "<br>" . $con->error;
        }
    }else if($res2->num_rows > 0){
        if($count == 1){
            $sql4 = "UPDATE `".$user."` set count=count+1 WHERE com_id = '".$id."'";
            if ($con->query($sql4)) {
                echo true;
            } else {
                echo "Error: " . $sql4 . "<br>" . $con->error;
            }
        }else{
            $sql5 = "UPDATE `".$user."` set count=count+".$count." WHERE com_id = '".$id."'";
            if ($con->query($sql5)) {
                echo true;
            } else {
                echo "Error: " . $sql5 . "<br>" . $con->error;
            }
        }
    }
    $res->close();
    $res2->close();
    $con->close();
?>