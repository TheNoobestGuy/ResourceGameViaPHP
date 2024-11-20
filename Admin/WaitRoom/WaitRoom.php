<?php include '../../Includes/ValidateToken.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wait Room</title>
    <link rel="stylesheet" href="../../Includes/Header/Header.css">
    <link rel="stylesheet" href="../../Includes/Footer/Footer.css">
    <link rel="stylesheet" href="../WaitRoom/WaitRoom.css">
</head>

<?php include '../../Includes/Header/Header.php'; ?>
<?php include '../../Includes/GetPlayers.php'; ?>

<body>
    <h2>List of players that are currently waiting:</h2>

    <table id="onnlineTable">
    </table>
    
    <button id="start">Start Game</button>

    <script src="../WaitRoom/WaitRoom.js"></script>
</body>

<?php include '../../Includes/Footer/Footer.php'; ?>