<?php
    include './mysql.php';
    $user = isset($_GET["user"]) ? $_GET["user"] : "";
    $sql = "SELECT * FROM `".$user."`";
    $res = $con->query($sql);
    $row = $res->fetch_all(MYSQLI_ASSOC);
    $res->close();
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
    $con->close();
?>