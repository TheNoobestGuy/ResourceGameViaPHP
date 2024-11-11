<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resource Game</title>
    <link rel="stylesheet" href="../EndGame/EndGame.css">
    <link rel="stylesheet" href="../Includes/Header.css">
    <link rel="stylesheet" href="../Includes/Footer.css">
</head>

<?php include '../Includes/Header.php'; ?>

<body>
    <?php
        // Get players amount
        $players = isset($_GET['players']) ? $_GET['players'] : 'default';
        echo "<script>let playersAmount = " . (int)$players . ";</script>";
    ?>

    <h2 id="title">End game!</h2>

    <div class="podium">
    </div>

    <button id="submit">Submit</button>
    
    <script src="../EndGame/EndGame.js"></script>
</body>

<?php include '../Includes/Footer.php'; ?>