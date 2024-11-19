<?php
session_start();

$player = -1;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $player = isset($_POST['player']) ? $_POST['player'] : -1;
}

$token = "token" . $player;

$_SESSION[$token] = bin2hex(random_bytes(16));
echo json_encode(['token' => $_SESSION[$token]]);
?>
