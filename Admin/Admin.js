// Channel
const adminChannel = new BroadcastChannel('resource_game_admin');
const xhr = new XMLHttpRequest();

// Error
const passwordDiv = document.getElementById('passwordDiv');
const error = document.getElementById('error');

// Handle error
sessionStorage.clear();
const input = document.getElementById('password');

input.addEventListener('input', event => {
    passwordDiv.style.marginBottom = "1.5%";
    error.style.display = 'none';
})

// Handle login
const loginButton = document.getElementById('login');
player = 4;

loginButton.addEventListener('click', event => {
    let logedIn = false;
    let password = input.value;

    // Check is password correct
    if (password == playersData[player].Password) {
        logedIn = true;
    }
    else {
        passwordDiv.style.marginBottom = 0;
        error.style.display = 'block';
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

        let respone = JSON.parse(xhr.responseText)
        window.location.href = `http://localhost/Admin/WaitRoom/WaitRoom.php?player=${player}&token=${respone.token}`;
        adminChannel.postMessage('AdminJoinedWaitRoom');
    }
})