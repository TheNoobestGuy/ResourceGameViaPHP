// Channel
const channel = new BroadcastChannel('page_refresh_channel');
channel.addEventListener('message', (event) => {
    if (event.data === 'refresh') {
        window.location.reload();
    }
});

// Players
let player = 0;
let playerName = document.getElementById('playerName');
let playerButton1 = document.getElementById('logPlayer1');
let playerButton2 = document.getElementById('logPlayer2');
let playerButton3 = document.getElementById('logPlayer3');
let playerButton4 = document.getElementById('logPlayer4');

// Error
let passwordDiv = document.getElementById('passwordDiv');
let error = document.getElementById('error');

// Handle players buttons
playerButton1.addEventListener('click', event => {
    if (player != 1) {
        passwordDiv.style.marginBottom = "1.5%";
        error.style.display = 'none';
    }

    playerName.innerHTML = "Player 1";
    player = 1;
});

playerButton2.addEventListener('click', event => {
    if (player != 2) {
        passwordDiv.style.marginBottom = "1.5%";
        error.style.display = 'none';
    }
    
    playerName.innerHTML = "Player 2";
    player = 2;
});

playerButton3.addEventListener('click', event => {
    if (player != 3) {
        passwordDiv.style.marginBottom = "1.5%";
        error.style.display = 'none';
    }

    playerName.innerHTML = "Player 3";
    player = 3;
});

playerButton4.addEventListener('click', event => {
    if (player != 4) {
        passwordDiv.style.marginBottom = "1.5%";
        error.style.display = 'none';
    }

    playerName.innerHTML = "Player 4";
    player = 4;
});

// Handle error
let input = document.getElementById('password');

input.addEventListener('input', event => {
    passwordDiv.style.marginBottom = "1.5%";
    error.style.display = 'none';
})

// Handle login
let body = document.getElementById('body');
let loginButton = document.getElementById('login');

loginButton.addEventListener('click', event => {
    let logedIn = false;
    let password = input.value;
    console.log(usersDB[player-1].Password);
    // Check is password correct
    if (player > 0) {
        if (password == usersDB[player-1].Password) {
            logedIn = true;
        }
        else {
            passwordDiv.style.marginBottom = 0;
            error.style.display = 'block';
        }
    }

    // Replace body if logged properly
    if (logedIn) {
        body.innerHTML = `
        <h2> Loged in! </h2>
        `;
    }
})