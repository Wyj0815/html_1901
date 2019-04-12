<?php
    include './mysql.php';
    $page = isset($_GET["page"]) ? $_GET["page"] : "";
    $qty = isset($_GET["qty"]) ? $_GET["qty"] : "";
    $type = isset($_GET["type"]) ? $_GET["type"] : ""; 
    if($type == "jia"){
        $sql = "SELECT * FROM commodity ORDER BY com_price";
    }else if($type == "ping"){
        $sql = "SELECT * FROM commodity ORDER BY com_eval";
    }else if($type == "last"){
        $sql = "SELECT * FROM commodity ORDER BY `time`";
    }else{
        $sql = "SELECT * FROM commodity";
    }
    $res = $con->query($sql);
    $row = $res->fetch_all(MYSQLI_ASSOC);
    if($type == "xiao"){
        $row = array_reverse($row);
    }
    $data = array_slice($row, $qty*($page-1),$qty);
    $resarr = array(
        "data" => $data,
        "qty" => $qty,
        "page" => $page,
        "count" => count($row)
    );
    $res->close();
    echo json_encode($resarr,JSON_UNESCAPED_UNICODE);
    $con->close();
?>