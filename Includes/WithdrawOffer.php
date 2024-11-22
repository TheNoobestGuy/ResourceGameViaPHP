<?php
    // Get data from post
    $player = isset($_POST["player"]) ? $_POST["player"] : -1;
    $product = isset($_POST["product"]) ? $_POST["product"] : '0';
    $amount = isset($_POST["amount"]) ? $_POST["amount"] : 0;
    $price = isset($_POST["price"]) ? $_POST["price"] : 0;

    // Connect with database
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "ResourceGame";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password); 
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Update database
        $stmt = $conn->prepare("DELETE FROM Offers WHERE Player=$player AND Product='$product' AND Amount=$amount AND Price=$price LIMIT 1");
        $stmt->execute();
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }
?>