<?php 

include("conexion.php");
if (mysqli_connect_errno()) {
    printf("Error de conexion: %s\n", mysqli_connect_error());
    exit();
}
$sopa="";
$guiso="";
$agua="";
$postre="";

if ($result = $mysqli->query("select Nombre from menu WHERE Tipo='sopa' ORDER BY RAND() LIMIT 1")){
    while ($row = $result->fetch_row()) {
    	 $sopa = $row[0];
    }

    $result->close();
}
if ($result = $mysqli->query("select Nombre from menu WHERE Tipo='guiso' ORDER BY RAND() LIMIT 1")){
    while ($row = $result->fetch_row()) {
    	$guiso = $row[0];
    }

    $result->close();
}
if ($result = $mysqli->query("select Nombre from menu WHERE Tipo='agua' ORDER BY RAND() LIMIT 1")){
    while ($row = $result->fetch_row()) {
    	$agua = $row[0];
    }

    $result->close();
}
if ($result = $mysqli->query("select Nombre from menu WHERE Tipo='postre' ORDER BY RAND() LIMIT 1")){
    while ($row = $result->fetch_row()) {
    	$postre = $row[0];
    }

    $result->close();
}
$return = Array('sopa'=>$sopa, 
        	'guiso'=>$guiso, 
        	'agua'=>$agua, 
        	'postre'=>$postre
        	);
$res=$res.json_encode($return)."\n";

echo $res;

$mysqli->close();
?>

