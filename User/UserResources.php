<?php include '../Includes/ValidateToken.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Market</title>
    <link rel="stylesheet" href="../User/UserResources.css">
    <link rel="stylesheet" href="../Includes/Header.css">
    <link rel="stylesheet" href="../Includes/Footer.css">
</head>

<?php include '../Includes/ShareDatabase.php'; ?>
<?php include '../Includes/Header.php'; ?>

<body>
    <h2 id="title">Let's buy some resources!</h2>

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
                    <td id="playerA"><?php echo $playersData[$player]['Resource_A']; ?></td>
                </tr>
                <tr>
                    <td><?php echo $resourcesData[1]['Name']; ?></td>
                    <td id="playerB"><?php echo $playersData[$player]['Resource_B']; ?></td>
                </tr>
                <tr>
                    <td><?php echo $resourcesData[2]['Name']; ?></td>
                    <td id="playerC"><?php echo $playersData[$player]['Resource_C']; ?></td>
                </tr>
                <tr>
                    <td><?php echo $resourcesData[3]['Name']; ?></td>
                    <td id="playerD"><?php echo $playersData[$player]['Resource_D']; ?></td>
                </tr>
            </table>
        </div>
        <div>
            <h2>Market:</h2>
            <table>
                <tr>
                    <th>Resource</th>
                    <th>Cost</th>
                </tr>
                <tr>
                    <td><?php echo $resourcesData[0]['Name']; ?></td>
                    <td><?php echo $resourcesData[0]['Cost']; ?>$</td>
                </tr>
                <tr>
                    <td><?php echo $resourcesData[1]['Name']; ?></td>
                    <td><?php echo $resourcesData[1]['Cost']; ?>$</td>
                </tr>
                <tr>
                    <td><?php echo $resourcesData[2]['Name']; ?></td>
                    <td><?php echo $resourcesData[2]['Cost']; ?>$</td>
                </tr>
                <tr>
                    <td><?php echo $resourcesData[3]['Name']; ?></td>
                    <td><?php echo $resourcesData[3]['Cost']; ?>$</td>
                </tr>
            </table>
        </div>
    </div>

    <h2 id ="playerName">Player <?php echo (int)($player + 1); ?></h2>

    <h2>Your money:</h2>
    <h2 id ="playerMoney"><?php echo $playersData[$player]['Money']; ?>$</h2>

    <p class="error" id="errorNegativeMoney">You dont have enough money!</p>

    <div class="menu">
        <div>
            <div>
                <label>Resource A:</label>
                <input type="text" id="AValue" autocomplete="off" placeholder="Type value"/>
            </div>
            <div>
                <label>Resource B:</label>
                <input type="text" id="BValue" autocomplete="off" placeholder="Type value"/>
            </div>
        </div>
        <div>
            <div>
                <label>Resource C:</label>
                <input type="text" id="CValue" autocomplete="off" placeholder="Type value"/>
            </div>
            <div>
                <label>Resource D:</label>
                <input type="text" id="DValue" autocomplete="off" placeholder="Type value"/>
            </div>
        </div>
    </div>

    <button class="button" id="submit">Submit</button>
    <script src="../User/UserResources.js"></script>
</body>

<?php include '../Includes/Footer.php'; ?>