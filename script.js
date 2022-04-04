let form_planilla = document.getElementById("form_planilla");
let btn_obtener_empleados = document.getElementById('btn-obtener-empleados');
let body_planilla = document.getElementById("body-tbl-planilla");
let input_hidden_planilla = document.getElementById('listaEmpleadosPlanilla');
let btn_guardar_planilla = document.getElementById('btn_guardar_planilla');
let preLista = document.getElementById('preLista');
let listaEmpleados = [];

btn_obtener_empleados.addEventListener("click", () => {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	 	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	    	let dataJSON = JSON.parse(xmlhttp.responseText);
	    	listaEmpleados = dataJSON;
	    	actualizarTabla();
		}
	};

	xmlhttp.open("POST"," obtenerEmpleados.php?mes="+this.value);
	xmlhttp.send();
});


function actualizarTabla(){
	body_planilla.innerHTML = ""; //limpia el cuerpo de la tabla

	listaEmpleados.forEach(x => {
		console.log(x);
		
		let tr = document.createElement("tr");

		// columna nombre
		let td_nombre = document.createElement("td");
		td_nombre.appendChild(document.createTextNode(x.nombre));

		// columna salario
		let td_salario = document.createElement("td");
		let input_salario = document.createElement("input");
		input_salario.type = "number";
		input_salario.value = x.ingreso_salario;
		input_salario.min = 0;
		input_salario.addEventListener("change", () => {
			x.ingreso_salario = input_salario.value;
			actualizarTabla();
		});
		td_salario.appendChild(input_salario);

		// columna bono
		let td_bono = document.createElement("td");
		let input_bono = document.createElement("input");
		input_bono.type = "number";
		input_bono.value = x.ingreso_bono;
		input_bono.min = 0;
		input_bono.addEventListener("change", () => {
			x.ingreso_bono = input_bono.value;
			actualizarTabla();
		});
		td_bono.appendChild(input_bono);

		// columna otros
		let td_otros = document.createElement("td");
		let input_otros = document.createElement("input");
		input_otros.type = "number";
		input_otros.value = x.ingreso_otros;
		input_otros.min = 0;
		input_otros.addEventListener("change", () => {
			x.ingreso_otros = input_otros.value;
			actualizarTabla();
		});
		td_otros.appendChild(input_otros);

		// columna total ingresos
		let td_ingresos_total = document.createElement("td");
		let aux_total_ingresos = 
			parseFloat(x.ingreso_salario) + 
			parseFloat(x.ingreso_bono) + 
			parseFloat(x.ingreso_otros);
		td_ingresos_total.appendChild(document.createTextNode("Q. " + aux_total_ingresos));

		// columna descuento igsss
		let td_descuento_igss = document.createElement("td");
		let input_descuento_igss = document.createElement("input");
		input_descuento_igss.type = "number";
		input_descuento_igss.value = x.descuento_igss;
		input_descuento_igss.min = 0;
		input_descuento_igss.addEventListener("change", () => {
			x.descuento_igss = input_descuento_igss.value;
			actualizarTabla();
		});
		td_descuento_igss.appendChild(input_descuento_igss);

		// columna total descuento
		let td_descuento_total = document.createElement("td");
		let aux_total_descuento = parseFloat(x.descuento_igss);
		td_descuento_total.appendChild(document.createTextNode("Q. " + aux_total_descuento));

		// columna sueldo recibido
		let td_sueldo_recibido = document.createElement("td");
		let aux_sueldo = aux_total_ingresos - aux_total_descuento;
		td_sueldo_recibido.appendChild(document.createTextNode("Q. " + aux_sueldo));

		let td_acciones = document.createElement("td");
		let boton_quitar = document.createElement("button");
		boton_quitar.type = "button";
		boton_quitar.innerHTML = "Quitar"
		boton_quitar.addEventListener("click", () => {
			quitarEmpleado(x);
		});
		td_acciones.appendChild(boton_quitar);

		tr.appendChild(td_nombre);
		tr.appendChild(td_salario);
		tr.appendChild(td_bono);
		tr.appendChild(td_otros);
		tr.appendChild(td_ingresos_total);
		tr.appendChild(td_descuento_igss);
		tr.appendChild(td_descuento_total);
		tr.appendChild(td_sueldo_recibido);
		tr.appendChild(td_acciones);

		// actualizamos los totales

		x.ingreso_total = aux_total_ingresos;
		x.descuento_total = aux_total_descuento;
		x.sueldo_recibido = aux_sueldo;

		body_planilla.appendChild(tr);
	});

	input_hidden_planilla.value = JSON.stringify(listaEmpleados);
	preLista.innerHTML = JSON.stringify(listaEmpleados);
}

function quitarEmpleado(empleado){
	listaEmpleados = listaEmpleados.filter(x => x.id != empleado.id);
	actualizarTabla();
}

btn_guardar_planilla.addEventListener("click", () => {
	let formData = new FormData(form_planilla);

	var request = new XMLHttpRequest();
	request.open("POST", "procesarRegistroPlanilla.php"); // ruta o archivo
	request.send(formData);
	request.onreadystatechange = function() {
	 	if (request.readyState==4 && request.status==200) {
	    	try{
	    		let respuestaJSON = JSON.parse(request.responseText);
	    		
	    		if ( respuestaJSON.exito == true ){
	    			location.reload();
	    		}

	    		alert(respuestaJSON.mensaje);
	    	}catch(error){
	    		alert(error);
	    	}
		}
	};
});