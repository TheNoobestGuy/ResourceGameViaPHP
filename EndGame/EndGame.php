<?php include '../Includes/ValidateToken.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resource Game</title>
    <link rel="stylesheet" href="../Includes/Header/Header.css">
    <link rel="stylesheet" href="../Includes/Footer/Footer.css">
    <link rel="stylesheet" href="../EndGame/EndGame.css">
</head>

<?php include '../Includes/Header/Header.php'; ?>
<?php include '../Includes/ShareDatabase.php'; ?>
<?php
    // Sort winners array and extract them
    $winnersArray = [];
    $index = 1;
    while(count($playersData) > 1) {
        $playerBuffor = [0, 0];
        $index = 0;
    
        for ($i = 0; $i < count($playersData)-1; $i++) {
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
?>

<body>
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

    <button id="submit">Play again</button>
    
    <script src="../EndGame/EndGame.js"></script>
    <?php include '../Includes/Footer/Footer.php'; ?>
</body>