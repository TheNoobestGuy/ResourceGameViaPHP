<?php
    // Get players amount and rounds
    $player = isset($_GET['player']) ? $_GET['player'] : 'default';

    // Connect with resources database
    $servername = "localhost";
    $username = "root"; 
    $password = ""; 
    $dbname = "ResourceGame";

    // Connection with tables
    $tablePlayers = 'users';
    $tableResources = 'resources';

    try {
        // Connect to the database using PDO
        $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
        // Players database
        $stmt = $pdo->prepare("SELECT * FROM $tablePlayers");
        $stmt->execute();
        $playersData = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Resources database
        $stmt = $pdo->prepare("SELECT * FROM $tableResources");
        $stmt->execute();
        $resourcesData = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Export databases
        echo "<script>let player = " . (int)$player . ";</script>";
        echo "<script>let playersData = " . json_encode($playersData) . ";</script>";
        echo "<script>let resourcesData = " . json_encode($resourcesData) . ";</script>";
    } 
    catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }

    $conn = null;
?>