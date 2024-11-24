// Channel
const adminChannel = new BroadcastChannel('resource_game_admin');
const usersChannel = new BroadcastChannel('resource_game_users');
const xhr = new XMLHttpRequest();

// Admin
const submitButton = document.getElementById('submit');
const admin = playersData[player].Admin == 1 ? true : false;

if (admin) {
    const header = document.querySelector('.Logo');
    const footer = document.querySelector('.foot');
    header.style.backgroundColor = 'black';
    footer.style.backgroundColor = 'black';
    submitButton.style.display = 'flex';
}

// Draw statistics
const statistics = document.getElementById('statistics');
for (let i = 0; i < playersData.length; i++) {
    if (playersData[i].InGame == 1) {
        const newRow = statistics.insertRow();

        const player = newRow.insertCell(0);
        const productX = newRow.insertCell(1);
        const productY = newRow.insertCell(2);
        const productZ = newRow.insertCell(3);
        const eraned = newRow.insertCell(4);
        const money = newRow.insertCell(5);

        player.textContent = playersData[i].ID;
        productX.textContent = playersData[i].Good_X;
        productY.textContent = playersData[i].Good_Y;
        productZ.textContent = playersData[i].Good_Z;
        
        for (let j = 0; j < earnedMoney.length; j++) {
            if (earnedMoney[j][0] == i) {
                eraned.textContent = `${earnedMoney[j][1]}$`;
            }
        }

        money.textContent = `${playersData[i].Money}$`;
    }
}

// Submit
submitButton.addEventListener('click', function(event) {
    adminChannel.postMessage("GoToResourcesMarket");

    // Generate token and switch pages
    xhr.open("POST", "../../Includes/GenerateToken.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`player=${player}`);
    
    let response = JSON.parse(xhr.responseText);
    window.location.href = `http://localhost/Admin/ResourcesPanel/ResourcesPanel.php?player=${player}&token=${response.token}`;
});

// Channels listeners
adminChannel.addEventListener('message', (event) => {
    if(event.data === "GoToResourcesMarket") {
        // Generate token and switch pages
        xhr.open("POST", "../../Includes/GenerateToken.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`player=${player}`);
        
        let response = JSON.parse(xhr.responseText);
        window.location.href = `http://localhost/User/ResourcesMarket/ResourcesMarket.php?player=${player}&token=${response.token}`;
    }
});