<?php include '../../Includes/ValidateToken.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wait Room</title>
    <link rel="stylesheet" href="../WaitRoom/WaitRoom.css">
    <link rel="stylesheet" href="../../Includes/Header/Header.css">
    <link rel="stylesheet" href="../../Includes/Footer/Footer.css">
</head>

<?php include '../../Includes/Header/Header.php'; ?>
<?php include '../../Includes/GetPlayers.php'; ?>

<body>
    <h2 id="title">Wait for admin he didint joined yet!</h2>

    <table id="onnlineTable">
    </table>
    
    <script src="../WaitRoom/WaitRoom.js"></script>
</body>

<?php include '../../Includes/Footer/Footer.php'; ?>