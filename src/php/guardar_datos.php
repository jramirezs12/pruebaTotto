<?php
include 'db_connection.php';

function isEmailRegistered($email, $conn) {
    $sql_check_email = "SELECT COUNT(*) FROM tabla_datos WHERE email = :email";
    $stmt_check_email = $conn->prepare($sql_check_email);
    $stmt_check_email->bindParam(':email', $email);
    $stmt_check_email->execute();

    $emailCount = $stmt_check_email->fetchColumn();

    return $emailCount > 0;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['email'])) {
        $email = $_POST['email'];

        if (isEmailRegistered($email, $conn)) {
            $response = array("status" => "error", "message" => "El correo electrónico ya está registrado.");
            echo json_encode($response);
        } else {
            $response = array("status" => "success", "message" => "El correo electrónico no está registrado.", "redirect" => "form.html");
            echo json_encode($response);
        }
    } else {
        $response = array("status" => "error", "message" => "Error: El campo 'email' no está definido en el formulario.");
        echo json_encode($response);
    }
}
?>