<?php
    $player = isset($_GET["player"]) ? $_GET["player"] : -1;

    // Connect with resources database
    $servername = "localhost";
    $username = "root"; 
    $password = ""; 
    $dbname = "ResourceGame";
    
    if ($player == 4) {
        try {
            // Connect to the database using PDO
            $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $stmt = $pdo->prepare("UPDATE game SET Round = Round + 1");
            $stmt->execute();
        }
        catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }
?>