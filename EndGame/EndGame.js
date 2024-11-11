// Reload page after switch and update tabel
if (sessionStorage.getItem('redirected')) {
    location.reload();
    sessionStorage.removeItem('redirected');
}

// Display appropriate podium
podiumForTwoPlayers = document.getElementById('podiumForTwoPlayers');
podiumForThreePlayers = document.getElementById('podiumForThreePlayers');

if (playersAmount <= 2) {
    podiumForTwoPlayers.style.display = 'flex';
} else {
    podiumForThreePlayers.style.display = 'flex';
}

// Handle submit button
submitButton = document.getElementById('submit');

// Handle click of buttons
submitButton.addEventListener('click', function(event) {
    window.location.href = `http://localhost/Main.php`;
    sessionStorage.setItem('redirected', 'true');
});
