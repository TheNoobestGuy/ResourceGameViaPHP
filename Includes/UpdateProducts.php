<?php
    // Set the content type to JSON for the response
    header('Content-Type: application/json');

    // Get the JSON input and decode it to a PHP array
    $inputData = json_decode(file_get_contents("php://input"), true);
    $playersData = $inputData["playersData"];

    // Connect with resources database
    $servername = "localhost";
    $username = "root"; 
    $password = ""; 
    $dbname = "ResourceGame";
    
    try {
        // Connect to the database using PDO
        $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Alter players database with MySQL depending on accessed array
        $index = 1;
        foreach ($playersData as $player) {
            $X = $player['Good_X'];
            $Y = $player['Good_Y'];
            $Z = $player['Good_Z'];

            $stmt = $pdo->prepare("UPDATE players SET Good_X = $X, Good_Y = $Y, Good_Z = $Z WHERE ID = $index;");
            $stmt->execute();
            $index++;
        }
    } 
    catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
?>