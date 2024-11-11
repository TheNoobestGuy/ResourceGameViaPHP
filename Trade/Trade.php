<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resource Game</title>
    <link rel="stylesheet" href="../Trade/Trade.css">
    <link rel="stylesheet" href="../Includes/Header.css">
    <link rel="stylesheet" href="../Includes/Footer.css">
</head>

<?php include '../Includes/Header.php'; ?>

<body>
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

            // Goods database
            $stmt = $pdo->prepare("SELECT * FROM $tableGoods");
            $stmt->execute();
            $goodsData = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Export database
            echo "<script>let playersAmount = " . (int)$players . ";</script>";
            echo "<script>let roundsAmount = " . (int)$round . ";</script>";
            echo "<script>let playersData = " . json_encode($playersData) . ";</script>";
            echo "<script>let goodsData = " . json_encode($goodsData) . ";</script>";
        } 
        catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    ?>

    <h2 id="title">Result of trades and owned resources by players!</h2>

    <div class=tables>
        <table id="resourcesTable">
            <tr>
                <th>Player</th>
                <th>Wood</th>
                <th>Stone</th>
                <th>Metal</th>
                <th>Money</th>
            </tr>
        </table>
    </div>

    <button id="submit">Submit</button>
    
    <script src="../Trade/TradeScript.js"></script>
</body>

<?php include '../Includes/Footer.php'; ?>