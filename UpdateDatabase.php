<?php
    // Set the content type to JSON for the response
    header('Content-Type: application/json');

    // Get the JSON input and decode it to a PHP array
    $inputData = json_decode(file_get_contents("php://input"), true);
    $playersData = $inputData["playersData"];
    $goodsData = $inputData["goodsData"];

    // Connect with resources database
    $host = 'localhost';
    $dbname = 'rgame';
    $username = 'root';
    $password = '';
    
    try {
        // Connect to the database using PDO
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Multipications for sell
        $goodsCosts = [0, 0, 0];

        $iterator = 0;
        foreach ($goodsData as $good) {
            $goodsCosts[$iterator] = $good['Value'];
            $iterator++;
        }

        // Alter players database with MySQL depending on accessed array
        $index = 1;
        foreach ($playersData as $player) {
            $wood = $player['Wood'];
            $stone = $player['Stone'];
            $metal = $player['Metal'];
            $money = $player['Money'];
            $woodenTable = $player['WoodenTable'];
            $marbleTable = $player['MarbleTable'];
            $chandelier = $player['Chandelier'];
            
            // Calculate money for player
            $sellFirstItem = $woodenTable * $goodsCosts[0];
            $sellSecondItem = $marbleTable * $goodsCosts[1];
            $sellThirdItem = $chandelier * $goodsCosts[2];
            $actualMoney = $money + (int)$sellFirstItem + (int)$sellSecondItem + (int)$sellThirdItem;

            $stmt = $pdo->prepare("UPDATE players SET Wood = $wood, Stone = $stone, Metal = $metal, Money = $actualMoney, WoodenTable = 0,
                MarbleTable = 0, Chandelier = 0 WHERE ID = $index;");
            $stmt->execute();
            $index++;
        }
    } 
    catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
?>