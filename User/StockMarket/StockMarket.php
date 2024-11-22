<?php include '../../Includes/ValidateToken.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock Market</title>
    <link rel="stylesheet" href="../StockMarket/StockMarket.css">
    <link rel="stylesheet" href="../../Includes/Header/Header.css">
    <link rel="stylesheet" href="../../Includes/Footer/Footer.css">
</head>

<?php include '../../Includes/ShareDatabase.php'; ?>
<?php include '../../Includes/LoadOffers.php'; ?>
<?php include '../../Includes/Header/Header.php'; ?>

<body>
    <h2 id="title">Stock Market</h2>

    <div id="tables">
        <div>
            <h2>Your goods:</h2>
            <table>
                <tr>
                    <th>Ware</th>
                    <th>Amount</th>
                </tr>
                <tr>
                    <td><?php echo $goodsData[0]['Name']; ?></td>
                    <td id="playerX"><?php echo $playersData[$player]['Good_X']; ?></td>
                </tr>
                <tr>
                    <td><?php echo $goodsData[1]['Name']; ?></td>
                    <td id="playerY"><?php echo $playersData[$player]['Good_Y']; ?></td>
                </tr>
                <tr>
                    <td><?php echo $goodsData[2]['Name']; ?></td>
                    <td id="playerZ"><?php echo $playersData[$player]['Good_Z']; ?></td>
                </tr>
            </table>
        </div>
        <div>
            <h2><?php echo "Offers for " . $goodsData[0]['Name'] . ":"; ?></h2>
            <table id="tableX">
                <thead>
                    <th>Player</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th>Close</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div>
            <h2><?php echo "Offers for " . $goodsData[1]['Name'] . ":"; ?></h2>
            <table id="tableY">
                <thead>
                    <th>Player</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th>Close</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div>
            <h2><?php echo "Offers for " . $goodsData[2]['Name'] . ":"; ?></h2>
            <table id="tableZ">
                <thead>
                    <th>Player</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th>Close</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    <h2 id="title">Make your offers:</h2>
    <p id="error">U don't have enough goods!</p>
    <div id="marketMenu">
        <div>
            <label><?php echo "Product " . $goodsData[0]['Name']; ?></label>
            <div>
                <label>Amount:</label>
                <input id="Xamount" placeholder="0">
            </div>
            <div>
                <label>Price:</label>
                <input maxlength="5" id="Xprice" placeholder="0$">
            </div>
            <button id="SendX">Send</button>
        </div>
        <div>
            <label><?php echo "Product " . $goodsData[1]['Name']; ?></label>
            <div>
                <label>Amount:</label>
                <input id="Yamount" placeholder="0">
            </div>
            <div>
                <label>Price:</label>
                <input maxlength="5" id="Yprice" placeholder="0$">
            </div>
            <button id="SendY">Send</button>
        </div>
        <div>
            <label><?php echo "Product " . $goodsData[2]['Name']; ?></label>
            <div>
                <label>Amount:</label>
                <input id="Zamount" placeholder="0">
            </div>
            <div>
                <label>Price:</label>
                <input maxlength="4" id="Zprice" placeholder="0$">
            </div>
            <button id="SendZ">Send</button>
        </div>
    </div>
    
    <button id="submit">Done</button>

    <script src="../StockMarket/StockMarket.js"></script>
</body>

<?php include '../../Includes/Footer/Footer.php'; ?></link>