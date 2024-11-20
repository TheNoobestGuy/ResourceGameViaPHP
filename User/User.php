<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User</title>
    <link rel="stylesheet" href="../User/User.css">
    <link rel="stylesheet" href="../Includes/Header.css">
    <link rel="stylesheet" href="../Includes/Footer.css">
</head>

<?php include '../Includes/Header.php'; ?>
<?php include '../Includes/GetPlayers.php'; ?>

<body>
    <h2>Log on user account!</h2>

    <ul class="menu">
    </ul>

    <h2 id="playerName">Choose player u want to login as!</h2>

    <div id="passwordDiv">
        <label>Password:</label>
        <input id="password" autocomplete="off" placeholder="Type password" type="password"/>
    </div>

    <p id="error">Incorrect password!</p>
    
    <button id="login"> Login </button>
    
    <script src="../User/User.js"></script>
</body>

<?php include '../Includes/Footer.php'; ?>