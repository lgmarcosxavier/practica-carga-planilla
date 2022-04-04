-- CREAR TABLA EMPLEADO

CREATE TABLE empleado (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	ingreso_salario DECIMAL(10, 2) NOT NULL,
	ingreso_bono DECIMAL(10, 2) DEFAULT 0 NOT NULL,
	ingreso_otros DECIMAL(10, 2) DEFAULT 0 NOT NULL,
	ingreso_total DECIMAL(10, 2) NOT NULL,
	descuento_igss DECIMAL(10, 2) DEFAULT 0 NOT NULL,
	descuento_total DECIMAL(10, 2) NOT NULL,
	sueldo_recibido DECIMAL(10, 2) NOT NULL
);


CREATE TABLE planilla_empleado (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_empleado INT NOT NULL,
	ingreso_salario DECIMAL(10, 2) NOT NULL,
	ingreso_bono DECIMAL(10, 2) DEFAULT 0 NOT NULL,
	ingreso_otros DECIMAL(10, 2) DEFAULT 0 NOT NULL,
	ingreso_total DECIMAL(10, 2) NOT NULL,
	descuento_igss DECIMAL(10, 2) DEFAULT 0 NOT NULL,
	descuento_total DECIMAL(10, 2) NOT NULL,
	sueldo_recibido DECIMAL(10, 2) NOT NULL
);

