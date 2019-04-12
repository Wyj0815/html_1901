<?php
    include './mysql.php';
    $type = isset($_GET["type"]) ? $_GET["type"] : "";
    $sql = "SELECT * FROM commodity";
    $res = $con->query($sql);
    $row = $res->fetch_all(MYSQLI_ASSOC);
    $a = array();
    foreach($row as $item){
        if($item["com_type"] == $type){
            array_push($a,$item);
        }
    }
    $res->close();
    echo json_encode($a,JSON_UNESCAPED_UNICODE);
    $con->close();
?>