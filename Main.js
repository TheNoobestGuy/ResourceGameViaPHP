// Reload page after switch and update tabel
if (sessionStorage.getItem('redirected')) {
    location.reload();
    sessionStorage.removeItem('redirected');
}

// Buttons 
buttonPlayers2 = document.getElementById('buttonPlayers2');
buttonPlayers3 = document.getElementById('buttonPlayers3');
buttonPlayers4 = document.getElementById('buttonPlayers4');

// Handle click of buttons
buttonPlayers2.addEventListener('click', function(event) {
    window.location.href = `http://localhost/Resources/Resources.php?players=2&round=0`;
    sessionStorage.setItem('redirected', 'true');
});

buttonPlayers3.addEventListener('click', function(event) {
    window.location.href = `http://localhost/Resources/Resources.php?players=3&round=0`;
    sessionStorage.setItem('redirected', 'true');
});

buttonPlayers4.addEventListener('click', function(event) {
    window.location.href = `http://localhost/Resources/Resources.php?players=4&round=0`;
    sessionStorage.setItem('redirected', 'true');
});