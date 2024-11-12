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
<?php include '../ShareDatabase.php'; ?>

<body>
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

    <div class="playerNameBox">
        <button class="button" id="back"><</button>
        <h2 id ="playerName">Player <?php echo $playersData[0]['ID']; ?></h2>
        <button class="button" id="forward">></button>
    </div>

    <h2>Your money:</h2>
    <h2 id ="playerMoney"><?php echo $playersData[0]['Money']; ?>$</h2>
    
    <p class="error" id="errorNegativeMoney">You dont have enough money!</p>

    <div class="menu">
        <div>
            <label>Wood:</label>
            <input type="text" id="woodValue" autocomplete="off" placeholder="Type value"/>
        </div>
        <div>
            <label>Stone:</label>
            <input type="text" id="stoneValue" autocomplete="off" placeholder="Type value"/>
        </div>
        <div>
            <label>Metal:</label>
            <input type="text" id="metalValue" autocomplete="off" placeholder="Type value"/>
        </div>
    </div>
    
    <button class="button" id="submit">Submit</button>

    <script src="../Resources/ResourcesScript.js"></script>
</body>

<?php include '../Includes/Footer.php'; ?>