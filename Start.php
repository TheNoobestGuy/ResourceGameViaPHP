<?php
// Database connection details
$servername = "localhost";
$username = "root"; 
$password = ""; 
$database = "ResourceGame";

try {
    // Create a connection
    $conn = new PDO("mysql:host=$servername", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Delete old database
    $sql = "DROP DATABASE $database";
    $conn->exec($sql);

    // Create the database
    $sql = "CREATE DATABASE $database";
    $conn->exec($sql);
    
    // Connect to database
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create players table
    $sql = "CREATE TABLE Players (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        Admin BOOLEAN DEFAULT FALSE,
        Password VARCHAR(20) NOT NULL,
        Resource_A INT DEFAULT 0,
        Resource_B INT DEFAULT 0,
        Resource_C INT DEFAULT 0,
        Resource_D INT DEFAULT 0,
        Good_X INT DEFAULT 0,
        Good_Y INT DEFAULT 0,
        Good_Z INT DEFAULT 0,
        Money INT DEFAULT 1000,
        InGame BOOLEAN DEFAULT FALSE
    )";
    $conn->exec($sql);

    // Create resources table
    $sql = "CREATE TABLE Resources (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(20) NOT NULL UNIQUE,
        Cost INT DEFAULT 0
    )";
    $conn->exec($sql);

    // Create goods table
    $sql = "CREATE TABLE Goods (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(20) NOT NULL UNIQUE,
        Cost_A INT NOT NULL,
        Cost_B INT NOT NULL,
        Cost_C INT NOT NULL,
        Cost_D INT NOT NULL
    )";
    $conn->exec($sql);
    
    // Create offers table  
    $sql = "CREATE TABLE Offerts (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        Player INT NOT NULL,
        Product CHAR NOT NULL,
        Amount INT NOT NULL,
        Price INT NOT NULL
    )";
    $conn->exec($sql);

    // Create stock table
    $sql = "CREATE TABLE Stock (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        Product CHAR NOT NULL,
        Demand INT NOT NULL,
        Price INT NOT NULL
    )";
    $conn->exec($sql);

    // Fill database
    for($i = 0; $i < 4; $i++) {
        $password = "player" .(string)($i + 1);
        $sql = "INSERT INTO Players (Password) VALUES ('$password')";
        $conn->exec($sql);
    }
    $password = "admin";
    $sql = "INSERT INTO Players (Admin, Password) VALUES (TRUE, '$password')";
    $conn->exec($sql);

    $value = 1;
    $names = ["A", "B", "C", "D"];
    for($i = 0; $i < 4; $i++) {
        $sql = "INSERT INTO Resources (Name, Cost) VALUES ('$names[$i]', $value)";
        $conn->exec($sql);
        $value++;
        if ($value == 3) {
            $value++;
        }
    }

    $sql = "INSERT INTO Goods (Name, Cost_A, Cost_B, Cost_C, Cost_D) VALUES ('X', 7, 3, 2, 5 )";
    $conn->exec($sql);
    $sql = "INSERT INTO Goods (Name, Cost_A, Cost_B, Cost_C, Cost_D) VALUES ('Y', 1, 4, 7, 3)";
    $conn->exec($sql);
    $sql = "INSERT INTO Goods (Name, Cost_A, Cost_B, Cost_C, Cost_D) VALUES ('Z', 1, 3, 1, 5)";
    $conn->exec($sql);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Close the connection
$conn = null;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Start</title>
    <link rel="stylesheet" href="Start.css">
    <link rel="stylesheet" href="../../Includes/Header/Header.css">
    <link rel="stylesheet" href="../../Includes/Footer/Footer.css">
</head>

<?php include 'Includes/Header/Header.php'; ?>

<body>
    <h2 id="title">You are in lobby! Send someone inventation!</h2>

    <div id="gameID">
        <input disabled="true">
        <button>Copy</button>
    </div>

    <h2 id="title">Log as:</h2>

    <ul id="menu">
        <li><button>Admin</button></li>
        <li><button>Player</button></li>
    </ul>

    <script src="Start.js"></script>
</body>

<?php include 'Includes/Footer/Footer.php'; ?></link>