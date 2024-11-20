<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
    <link rel="stylesheet" href="../Includes/Header/Header.css">
    <link rel="stylesheet" href="../Includes/Footer/Footer.css">
    <link rel="stylesheet" href="../Admin/Admin.css">
</head>

<?php include '../Includes/Header/Header.php'; ?>
<?php include '../Includes/GetPlayers.php'; ?>

<body id="bodyDiv">
    <h2 id="playerName">Log as admin!</h2>

    <div id="passwordDiv">
        <label>Password:</label>
        <input id="password" autocomplete="off" placeholder="Type password" type="password"/>
    </div>

    <p id="error">Incorrect password!</p>

    <button id="login"> Login </button>
    <script src="../Admin/Admin.js"></script>
</body>

<?php include '../Includes/Footer/Footer.php'; ?>