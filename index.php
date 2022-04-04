<?php
	$meses = array(
		'1' => 'Enero',
		'2' => 'Febrero',
		'3' => 'Marzo',
		'4' => 'Abril',
		'5' => 'Mayo',
		'6' => 'Junio',
		'7' => 'Julio',
		'8' => 'Agosto',
		'9' => 'Septiembre',
		'10' => 'Octubre',
		'11' => 'Noviembre',
		'12' => 'Diciembre'
	);
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Carga planilla</title>
	<style type="text/css">
		table, th, td {
			border: 1px solid;
		}

		table {
			table-layout:fixed;
			width: 100%;
		}

		pre { 
			white-space: pre-wrap;
			width: 40em;
			width: 70ch;
		}
	</style>
</head>
<body>
	<form id="form_planilla" method="post">
		<label for="mesPlanilla">Seleccionar mes</label>
		<select name="mesPlanilla">
			<?php
			foreach($meses as $key => $value){
				echo "<option value='$key'>$value</option>";
			}
			?>
		</select>

		<button id="btn-obtener-empleados" type="button">Cargar empleados!</button>
		<br />
		<br />
		<div id="contenedorEmpleado">
			<table id="tbl_empleados">
				<thead>
					<tr>
						<th>NOMBRE</th>
						<th>SALARIO</th>
						<th>BONOS</th>
						<th>OTROS</th>
						<th>TOTAL INGRESOS</th>
						<th>IGSS</th>
						<th>TOTAL DESCUENTO</th>
						<th>SUELDO RECIBIDO</th>
						<th></th>
					</tr>
				</thead>
				<tbody id="body-tbl-planilla">
					
				</tbody>
			</table>
		</div>

		<input type="hidden" name="listaEmpleadosPlanilla" id="listaEmpleadosPlanilla">
		<br />
		<br />
		<button id="btn_guardar_planilla" type="button" style="background-color: blue; color: white;">GUARDAR PLANILLA</button>
	</form>

	<pre id="preLista"></pre>

	<script type="text/javascript" src="./script.js" defer></script>
</body>
</html>