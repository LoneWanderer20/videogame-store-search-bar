<?php

$q = htmlspecialchars($_REQUEST["q"]);
$responseArray;
$queryResponse;

if($q !== "") {
	
	$pos = strpos($q, "_");
	$qArray = array();
        $sql;
	
	while($pos !== false) {
		
	    $newString = substr($q, 0, $pos);
	    $newString = "'" . $newString . "'";
	    $qArray[] = $newString;
	    $q = substr($q, $pos + 1, strlen($q) - $pos);
	    $pos = strpos($q, "_");
	}
	
	$queryString = "";
	foreach($qArray as $i) {
        $queryString = $queryString . $i . ",";	
	}
	$queryString = rtrim($queryString, ",");
	
    if($queryString === "'playstation'") {
	    $sql = "SELECT title, image, sell_type, price, in_stock FROM videogame_info WHERE platform = 'playstation'";
	} else if($queryString === "'xbox'") {
	    $sql = "SELECT title, image, sell_type, price, in_stock FROM videogame_info WHERE platform = 'xbox'";
	} else if($queryString === "'nintendo'") {
	    $sql = "SELECT title, image, sell_type, price, in_stock FROM videogame_info WHERE platform = 'nintendo'";
	} else if($queryString === "'pc'") {
	    $sql = "SELECT title, image, sell_type, price, in_stock FROM videogame_info WHERE platform = 'pc'";
	} else {
	    $sql = "SELECT title, image, sell_type, price, in_stock FROM videogame_info WHERE keyword_1 IN (" . $queryString . ") OR keyword_2 IN (" . $queryString . ") OR keyword_3 IN (" . $queryString . ") OR keyword_4 IN (" . $queryString . ") OR
	    keyword_5 IN (" . $queryString . ")";
	}
	
	$servername = "localhost";
    $username = "root";
    $dbName = "user_database";	
    $connection = mysqli_connect($servername, $username, "", $dbName);
	
	if($connection === false) {
        die("ERROR: connection attempt failed " . mysqli_connect_error());
    } 
	
	$query = mysqli_query($connection, $sql) or die(mysqli_error($connection));
	
	$responseArray = mysqli_fetch_all($query, MYSQLI_NUM);
	
    $queryResponse = json_encode($responseArray);
	
	
	if(isset($queryResponse)) {
            echo $queryResponse;
    } 
	mysqli_free_result($query);
	
	mysqli_close($connection);
}
?>