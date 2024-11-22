<?php
    // Connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "ResourceGame";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Get offers X
        $stmt = $conn->prepare("SELECT * FROM Offers WHERE Product='X'");
        $stmt->execute();
        $offersX = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Get offers Y
        $stmt = $conn->prepare("SELECT * FROM Offers WHERE Product='Y'");
        $stmt->execute();
        $offersY = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Get offers Z
        $stmt = $conn->prepare("SELECT * FROM Offers WHERE Product='Z'");
        $stmt->execute();
        $offersZ = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Export databases
        echo "<script>let offersX = " . json_encode($offersX) . ";</script>";
        echo "<script>let offersY = " . json_encode($offersY) . ";</script>";
        echo "<script>let offersZ = " . json_encode($offersZ) . ";</script>";
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }
?>