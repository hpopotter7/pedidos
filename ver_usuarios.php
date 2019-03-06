<?php 

include("conexion.php");
if (mysqli_connect_errno()) {
    printf("Error de conexion: %s\n", mysqli_connect_error());
    exit();
}
$return = Array("array");

if ($result = $mysqli->query("select Nombre from menu WHERE Tipo='sopa' ORDER BY RAND() LIMIT 1")){
    while ($row = $result->fetch_row()) {
        array_push($return, 'sopa', $row[0]);
    }

    $result->close();
}
if ($result = $mysqli->query("select Nombre from menu WHERE Tipo='guiso' ORDER BY RAND() LIMIT 1")){
    while ($row = $result->fetch_row()) {
        array_push($return, 'guiso', $row[0]);
    }

    $result->close();
}
if ($result = $mysqli->query("select Nombre from menu WHERE Tipo='agua' ORDER BY RAND() LIMIT 1")){
    while ($row = $result->fetch_row()) {
        array_push($return, 'agua', $row[0]);
    }

    $result->close();
}
if ($result = $mysqli->query("select Nombre from menu WHERE Tipo='postre' ORDER BY RAND() LIMIT 1")){
    while ($row = $result->fetch_row()) {
        array_push($return, 'postre', $row[0]);
    }

    $result->close();
}
$res=$res.json_encode($return)."\n";

echo $res;

$mysqli->close();
?>

