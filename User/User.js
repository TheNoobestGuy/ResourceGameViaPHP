// Channels
const adminChannel = new BroadcastChannel('resource_game_admin');
const usersChannel = new BroadcastChannel('resource_game_users');
const xhr = new XMLHttpRequest();

// Logout from game
if (sessionStorage.getItem('WaitRoom')) {
    const user = sessionStorage.getItem('Player');
    
    xhr.open("POST", "../Includes/Onnline.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`player=${user}&onnline=0`);

    usersChannel.postMessage('quitWaitRoom');
    sessionStorage.removeItem('WaitRoom');
    sessionStorage.removeItem('Player');
}

// Players
const playerName = document.getElementById('playerName');
const playerButton1 = document.getElementById('logPlayer1');
const playerButton2 = document.getElementById('logPlayer2');
const playerButton3 = document.getElementById('logPlayer3');
const playerButton4 = document.getElementById('logPlayer4');

// Error
const passwordDiv = document.getElementById('passwordDiv');
const error = document.getElementById('error');

// Handle error
const input = document.getElementById('password');

input.addEventListener('input', event => {
    passwordDiv.style.marginBottom = "1.5%";
    error.style.display = 'none';
})

// Handle players buttons
playerButton1.addEventListener('click', event => {
    if (player != 0) {
        passwordDiv.style.marginBottom = "1.5%";
        error.style.display = 'none';
        input.value = "";
    }

    playerName.innerHTML = "Player 1";
    player = 0;
});

playerButton2.addEventListener('click', event => {
    if (player != 1) {
        passwordDiv.style.marginBottom = "1.5%";
        error.style.display = 'none';
        input.value = "";
    }
    
    playerName.innerHTML = "Player 2";
    player = 1;
});

playerButton3.addEventListener('click', event => {
    if (player != 2) {
        passwordDiv.style.marginBottom = "1.5%";
        error.style.display = 'none';
        input.value = "";
    }

    playerName.innerHTML = "Player 3";
    player = 2;
});

playerButton4.addEventListener('click', event => {
    if (player != 3) {
        passwordDiv.style.marginBottom = "1.5%";
        error.style.display = 'none';
        input.value = "";
    }

    playerName.innerHTML = "Player 4";
    player = 3;
});

// Handle login
const loginButton = document.getElementById('login');

loginButton.addEventListener('click', event => {
    let logedIn = false;
    let password = input.value;

    // Check is password correct
    if (player >= 0) {
        if (password == playersData[player].Password) {
            logedIn = true;
        }
        else {
            passwordDiv.style.marginBottom = 0;
            error.style.display = 'block';
        }
    }

    // Generate token for next site and switch to proper player
    if (logedIn) {
        // Update database that user is onnline
        xhr.open("POST", "../Includes/Onnline.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`player=${player}`);

        // Generate token and switch pages
        xhr.open("POST", "../Includes/GenerateToken.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`player=${player}`);

        let respone = JSON.parse(xhr.responseText);
        window.location.href = `http://localhost/WaitRoom/WaitRoom.php?player=${player}&token=${respone.token}`;
        sessionStorage.setItem('WaitRoom', 'true');
        sessionStorage.setItem('Player', player);
        usersChannel.postMessage('JoinedWaitRoom');
    }
})