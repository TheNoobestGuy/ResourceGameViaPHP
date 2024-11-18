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
    $sql = "CREATE TABLE Users (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        Admin BOOLEAN DEFAULT FALSE,
        Password VARCHAR(20) NOT NULL,
        Resource_A INT DEFAULT 0,
        Resource_B INT DEFAULT 0,
        Resource_C INT DEFAULT 0,
        Resource_D INT DEFAULT 0,
        Money INT DEFAULT 0
    )";
    $conn->exec($sql);

    // Create resources table
    $sql = "CREATE TABLE Resources (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(20) NOT NULL UNIQUE,
        Cost INT DEFAULT 0
    )";
    $conn->exec($sql);
    
    // Fill database
    for($i = 0; $i < 4; $i++) {
        $password = "player" .(string)($i + 1);
        $sql = "INSERT INTO Users (Password) VALUES ('$password')";
        $conn->exec($sql);
    }
    $password = "admin";
    $sql = "INSERT INTO Users (Admin, Password) VALUES (TRUE, '$password')";
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
    echo "Successfully created database for resource game!";
    

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Close the connection
$conn = null;
?>