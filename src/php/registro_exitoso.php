<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $cedula = $_POST['cedula'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $movil = $_POST['movil'];
    $departamento = $_POST['departamento'];
    $ciudad = $_POST['ciudad'];
    $nacimiento = $_POST['nacimiento'];
    $hijos = $_POST['hijos'];
    $genero = $_POST['genero'];
    $acepto = isset($_POST['acepto']) ? 1 : 0;

    try {
        $sql_insert_data = "INSERT INTO tabla_datos (email, cedula, nombre, apellido, movil, departamento, ciudad, nacimiento, hijos, genero, acepto)
                            VALUES (:email, :cedula, :nombre, :apellido, :movil, :departamento, :ciudad, :nacimiento, :hijos, :genero, :acepto)";
        $stmt_insert_data = $conn->prepare($sql_insert_data);
        $stmt_insert_data->bindParam(':email', $email);
        $stmt_insert_data->bindParam(':cedula', $cedula);
        $stmt_insert_data->bindParam(':nombre', $nombre);
        $stmt_insert_data->bindParam(':apellido', $apellido);
        $stmt_insert_data->bindParam(':movil', $movil);
        $stmt_insert_data->bindParam(':departamento', $departamento);
        $stmt_insert_data->bindParam(':ciudad', $ciudad);
        $stmt_insert_data->bindParam(':nacimiento', $nacimiento);
        $stmt_insert_data->bindParam(':hijos', $hijos);
        $stmt_insert_data->bindParam(':genero', $genero);
        $stmt_insert_data->bindParam(':acepto', $acepto);

        if ($stmt_insert_data->execute()) {
            $response = array("status" => "success", "message" => "Información registrada exitosamente.");
            echo json_encode($response);
        } else {
            $response = array("status" => "error", "message" => "Error al registrar la información.");
            echo json_encode($response);
        }
    } catch(PDOException $e) {
        $response = array("status" => "error", "message" => "Error de conexión: " . $e->getMessage());
        echo json_encode($response);
    }
}
?>
