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

    name.textContent = "Product";
    firstRow.appendChild(name);

    count.textContent = "Count";
    firstRow.appendChild(count);
    
    tbody.appendChild(firstRow);

    // Product X
    const product_x = document.createElement('tr');
    let nameCell = document.createElement('td');
    let countCell = document.createElement('td');
    
    nameCell.textContent = goodsData[0].Name;
    product_x.appendChild(nameCell);

    let ID = `countX${player}`;
    countCell.id = ID;
    countCell.textContent = playersData[player].Good_X;
    product_x.appendChild(countCell);
    tbody.appendChild(product_x);

    // Product Y
    const product_y = document.createElement('tr');
    nameCell = document.createElement('td');
    countCell = document.createElement('td');
    
    nameCell.textContent = goodsData[1].Name;
    product_y.appendChild(nameCell);

    ID = `countY${player}`;
    countCell.id = ID;
    countCell.textContent = playersData[player].Good_Y;
    product_y.appendChild(countCell);
    tbody.appendChild(product_y);

    // Product Z
    const product_z = document.createElement('tr');
    nameCell = document.createElement('td');
    countCell = document.createElement('td');
    
    nameCell.textContent = goodsData[2].Name;
    product_z.appendChild(nameCell);

    ID = `countZ${player}`;
    countCell.id = ID;
    countCell.textContent = playersData[player].Good_Z;
    product_z.appendChild(countCell);
    tbody.appendChild(product_z);

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

// Update tables
function refreshValues(player, resource, value) {
    const count = document.getElementById(`count${resource}${player}`);
    count.textContent = value;
}

function makeReady(player) {
    const message = document.getElementById(`ready${player}`);
    message.textContent = `Ready!`;
}

function makeNotReady(player) {
    const message = document.getElementById(`ready${player}`);
    message.textContent = `Not ready!`;
}

// Draw everything
drawTables();

// Submit button 
const submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
    // Generate token and switch pages
    xhr.open("POST", "../../Includes/GenerateToken.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`player=${player}`);

    let respone = JSON.parse(xhr.responseText);
    window.location.href = `http://localhost/Admin/StockPanel/StockPanel.php?player=${player}&token=${respone.token}`;
    adminChannel.postMessage("GoToStockMarket");
});

// Channels listeners
adminChannel.addEventListener('message', (event) => {
    if(event.data.message === "Update") {
        refreshValues(event.data.player, event.data.product, event.data.value);
    }
    else if(event.data.message === "Ready") {
        makeReady(event.data.player);
    }
    else if(event.data.message === "NotReady") {
        makeNotReady(event.data.player);
    }
});

usersChannel.addEventListener('message', (event) => {

});