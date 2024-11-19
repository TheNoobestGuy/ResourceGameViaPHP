<?php
session_start();

$player = isset($_GET['player']) ? $_GET['player'] : -1;
$token = 'token' . $player;

if (!isset($_GET['token']) || !isset($_SESSION[$token])) {
    http_response_code(403);
    echo "Access denied.";
    exit;
}
if ($_GET['token'] !== $_SESSION[$token]) {
    http_response_code(403);
    echo "Access denied.";
    exit;
}
?>
