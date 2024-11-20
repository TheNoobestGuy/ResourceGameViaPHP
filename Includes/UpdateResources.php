<?php
    // Set the content type to JSON for the response
    header('Content-Type: application/json');

    // Get the JSON input and decode it to a PHP array
    $inputData = json_decode(file_get_contents("php://input"), true);
    $playersData = $inputData["playersData"];
    $player = $inputData["player"];

    // Connect with resources database
    $servername = "localhost";
    $username = "root"; 
    $password = ""; 
    $dbname = "ResourceGame";
    
    try {
        // Connect to the database using PDO
        $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Alter players database with MySQL depending on accessed array
        $A = $playersData[$player]['Resource_A'];
        $B = $playersData[$player]['Resource_B'];
        $C = $playersData[$player]['Resource_C'];
        $D = $playersData[$player]['Resource_D'];
        $money = $playersData[$player]['Money'];

        $stmt = $pdo->prepare("UPDATE players SET Resource_A = $A, Resource_B = $B, Resource_C = $C, Resource_D = $D, Money = $money WHERE ID = ($player+1);");
        $stmt->execute();
    } 
    catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
?>