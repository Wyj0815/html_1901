<?php
    include './mysql.php';
    $page = isset($_GET["page"]) ? $_GET["page"] : "";
    $qty = isset($_GET["qty"]) ? $_GET["qty"] : "";
    $type = isset($_GET["type"]) ? $_GET["type"] : ""; 
    $start_val = isset($_GET["start_val"]) ? $_GET["start_val"] : ""; 
    $over_val = isset($_GET["over_val"]) ? $_GET["over_val"] : ""; 
    $jiu_val = isset($_GET["jiu_val"]) ? $_GET["jiu_val"] : ""; 
    if($start_val == "" and $jiu_val == ""){
        if($type != ""){
            $sql = "SELECT * FROM commodity ORDER BY ".$type;
        }
        else{
            $sql = "SELECT * FROM commodity";
        }
    }else if($jiu_val == ""){
        if($over_val == "元及以上"){
            $sql = "SELECT * FROM commodity WHERE com_price>".$start_val." ORDER BY ".$type;
        }else{
            $sql = "SELECT * FROM commodity WHERE com_price BETWEEN ".$start_val." AND ".$over_val." ORDER BY ".$type;
        }
    }else if($start_val == ""){
        $sql = "SELECT * FROM commodity WHERE com_name like'%".$jiu_val."%' ORDER BY ".$type;
    }else{
        if($over_val == "元及以上"){
            $sql = "SELECT * FROM commodity WHERE com_price>".$start_val." AND com_name like'%".$jiu_val."%'  ORDER BY ".$type;
        }else{
            $sql = "SELECT * FROM commodity WHERE com_price BETWEEN ".$start_val." AND ".$over_val." AND com_name like'%".$jiu_val."%' ORDER BY ".$type;
        }
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