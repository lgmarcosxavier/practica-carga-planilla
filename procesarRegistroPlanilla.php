<?php

try{
	require_once "conexion.php";

	$mesPlanilla = $_POST['mesPlanilla'];
	$listaEmpleados = json_decode($_POST['listaEmpleadosPlanilla']);

	if (!is_countable($listaEmpleados)){
		echo json_encode([
			'exito' => false,
			'mensaje' => 'No se ha detectado ningún empleado.'
		]);
		die();
	}

	if (count($listaEmpleados) < 1){
		echo json_encode([
			'exito' => false,
			'mensaje' => 'No se ha detectado ningún empleado.'
		]);
		die();
	}

	$conexion = Conexion::conectar();
	$conexion->beginTransaction();
	
	try{
		$sql = "INSERT INTO planilla_empleado(id_empleado, ingreso_salario, ingreso_bono, ingreso_otros, ingreso_total, descuento_igss, descuento_total, sueldo_recibido) VALUE (?, ?, ?, ?, ?, ?, ?, ?);";

		$stmt = $conexion->prepare($sql);

		// acceder a los metodos con -> flecha
		foreach($listaEmpleados as $empleado){ 
			$stmt->bindValue(1, $empleado->id, PDO::PARAM_INT);
            $stmt->bindValue(2, $empleado->ingreso_salario, PDO::PARAM_STR);
            $stmt->bindValue(3, $empleado->ingreso_bono, PDO::PARAM_STR);
            $stmt->bindValue(4, $empleado->ingreso_otros, PDO::PARAM_STR);
            $stmt->bindValue(5, $empleado->ingreso_total, PDO::PARAM_STR);
            $stmt->bindValue(6, $empleado->descuento_igss, PDO::PARAM_STR);
            $stmt->bindValue(7, $empleado->descuento_total, PDO::PARAM_STR);
            $stmt->bindValue(8, $empleado->sueldo_recibido, PDO::PARAM_STR);
            $stmt->execute();
		}

		$conexion->commit();
		echo json_encode([
			'exito' => true,
			'mensaje' => 'Planilla registrada correctamente.'
		]);
		die();
	}catch(Exception|Throwable $e){
		$conexion->rollBack();
	}	
}catch(Exception|Throwable $e){
	echo json_encode([
		'exito' => false,
		'mensaje' => $e->getMessage()
	]);	
	die();
}