<?php
    // Get player
    $player = isset($_GET['player']) ? $_GET['player'] : -1;

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
        echo "<script>let player =" . $player . "; </script>";
        echo "<script>let playersData = " . json_encode($usersDB) . ";</script>";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    // Close the connection
    $conn = null;
?>