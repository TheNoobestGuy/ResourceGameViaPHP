<?php include '../../Includes/ValidateToken.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resources Panel</title>
    <link rel="stylesheet" href="../../Includes/Header/Header.css">
    <link rel="stylesheet" href="../../Includes/Footer/Footer.css">
    <link rel="stylesheet" href="../ResourcesPanel/ResourcesPanel.css">
</head>

<?php include '../../Includes/ShareDatabase.php'; ?>
<?php include '../../Includes/Header/Header.php'; ?>

<body>
    <h2>Resources panel:</h2>
    <div id="tables"></div>

    <h2 id="title">Change resources cost for next round:</h2>
    <div id="menu">
    </div>
    
    <button id="submit">Submit</button>

    <script src="../../Admin/ResourcesPanel/ResourcesPanel.js"></script>
</body>

<?php include '../../Includes/Footer/Footer.php'; ?>