<?php
    // Get player
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $player = isset($_POST['player']) ? $_POST['player'] : -1;
        $onnline = isset($_POST['onnline']) ? $_POST['onnline'] : 1;
        $player++;
    }

    // Database connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "ResourceGame";

    try {
        // Create a connection
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Update database
        if ($onnline == 1) {
            $stmt = $conn->prepare("UPDATE users SET InGame=TRUE WHERE ID=$player");
        }
        else {
            $stmt = $conn->prepare("UPDATE users SET InGame=FALSE WHERE ID=$player");
        }
        $stmt->execute();

    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    // Close the connection
    $conn = null;
?>