<?php include '../../Includes/ValidateToken.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Goods Market</title>
    <link rel="stylesheet" href="../../Includes/Header/Header.css">
    <link rel="stylesheet" href="../../Includes/Footer/Footer.css">
    <link rel="stylesheet" href="../GoodsMarket/GoodsMarket.css">
</head>

<?php include '../../Includes/ShareDatabase.php'; ?>
<?php include '../../Includes/Header/Header.php'; ?>

<body>
    <h2 id="title">Trade your resources on some goods to sell them later!</h2>

    <h2 id="player">Player <?php echo $playersData[$player]['ID']; ?></h2>

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
            <h2>Goods:</h2>
            <table>
                <tr>
                    <th>Ware</th>
                    <th>Resource A</th>
                    <th>Resource B</th>
                    <th>Resource C</th>
                    <th>Resource D</th>
                </tr>
                <tr>
                    <td><?php echo $goodsData[0]['Name']; ?></td>
                    <td><?php echo $goodsData[0]['Cost_A']; ?></td>
                    <td><?php echo $goodsData[0]['Cost_B']; ?></td>
                    <td><?php echo $goodsData[0]['Cost_C']; ?></td>
                    <td><?php echo $goodsData[0]['Cost_D']; ?></td>
                </tr>
                <tr>
                    <td><?php echo $goodsData[1]['Name']; ?></td>
                    <td><?php echo $goodsData[1]['Cost_A']; ?></td>
                    <td><?php echo $goodsData[1]['Cost_B']; ?></td>
                    <td><?php echo $goodsData[1]['Cost_C']; ?></td>
                    <td><?php echo $goodsData[0]['Cost_D']; ?></td>
                </tr>
                <tr>
                    <td><?php echo $goodsData[2]['Name']; ?></td>
                    <td><?php echo $goodsData[2]['Cost_A']; ?></td>
                    <td><?php echo $goodsData[2]['Cost_B']; ?></td>
                    <td><?php echo $goodsData[2]['Cost_C']; ?></td>
                    <td><?php echo $goodsData[0]['Cost_D']; ?></td>
                </tr>
            </table>
        </div>
    </div>
    
    <p class="error" id="negativeResources">You doesnt have enough resources!</p>

    <div class="menu">
        <div>
            <label>X:</label>
            <input type="text" id="XValue" autocomplete="off" placeholder="0"/>
        </div>
        <div>
            <label>Y:</label>
            <input type="text" id="YValue" autocomplete="off" placeholder="0"/>
        </div>
        <div>
            <label>Z:</label>
            <input type="text" id="ZValue" autocomplete="off" placeholder="0"/>
        </div>
    </div>

    <button class="button" id="submit">Submit</button>

    <script src="../GoodsMarket/GoodsMarket.js"></script>
</body>

<?php include '../../Includes/Footer/Footer.php'; ?>