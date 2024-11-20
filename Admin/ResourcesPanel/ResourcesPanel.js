// Channel
const adminChannel = new BroadcastChannel('resource_game_admin');
const usersChannel = new BroadcastChannel('resource_game_users');
const xhr = new XMLHttpRequest();

// Tables
const tables = document.getElementById('tables');
const menu = document.getElementById('menu');
function drawTable(player) {
    const div = document.createElement('div');

    // Header
    const h2 = document.createElement('h2');
    h2.textContent = `Player ${player+1}`;
    div.appendChild(h2);

    const h3 = document.createElement('h3');
    h3.textContent = "Not ready!";
    h3.id = `ready${player}`;
    div.appendChild(h3);

    // Table
    const table = document.createElement('table');
    table.id = `table${player}`;
    const tbody = document.createElement('tbody');

    const firstRow = document.createElement('tr');
    const name = document.createElement('th');
    const count = document.createElement('th');

    name.textContent = "Resource";
    firstRow.appendChild(name);

    count.textContent = "Count";
    firstRow.appendChild(count);
    
    tbody.appendChild(firstRow);

    // Resource A
    const resource_A = document.createElement('tr');
    let nameCell = document.createElement('td');
    let countCell = document.createElement('td');
    
    nameCell.textContent = resourcesData[0].Name;
    resource_A.appendChild(nameCell);

    let ID = `countA${player}`;
    countCell.id = ID;
    countCell.textContent = playersData[player].Resource_A;
    resource_A.appendChild(countCell);
    tbody.appendChild(resource_A);

    // Resource B
    const resource_B = document.createElement('tr');
    nameCell = document.createElement('td');
    countCell = document.createElement('td');
    
    nameCell.textContent = resourcesData[1].Name;
    resource_B.appendChild(nameCell);

    ID = `countB${player}`;
    countCell.id = ID;
    countCell.textContent = playersData[player].Resource_B;
    resource_B.appendChild(countCell);
    tbody.appendChild(resource_B);

    // Resource C
    const resource_C = document.createElement('tr');
    nameCell = document.createElement('td');
    countCell = document.createElement('td');
    
    nameCell.textContent = resourcesData[2].Name;
    resource_C.appendChild(nameCell);

    ID = `countC${player}`;
    countCell.id = ID;
    countCell.textContent = playersData[player].Resource_C;
    resource_C.appendChild(countCell);
    tbody.appendChild(resource_C);

    // Resource D
    const resource_D = document.createElement('tr');
    nameCell = document.createElement('td');
    countCell = document.createElement('td');
    
    nameCell.textContent = resourcesData[3].Name;
    resource_D.appendChild(nameCell);

    ID = `countD${player}`;
    countCell.id = ID;
    countCell.textContent = playersData[player].Resource_D;
    resource_D.appendChild(countCell);
    tbody.appendChild(resource_D);

    // Append table
    table.appendChild(tbody);
    div.appendChild(table);
    tables.appendChild(div);
}

// Draw functions
function drawTables() {
    for (let i = 0; i < playersData.length-1; i++) {
        if (playersData[i].InGame == 1) {
            drawTable(i);
        }
    }
}

// Buttons
function clickButton(player) {

}

function drawMenu() {
    for (let i = 0; i < resourcesData.length; i++) {
        const newLi = document.createElement('li');
        const newButton = document.createElement('button');
    
        newButton.textContent = `Resource ${resourcesData[i].Name}`;
        newButton.onclick = function () {
            clickButton(playersData[i].ID - 1);
        }
        newLi.appendChild(newButton);
        menu.appendChild(newLi);
    }
}

// Update tables
function refreshValues(player, resource, value) {
    const count = document.getElementById(`count${resource}${player}`);
    count.textContent = value;
}

function makeReady(player) {
    const message = document.getElementById(`ready${player}`);
    message.textContent = `Ready!`;
}

// Draw everything
drawTables();
drawMenu();

// Submit button 
const submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
    // Generate token and switch pages
    xhr.open("POST", "../../Includes/GenerateToken.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`player=${player}`);

    let respone = JSON.parse(xhr.responseText)
    window.location.href = `http://localhost/Admin/ProductsPanel/ProductsPanel.php?player=${player}&token=${respone.token}`;
    adminChannel.postMessage("GoToGoodsMarket");
});

// Channels listeners
adminChannel.addEventListener('message', (event) => {
    if(event.data.message === "Update") {
        refreshValues(event.data.player, event.data.resource, event.data.value);
    }
    else if(event.data.message === "Ready") {
        makeReady(event.data.player);
    }
});