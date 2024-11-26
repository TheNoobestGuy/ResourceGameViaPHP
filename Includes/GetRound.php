<?php
    // Connect with resources database
    $servername = "localhost";
    $username = "root"; 
    $password = ""; 
    $dbname = "ResourceGame";
    
    try {
        // Connect to the database using PDO
        $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("SELECT * FROM game");
        $stmt->execute();
        $gameData = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo "<script>let round = " . (int)$gameData[0]['Round'] . ";</script>";
    }
    catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
?>