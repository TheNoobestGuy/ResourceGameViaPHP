// Reload page after switch and update tabel
if (sessionStorage.getItem('redirected')) {
    location.reload();
    sessionStorage.removeItem('redirected');
}

// Handle submit button
submitButton = document.getElementById('submit');

// Handle click of buttons
submitButton.addEventListener('click', function(event) {
    window.location.href = `http://localhost/Main.php`;
    sessionStorage.setItem('redirected', 'true');
});
