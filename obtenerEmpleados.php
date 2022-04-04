<?php

require_once "conexion.php";

$empleados = [];

$sql = "SELECT * FROM empleado;";
$query = Conexion::conectar()->prepare($sql);
$query->execute();

// $empleados = $query->fetchAll(PDO::FETCH_KEY_PAIR);

// para obtener una lista como clave el nombre de la columna
foreach ($query->fetchAll(PDO::FETCH_ASSOC) as $row)
{
    $empleados[] = $row;
}

echo json_encode($empleados, JSON_UNESCAPED_UNICODE);