<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resource Game</title>
    <link rel="stylesheet" href="Main.css">
    <link rel="stylesheet" href="Includes/Header.css">
    <link rel="stylesheet" href="Includes/Footer.css">
</head>

<?php include 'Includes/Header.php'; ?>

<?php
    // Connect with resources database
    $host = 'localhost';
    $dbname = 'rgame';
    $username = 'root';
    $password = '';

    try {
        // Connect to the database using PDO
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Reset player database
        for ($i = 1; $i <= 4; $i++) {
            $stmt = $pdo->prepare("UPDATE players SET Wood = 0, Stone = 0, Metal = 0, Money = 10000, WoodenTable = 0, MarbleTable = 0, Chandelier = 0 WHERE ID = $i;");
            $stmt->execute();
        }
    } 
    catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
?>

<body>
    <h2>Welcome to resource game created via PHP!</h2>
    <p>Select how many players u want to have in game! Game ends after qfive full rounds!</p>
    
    <ul class="menu">
        <li>
            <button id="buttonPlayers2"> 2 Players </button>
        </li>
        <li>
            <button id="buttonPlayers3"> 3 Players </button>
        </li>
        <li>
            <button id="buttonPlayers4"> 4 Players </button>
        </li>
    </ul>

    <script src="Main.js"></script>
</body>

<?php include 'Includes/Footer.php'; ?>