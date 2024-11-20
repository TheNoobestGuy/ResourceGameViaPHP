// Channels
const adminChannel = new BroadcastChannel('resource_game_admin');
const usersChannel = new BroadcastChannel('resource_game_users');
const xhr = new XMLHttpRequest();

// Get table with wating players
const title = document.getElementById('title');
const onnlineTable = document.getElementById('onnlineTable');

function refreshPlayersList() {
    onnlineTable.innerHTML = `
    <thead>
            <tr>
                <th>Name</th>
                <th>Status</th>
            </tr>
    </thead>
    <tbody>
    </tbody>
            `;

    playersData.forEach(player => {
        if (player.InGame == 1) {
            if (player.Admin != 1) {
                const newRow = onnlineTable.insertRow();
                const name = newRow.insertCell(0);
                const onnline = newRow.insertCell(1);

                // Add content to the cells
                name.textContent = `Player ${player.ID}`;
                onnline.textContent = "Waiting...";
            }
        }
    });
}

refreshPlayersList();

// Channels listeners
usersChannel.addEventListener('message', (event) => {
    if (event.data === 'quitWaitRoom' || event.data === 'JoinedWaitRoom') {
        xhr.open("GET", "../Includes/RefreshDatabases.php", false);
        xhr.send();
        playersData = JSON.parse(xhr.responseText);
        
        refreshPlayersList();
    }
});

adminChannel.addEventListener('message', (event) => {
    if (event.data === 'AdminJoinedWaitRoom') {
        title.innerHTML = "Admin is already here wait for him to start the game!"
    }
    else if(event.data === 'ResourcesLevel') {
        // Generate token and go to resource level
        xhr.open("POST", "../Includes/GenerateToken.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`player=${player}`);

        let respone = JSON.parse(xhr.responseText)
        window.location.href = `http://localhost/User/UserResources.php?player=${player}&token=${respone.token}`;
    }
});