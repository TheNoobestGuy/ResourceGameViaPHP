<?php
    // Connect with resources database
    $servername = "localhost";
    $username = "root"; 
    $password = ""; 
    $dbname = "ResourceGame";

    // Connection with tables
    $tablePlayers = 'players';

    try {
        // Connect to the database using PDO
        $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
        // Players database
        $stmt = $pdo->prepare("SELECT * FROM $tablePlayers");
        $stmt->execute();
        $playersData = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Export databases
        echo json_encode($playersData);
    } 
    catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }

    $conn = null;
?>