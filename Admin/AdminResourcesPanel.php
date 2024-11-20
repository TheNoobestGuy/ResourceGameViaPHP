<?php include '../Includes/ValidateToken.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Resource Panel</title>
    <link rel="stylesheet" href="../Includes/Header.css">
    <link rel="stylesheet" href="../Includes/Footer.css">
    <link rel="stylesheet" href="../Admin/AdminResourcesPanel.css">
</head>

<?php include '../Includes/ShareDatabase.php'; ?>
<?php include '../Includes/Header.php'; ?>

<body id="bodyDiv">
    <h2>Resource panel:</h2>
    <h3>Set new resources cost for product!</h3>

    <table>
        <tr>
            <th>Resources</th>
            <th>Old cost</th>
            <th>New cost</th>
        </tr>
        <tr>
            <td><?php echo $resourcesData[0]['Name']; ?></td>
            <td><?php echo $playersData[$player]['Resource_A']; ?></td>
            <td id="newCostA">0</td>
        </tr>
        <tr>
            <td><?php echo $resourcesData[1]['Name']; ?></td>
            <td><?php echo $playersData[$player]['Resource_B']; ?></td>
            <td id="newCostB">0</td>
        </tr>
        <tr>
            <td><?php echo $resourcesData[2]['Name']; ?></td>
            <td><?php echo $playersData[$player]['Resource_C']; ?></td>
            <td id="newCostC">0</td>
        </tr>
        <tr>
            <td><?php echo $resourcesData[3]['Name']; ?></td>
            <td><?php echo $playersData[$player]['Resource_D']; ?></td>
            <td id="newCostD">0</td>
        </tr>
    </table>

    <div class="menu">
        <div>
            <div>
                <label>Resource A:</label>
                <input type="text" maxlength="1" id="AValue" autocomplete="off" placeholder="Type value"/>
            </div>
            <div>
                <label>Resource B:</label>
                <input type="text" maxlength="1" id="BValue" autocomplete="off" placeholder="Type value"/>
            </div>
        </div>
        <div>
            <div>
                <label>Resource C:</label>
                <input type="text" maxlength="1" id="CValue" autocomplete="off" placeholder="Type value"/>
            </div>
            <div>
                <label>Resource D:</label>
                <input type="text" maxlength="1" id="DValue" autocomplete="off" placeholder="Type value"/>
            </div>
        </div>
    </div>

    <script src="../Admin/AdminResourcesPanel.js"></script>
</body>

<?php include '../Includes/Footer.php'; ?>