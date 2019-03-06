<?php 
$nombre=$_POST['nombre'];
$guiso=$_POST['guiso'];
$agua=$_POST['agua'];
$postre=$_POST['postre'];

include("conexion.php");
	//$mysqli = new mysqli("localhost", "tierra_ideas", "adminadmin", "tierra_ideas");
	
	//$mysqli = new mysqli("localhost", "tierrad9_admin", "Quick2215!", "tierrad9_admin");
	
	if (mysqli_connect_error()) {
	    echo "Error de conexion: %s\n", mysqli_connect_error();
	    exit();
	}
		
		if(!empty($nombre)){
			$sql="INSERT INTO menu (Nombre,	Tipo, Fecha) VALUES ('".$nombre."', 'sopa', NOW())";
			$mysqli->query($sql);
		}
		if(!empty($guiso)){
			$sql="INSERT INTO menu (Nombre,	Tipo, Fecha) VALUES ('".$guiso."', 'guiso', NOW())";
			$mysqli->query($sql);
		}
		if(!empty($agua)){
			$sql="INSERT INTO menu (Nombre,	Tipo, Fecha) VALUES ('".$agua."', 'agua', NOW())";
			$mysqli->query($sql);
		}
		if(!empty($postre)){
			$sql="INSERT INTO menu (Nombre,	Tipo, Fecha) VALUES ('".$postre."', 'postre', NOW())";
			$mysqli->query($sql);
		}
		
		    $respuesta= "Gracias por colaborar";
		

		echo $respuesta;

	$mysqli->close();
?>