<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resource Game</title>
    <link rel="stylesheet" href="../EndGame/EndGame.css">
    <link rel="stylesheet" href="../Includes/Header.css">
    <link rel="stylesheet" href="../Includes/Footer.css">
</head>

<?php include '../Includes/Header.php'; ?>

<body>
    <?php
        // Get players amount
        $players = isset($_GET['players']) ? $_GET['players'] : 'default';
        
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

            // Sort winners array and extract them
            $winnersArray = [];
            $index = 1;
            while(count($playersData) > 1) {
                $playerBuffor = [0, 0];
                $index = 0;

                for ($i = 0; $i < count($playersData); $i++) {
                    if ($playersData[$i]['Money'] >= $playerBuffor[1]) {
                        $playerBuffor[0] = (int)$playersData[$i]['ID'];
                        $playerBuffor[1] = (int)$playersData[$i]['Money'];
                        $index = $i;
                    }
                }
                
                array_splice($playersData, $index, 1);
                array_push($winnersArray, $playerBuffor);
                $index++;
            }

            // Export player amount
            echo "<script>let playersAmount = " . (int)$players . ";</script>";
        } 
        catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    ?>

    <h2 id="title">Congratulations! This time the winners are:</h2>

    <div id="podiumForTwoPlayers" class="podium">
        <div id="upBlockTwoPlayers">
            <div class="playerOnPodium">
                <a>player <?php echo $winnersArray[0][0]; ?></a>
                <a><?php echo $winnersArray[0][1]; ?>$</a>
            </div>
        </div>
        <div class="BlocksTwo">
            <div id="upBlockMiddle">1</div>
            <div id="upBlockRightText">
                <div class="playerOnPodium">
                    <a>player <?php echo $winnersArray[1][0]; ?></a>
                    <a><?php echo $winnersArray[1][1]; ?>$</a>
                </div>
            </div>
        </div>
        <div class="BlocksTwo">
            <div id="downBlockMiddleTwoPlayers"></div>
            <div id="downBlockRight">2</div>
        </div>
    </div>

    <div id="podiumForThreePlayers" class="podium">
        <div id="upBlock">
            <div class="playerOnPodium">
                <a>player <?php echo $winnersArray[0][0]; ?></a>
                <a><?php echo $winnersArray[0][1]; ?>$</a>
            </div>
        </div>
        <div class="Blocks">
            <div id="upBlockLeftText">
                <div class="playerOnPodium">
                    <a>player <?php echo $winnersArray[1][0]; ?></a>
                    <a><?php echo $winnersArray[1][1]; ?>$</a>
                </div>
            </div>
            <div id="upBlockMiddle">1</div>
            <div id="upBlockRightText">
                <div class="playerOnPodium">
                    <a>player <?php echo $winnersArray[2][0]; ?></a>
                    <a><?php echo $winnersArray[2][1]; ?>$</a>
                </div>
            </div>
        </div>
        <div class="Blocks">
            <div id="downBlockLeft">2</div>
            <div id="downBlockMiddle"></div>
            <div id="downBlockRight">3</div>
        </div>
    </div>

    <button id="submit">Start again</button>
    
    <script src="../EndGame/EndGame.js"></script>
</body>

<?php include '../Includes/Footer.php'; ?>