<?php
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
        $X = $playersData[$player]['Good_X'];
        $Y = $playersData[$player]['Good_Y'];
        $Z = $playersData[$player]['Good_Z'];

        $stmt = $pdo->prepare("UPDATE players SET Good_X = $X, Good_Y = $Y, Good_Z = $Z WHERE ID = ($player+1);");
        $stmt->execute();
    }
    catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
?>