<?php include '../../Includes/ValidateToken.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock Panel</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="../../Includes/Header/Header.css">
    <link rel="stylesheet" href="../../Includes/Footer/Footer.css">
    <link rel="stylesheet" href="../StockPanel/StockPanel.css">
</head>

<?php include '../../Includes/ShareDatabase.php'; ?>
<?php include '../../Includes/LoadOfferts.php'; ?>
<?php include '../../Includes/Header/Header.php'; ?>

<body>
    <h2 id="title">Stock Panel:</h2>

    <div id="functionsDiv">
        <div id="managmentPanel">
            <input>
            <button>Check</button>
        </div>
        <div id="chartPanel">
            <canvas id="chart" width="400" height="200"></canvas>
        </div>
    </div>

    <div id="tables">
        <div>
            <h2><?php echo "Offerts for " . $goodsData[0]['Name'] . ":"; ?></h2>
            <table id="tableX">
                <thead>
                    <th>Player</th>
                    <th>Amount</th>
                    <th>Price</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div>
            <h2><?php echo "Offerts for " . $goodsData[1]['Name'] . ":"; ?></h2>
            <table id="tableY">
                <thead>
                    <th>Player</th>
                    <th>Amount</th>
                    <th>Price</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div>
            <h2><?php echo "Offerts for " . $goodsData[2]['Name'] . ":"; ?></h2>
            <table id="tableZ">
                <thead>
                    <th>Player</th>
                    <th>Amount</th>
                    <th>Price</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    <button id="submit">Submit</button>

    <script src="../StockPanel/StockPanel.js"></script>
</body>

<?php include '../../Includes/Footer/Footer.php'; ?></link>