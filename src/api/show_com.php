<?php
    include './mysql.php';
    $sql = "SELECT * FROM show_com";
    $res = $con->query($sql);
    $row = $res->fetch_all(MYSQLI_ASSOC);
    $res->close();
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
    $con->close();
?>