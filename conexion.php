<?php
    class Conexion{
        public function conectar(){
            $conexion = new PDO(
                "mysql:host=localhost;dbname=practica_planilla", 
                "root", 
                "");
            return $conexion;
        }
    }
?>