// Display appropriate podium
podiumForTwoPlayers = document.getElementById('podiumForTwoPlayers');
podiumForThreePlayers = document.getElementById('podiumForThreePlayers');

let playersAmount = 0;
for (let i = 0; i < playersData.length; i++) {
    if (playersData[i].InGame == 1) {
        playersAmount++;
    }
}

if (playersAmount <= 2) {
    podiumForTwoPlayers.style.display = 'flex';
} else {
    podiumForThreePlayers.style.display = 'flex';
}

// Handle submit button
submitButton = document.getElementById('submit');

// Handle click of buttons
submitButton.addEventListener('click', function(event) {
    window.location.href = `http://localhost/Start.php`;
});
