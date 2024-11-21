// Channels
const adminChannel = new BroadcastChannel('resource_game_admin');
const usersChannel = new BroadcastChannel('resource_game_users');
const xhr = new XMLHttpRequest();

// Logout from game
if (sessionStorage.getItem('WaitRoom')) {
    const user = sessionStorage.getItem('Player');
    
    xhr.open("POST", "../Includes/SetInGame.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`player=${user}&onnline=0`);
    
    usersChannel.postMessage('quitWaitRoom');
    sessionStorage.removeItem('WaitRoom');
    sessionStorage.removeItem('Player');
    location.reload();
}

// Error
const passwordDiv = document.getElementById('passwordDiv');
const error = document.getElementById('error');

// Handle error
const input = document.getElementById('password');

input.addEventListener('input', event => {
    passwordDiv.style.marginBottom = "1.5%";
    error.style.display = 'none';
})

// Buttons
const playerName = document.getElementById('playerName');
const menu = document.querySelector('.menu');

function clickButton(user) {
    if (player != user) {
        passwordDiv.style.marginBottom = "1.5%";
        error.style.display = 'none';
        input.value = "";
    }

    passwordDiv.style.display = "flex";
    playerName.innerHTML = `Player ${user+1}`;
    player = user;
}

function drawButtons() {
    menu.innerHTML = "";

    for (let i = 0; i < playersData.length-1; i++) {
        if (playersData[i].InGame != 1) {
            const newLi = document.createElement('li');
            const newButton = document.createElement('button');
    
            newButton.textContent = `Player ${playersData[i].ID}`;
            newButton.onclick = function () {
                clickButton(playersData[i].ID - 1);
            }
            newLi.appendChild(newButton);
            menu.appendChild(newLi);
        }
    }
}
drawButtons();

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
        xhr.open("POST", "../Includes/SetInGame.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`player=${player}`);

        // Generate token and switch pages
        xhr.open("POST", "../Includes/GenerateToken.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`player=${player}`);

        sessionStorage.setItem('WaitRoom', true);
        sessionStorage.setItem('Player', player);
        usersChannel.postMessage('JoinedWaitRoom');

        let respone = JSON.parse(xhr.responseText);
        window.location.href = `http://localhost/User/WaitRoom/WaitRoom.php?player=${player}&token=${respone.token}`;
    }
})

// Channels listeners
usersChannel.addEventListener('message', (event) => {
    if (event.data === 'JoinedWaitRoom' || event.data === 'quitWaitRoom') {
        xhr.open("GET", "../Includes/RefreshDatabases.php", false);
        xhr.send();
        playersData = JSON.parse(xhr.responseText);

        drawButtons();
    }
});