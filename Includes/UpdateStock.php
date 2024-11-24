<?php
    // Get the JSON input and decode it to a PHP array
    $inputData = json_decode(file_get_contents("php://input"), true);
    $stockData = $inputData["stockData"];

    // Connect with resources database
    $servername = "localhost";
    $username = "root"; 
    $password = ""; 
    $dbname = "ResourceGame";
    
    try {
        // Connect to the database using PDO
        $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("TRUNCATE TABLE stock");
        $stmt->execute();

        for ($i = 0; $i < count($stockData); $i++) {
            $product = $stockData[$i][0];
            $demnad = $stockData[$i][1];
            $price = $stockData[$i][2];

            $stmt = $pdo->prepare("INSERT INTO stock (Product, Demand, Price) VALUES ('$product', '$demnad', '$price')");
            $stmt->execute();
        }
    }
    catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
?>