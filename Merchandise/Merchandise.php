<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resource Game</title>
    <link rel="stylesheet" href="../Merchandise/Merchandise.css">
    <link rel="stylesheet" href="../Includes/Header.css">
    <link rel="stylesheet" href="../Includes/Footer.css">
</head>

<?php include '../Includes/Header.php'; ?>

<body>
    <?php include '../ShareDatabase.php'; ?>
    <h2 id="title">Trade your resources on some goods to sell them later!</h2>

    <h2 id ="playerName">Player <?php echo $playersData[0]['ID']; ?></h2>

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
    
    <p class="error" id="negativeResources">You doesnt have enough resources!</p>

    <div class="menu">
        <div>
            <label>Wooden table:</label>
            <input type="text" id="woodenTableValue" placeholder="Type value"/>
        </div>
        <div>
            <label>Marble Table:</label>
            <input type="text" id="marbleTableValue" placeholder="Type value"/>
        </div>
        <div>
            <label>Chandelier:</label>
            <input type="text" id="chandelierValue" placeholder="Type value"/>
        </div>
    </div>

    <button id="submit">Submit</button>

    <script src="../Merchandise/MerchandiseScript.js"></script>
</body>

<?php include '../Includes/Footer.php'; ?>