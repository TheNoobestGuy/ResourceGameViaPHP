// Channel
const adminChannel = new BroadcastChannel('resource_game_admin');
const usersChannel = new BroadcastChannel('resource_game_users');
const xhr = new XMLHttpRequest();

// Function that creates row for offers
function createRow(player, amount, price, product) {
    const productTable = document.getElementById(`table${product}`);
    const newRow = productTable.insertRow();
    const playerCell = newRow.insertCell(0);
    const amountCell = newRow.insertCell(1);
    const priceCell = newRow.insertCell(2);
    playerCell.textContent = player+1;
    amountCell.textContent = amount;
    priceCell.textContent = `${price}$`;
}

// Submit button 
const submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
    // Generate token and switch pages
    xhr.open("POST", "../../Includes/GenerateToken.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`player=${player}`);

    let respone = JSON.parse(xhr.responseText)
    window.location.href = `http://localhost/Admin/StockPanel/StockPanel.php?player=${player}&token=${respone.token}`;
    adminChannel.postMessage("GoToResults");
});

// Channels listeners
adminChannel.addEventListener('message', (event) => {

});

usersChannel.addEventListener('message', (event) => {
    if(event.data.message === "Update") {
        createRow(event.data.player, event.data.amount, 
            event.data.price, event.data.product)
    }
});