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
    <?php include '../ShareDatabase.php'; ?>
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