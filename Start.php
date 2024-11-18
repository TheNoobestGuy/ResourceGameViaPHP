<?php
// Database connection details
$servername = "localhost";
$username = "root"; 
$password = ""; 
$database = "ResourceGameDataBase";

try {
    // Create a connection
    $conn = new PDO("mysql:host=$servername", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create the database
    $sql = "CREATE DATABASE $database";
    $conn->exec($sql);
    
    // Connect to database
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create players table
    $sql = "CREATE TABLE Players (
        Player INT AUTO_INCREMENT PRIMARY KEY,
        Password VARCHAR(20) NOT NULL,
        Resource_A INT DEFAULT 0 NOT NULL,
        Resource_B INT DEFAULT 0 NOT NULL,,
        Resource_C INT DEFAULT 0 NOT NULL,,
        Resource_D INT DEFAULT 0 NOT NULL,,
        Money INT DEFAULT 0 NOT NULL
    )";


} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Close the connection
$conn = null;
?>