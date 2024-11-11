<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resource Game</title>
    <link rel="stylesheet" href="../Resources/Resources.css">
    <link rel="stylesheet" href="../Includes/Header.css">
    <link rel="stylesheet" href="../Includes/Footer.css">
</head>

<?php include '../Includes/Header.php'; ?>

<body>
    <?php
        // Get players amount and rounds
        $players = isset($_GET['players']) ? $_GET['players'] : 'default';
        $round = isset($_GET['round']) ? $_GET['round'] : 'round';

        // Connect with resources database
        $host = 'localhost';
        $dbname = 'rgame';
        $username = 'root';
        $password = '';

        // Connection with tables
        $tablePlayers = 'players';
        $tableResources = 'resources';
        $tableGoods = 'goods';

        try {
            // Connect to the database using PDO
            $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            // Player database
            $stmt = $pdo->prepare("SELECT * FROM $tablePlayers");
            $stmt->execute();
            $playersData = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $playersDataBackup = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Resources database
            $stmt = $pdo->prepare("SELECT * FROM $tableResources");
            $stmt->execute();
            $resourcesData = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Goods database
            $stmt = $pdo->prepare("SELECT * FROM $tableGoods");
            $stmt->execute();
            $goodsData = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Export databases
            echo "<script>let playersAmount = " . (int)$players . ";</script>";
            echo "<script>let roundsAmount = " . (int)$round . ";</script>";
            echo "<script>let playersData = " . json_encode($playersData) . ";</script>";
            echo "<script>let playersDataBackup = " . json_encode($playersDataBackup) . ";</script>";
            echo "<script>let resourcesData = " . json_encode($resourcesData) . ";</script>";
            echo "<script>let goodsData = " . json_encode($goodsData) . ";</script>";
        } 
        catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    ?>

    <h2 id="title">Plan and buy some resources! Next you are going to trade them for some goods!</h2>

    <div class=tables>
        <div>
            <h2>Your resources:</h2>
            <table>
                <tr>
                    <th>Resource</th>
                    <th>Amount</th>
                </tr>
                <tr>
                    <td><?php echo $resourcesData[0]['Name']; ?></td>
                    <td id="playerWood"><?php echo $playersData[0]['Wood']; ?></td>
                </tr>
                <tr>
                    <td><?php echo $resourcesData[1]['Name']; ?></td>
                    <td id="playerStone"><?php echo $playersData[0]['Stone']; ?></td>
                </tr>
                <tr>
                    <td><?php echo $resourcesData[2]['Name']; ?></td>
                    <td id="playerMetal"><?php echo $playersData[0]['Metal']; ?></td>
                </tr>
            </table>
        </div>
        <div>
            <h2>Resources:</h2>
            <table>
                <tr>
                    <th>Resource</th>
                    <th>Cost</th>
                </tr>
                <tr>
                    <td><?php echo $resourcesData[0]['Name']; ?></td>
                    <td id="woodCost"><?php echo $resourcesData[0]['Cost']; ?>$</td>
                </tr>
                <tr>
                    <td><?php echo $resourcesData[1]['Name']; ?></td>
                    <td id="stoneCost"><?php echo $resourcesData[1]['Cost']; ?>$</td>
                </tr>
                <tr>
                    <td><?php echo $resourcesData[2]['Name']; ?></td>
                    <td id="metalCost"><?php echo $resourcesData[2]['Cost']; ?>$</td>
                </tr>
            </table>
        </div>
        <div>
            <h2>Goods:</h2>
            <table>
                <tr>
                    <th>Ware</th>
                    <th>Wood cost</th>
                    <th>Stone cost</th>
                    <th>Metal cost</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td><?php echo $goodsData[0]['Name']; ?></td>
                    <td><?php echo $goodsData[0]['WoodCost']; ?></td>
                    <td><?php echo $goodsData[0]['StoneCost']; ?></td>
                    <td><?php echo $goodsData[0]['MetalCost']; ?></td>
                    <td id="tableCost"><?php echo $goodsData[0]['Value']; ?>$</td>
                </tr>
                <tr>
                    <td><?php echo $goodsData[1]['Name']; ?></td>
                    <td><?php echo $goodsData[1]['WoodCost']; ?></td>
                    <td><?php echo $goodsData[1]['StoneCost']; ?></td>
                    <td><?php echo $goodsData[1]['MetalCost']; ?></td>
                    <td id="marbleTableCost"><?php echo $goodsData[1]['Value']; ?>$</td>
                </tr>
                <tr>
                    <td><?php echo $goodsData[2]['Name']; ?></td>
                    <td><?php echo $goodsData[2]['WoodCost']; ?></td>
                    <td><?php echo $goodsData[2]['StoneCost']; ?></td>
                    <td><?php echo $goodsData[2]['MetalCost']; ?></td>
                    <td id="chandelierCost"><?php echo $goodsData[2]['Value']; ?>$</td>
                </tr>
            </table>
        </div>
    </div>

    <h2 id ="playerName">Player <?php echo $playersData[0]['ID']; ?></h2>
    <h2>Your money:</h2>
    <h2 id ="playerMoney"><?php echo $playersData[0]['Money']; ?>$</h2>
    
    <p class="error" id="errorNegativeMoney">You dont have enough money!</p>

    <div class="menu">
        <div>
            <label>Wood:</label>
            <input type="text" id="woodValue" placeholder="Type value"/>
        </div>
        <div>
            <label>Stone:</label>
            <input type="text" id="stoneValue" placeholder="Type value"/>
        </div>
        <div>
            <label>Metal:</label>
            <input type="text" id="metalValue" placeholder="Type value"/>
        </div>
    </div>
    
    <button id="submit">Submit</button>

    <script src="../Resources/ResourcesScript.js"></script>
</body>

<?php include '../Includes/Footer.php'; ?>