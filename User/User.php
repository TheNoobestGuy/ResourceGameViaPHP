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

<?php
    // Database connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "ResourceGame";

    try {
        // Create a connection
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Get users database
        $stmt = $conn->prepare("SELECT * FROM users");
        $stmt->execute();
        $usersDB = $stmt->fetchALL(PDO::FETCH_ASSOC);

        // Share database
        echo "<script>let usersDB = " . json_encode($usersDB) . ";</script>";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    // Close the connection
    $conn = null;
?>

<body>
    <div id="body">
        <h2>Log on user account!</h2>

        <ul class="menu">
            <li>
                <button id="logPlayer1"> Player 1 </button>
            </li>
            <li>
                <button id="logPlayer2"> Player 2 </button>
            </li>
            <li>
                <button id="logPlayer3"> Player 3 </button>
            </li>
            <li>
                <button id="logPlayer4"> Player 4 </button>
            </li>
        </ul>

        <h2 id="playerName">Choose player u want to login as!</h2>

        <div id="passwordDiv">
            <label>Password:</label>
            <input id="password" placeholder="Type password" type="password"/>
        </div>

        <p id="error">Incorrect password!</p>

        <button id="login"> Login </button>
        
        <script src="../User/User.js"></script>
    </div>
</body>

<?php include '../Includes/Footer.php'; ?>