<?php
    // Connection details
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "ResourceGame";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Get offerts X
        $stmt = $conn->prepare("SELECT * FROM Offerts WHERE Product='X'");
        $stmt->execute();
        $offertsX = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Get offerts Y
        $stmt = $conn->prepare("SELECT * FROM Offerts WHERE Product='Y'");
        $stmt->execute();
        $offertsY = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Get offerts Z
        $stmt = $conn->prepare("SELECT * FROM Offerts WHERE Product='Z'");
        $stmt->execute();
        $offertsZ = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Export databases
        echo "<script>let offertsX = " . json_encode($offertsX) . ";</script>";
        echo "<script>let offertsY = " . json_encode($offertsY) . ";</script>";
        echo "<script>let offertsZ = " . json_encode($offertsZ) . ";</script>";
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }
?>