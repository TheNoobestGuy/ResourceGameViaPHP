<?php include '../Includes/ValidateToken.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Statistics</title>
    <link rel="stylesheet" href="../Includes/Header/Header.css">
    <link rel="stylesheet" href="../Includes/Footer/Footer.css">
    <link rel="stylesheet" href="../Statistics/Statistics.css">
</head>

<?php include '../Includes/ShareDatabase.php'; ?>
<?php include '../Includes/TradeGoods.php'; ?>
<?php include '../Includes/UpdateRound.php'; ?>
<?php include '../Includes/GetRound.php'; ?>
<?php include '../Includes/Header/Header.php'; ?>

<body>
    <h2 id="title">Results of trades:</h2>

    <table id="statistics">
        <thead>
            <tr>
                <th>Player</th>
                <th>Product X</th>
                <th>Product Y</th>
                <th>Product Z</th>
                <th>Earned</th>
                <th>Totaly</th>
            </tr>
        </thead> 
        <tbody>
        </tbody>   
    </table>

    <button id="submit">Submit</button>

    <?php include '../Includes/Footer/Footer.php'; ?>
    <script src="../Statistics/Statistics.js"></script>
</body>
