<?php
    // Get players amount and rounds
    $players = isset($_GET['players']) ? $_GET['players'] : 'default';
    $round = isset($_GET['round']) ? $_GET['round'] : 'round';
    
    // Connect with resources database
    $host = 'localhost';
    $dbname = 'rgame';
    $username = 'root';
    $password = '';

    // Connection with tables
    $tablePlayers = 'players';
    $tableResources = 'resources';
    $tableGoods = 'goods';

    try {
        // Connect to the database using PDO
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
        // Player database
        $stmt = $pdo->prepare("SELECT * FROM $tablePlayers");
        $stmt->execute();
        $playersData = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $playersDataBackup = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // Resources database
        $stmt = $pdo->prepare("SELECT * FROM $tableResources");
        $stmt->execute();
        $resourcesData = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Goods database
        $stmt = $pdo->prepare("SELECT * FROM $tableGoods");
        $stmt->execute();
        $goodsData = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Export databases
        echo "<script>let playersAmount = " . (int)$players . ";</script>";
        echo "<script>let roundsAmount = " . (int)$round . ";</script>";
        echo "<script>let playersData = " . json_encode($playersData) . ";</script>";
        echo "<script>let playersDataBackup = " . json_encode($playersDataBackup) . ";</script>";
        echo "<script>let resourcesData = " . json_encode($resourcesData) . ";</script>";
        echo "<script>let goodsData = " . json_encode($goodsData) . ";</script>";
    } 
    catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
?>