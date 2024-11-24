// Channel
const adminChannel = new BroadcastChannel('resource_game_admin');
const usersChannel = new BroadcastChannel('resource_game_users');
const xhr = new XMLHttpRequest();

// Functions for managment panel
const productXfunctionX= [ 50, 90 ];
const productXfunctionY = [ 120, 25 ];
const productXfunctionA = ((productXfunctionX[0] * productXfunctionY[0])-(productXfunctionX[1] * productXfunctionY[1]))/(productXfunctionY[0] - productXfunctionY[1]);
const productXfunctionB = productXfunctionY[0]*(productXfunctionX[0]-productXfunctionA);

const productYfunctionX= [ 50, 90 ];
const productYfunctionY = [ 70, 50 ];
const productYfunctionA = ((productYfunctionX[0] * productYfunctionY[0])-(productYfunctionX[1] * productYfunctionY[1]))/(productYfunctionY[0] - productYfunctionY[1]);
const productYfunctionB = productYfunctionY[0]*(productYfunctionX[0]-productYfunctionA);

const productZfunctionX = [ 50, 90 ];
const productZfunctionY = [ 150, 10 ];
const productZfunctionA = ((productZfunctionX[0] * productZfunctionY[0])-(productZfunctionX[1] * productZfunctionY[1]))/(productZfunctionY[0] - productZfunctionY[1]);
const productZfunctionB = productZfunctionY[0]*(productZfunctionX[0]-productZfunctionA);

// Managment panel


// Chart panel
const ctx = document.getElementById('chart').getContext('2d');

// Generate points for function
const pointsX = [];
const productXpointsY = [];
const productYpointsY = [];
const productZpointsY = [];

for (let i = 0; i <= 200; i+=5) {
    pointsX.push(i);
}

function generatePointsY(Avalue, Bvalue, pointsY) {
    pointsY.length = 0;
    for (let i = 0; i < pointsX.length; i++) {
        const equation = parseInt(Bvalue/(pointsX[i]-Avalue));
        pointsY.push(equation);
    }
}
generatePointsY(productXfunctionA, productXfunctionB, productXpointsY);
generatePointsY(productYfunctionA, productYfunctionB, productYpointsY);
generatePointsY(productZfunctionA, productZfunctionB, productZpointsY);

// Data for the line chart
const data = {
    labels: pointsX,
    datasets: [
        {
            label: 'Product X',
            data: productXpointsY,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.1
        },
        {
            label: 'Product Y',
            data: productYpointsY,
            borderColor: 'rgba(188, 53, 71, 1)',
            fill: false,
            tension: 0.1
        },
        {
            label: 'Product Z',
            data: productZpointsY,
            borderColor: 'rgb(0, 134, 0, 1)',
            fill: false,
            tension: 0.1
        }
    ],
};

// Chart configuration
const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Price'
                },
                min: 50,
                max: 100
            },
            y: {
                title: {
                    display: true,
                    text: 'Demand'
                },
                min: 0,
                max: 150
            }
        }
    }
};

// Export stock informations
function exportStockInfo() {
    const stockData = [];

    // Export the data
    for(let i = 0; i < productXpointsY.length; i++) {
        stockData.push(['X', productXpointsY[i], pointsX[i]]);
    }
    stockData[stockData.length-1][1] = 0;

    for(let i = 0; i < productYpointsY.length; i++) {
        stockData.push(['Y', productYpointsY[i], pointsX[i]]);
    }
    stockData[stockData.length-1][1] = 0;
    
    for(let i = 0; i < productZpointsY.length; i++) {
        stockData.push(['Z', productZpointsY[i], pointsX[i]]);
    }
    stockData[stockData.length-1][1] = 0;

    // Send stock informations
    xhr.open("POST", "../../Includes/UpdateStock.php", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ stockData: stockData }));
}

// Create the chart
const myChart = new Chart(ctx, config);
exportStockInfo();

// Show offerts
const tableX = document.getElementById('tableX');
for(let i = 0; i < offertsX.length; i++) {
    const newRow = tableX.insertRow()

    const playerCell = newRow.insertCell(0);
    const amountCell = newRow.insertCell(1);
    const priceCell = newRow.insertCell(2);

    playerCell.textContent = Number(offertsX[i].Player+1);
    amountCell.textContent = offertsX[i].Amount;
    priceCell.textContent = `${offertsX[i].Price}$`;
}

const tableY = document.getElementById('tableY');
for(let i = 0; i < offertsY.length; i++) {
    const newRow = tableY.insertRow()

    const playerCell = newRow.insertCell(0);
    const amountCell = newRow.insertCell(1);
    const priceCell = newRow.insertCell(2);

    playerCell.textContent = Number(offertsY[i].Player+1);
    amountCell.textContent = offertsY[i].Amount;
    priceCell.textContent = `${offertsY[i].Price}$`;
}

const tableZ = document.getElementById('tableZ');
for(let i = 0; i < offertsZ.length; i++) {
    const newRow = tableZ.insertRow()

    const playerCell = newRow.insertCell(0);
    const amountCell = newRow.insertCell(1);
    const priceCell = newRow.insertCell(2);

    playerCell.textContent = Number(offertsZ[i].Player+1);
    amountCell.textContent = offertsZ[i].Amount;
    priceCell.textContent = `${offertsZ[i].Price}$`;
}

// Submit button 
const submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
    // Generate token and switch pages
    xhr.open("POST", "../../Includes/GenerateToken.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`player=${player}`);

    let respone = JSON.parse(xhr.responseText);
    window.location.href = `http://localhost/Statistics/Statistics.php?player=${player}&token=${respone.token}`;
    adminChannel.postMessage("GoToResults");
});

// Function for database update of offerts
function sendOffer(player, product, amount, price) {
    xhr.open("POST", "../../Includes/SendOffer.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`player=${player}&product=${product}&amount=${amount}&price=${price}`);
}

function withdrawOffer(player, product, amount, price) {
    xhr.open("POST", "../../Includes/WithdrawOffer.php", false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`player=${player}&product=${product}&amount=${amount}&price=${price}`);
}

// Function for update of offerts
function appendOffer(player, product, amount, price) {
    const table = document.getElementById(`table${product}`);
    const newRow = table.insertRow();

    const playerCell = newRow.insertCell(0);
    const amountCell = newRow.insertCell(1);
    const priceCell = newRow.insertCell(2);

    playerCell.textContent = player+1;
    amountCell.textContent = amount;
    priceCell.textContent = `${price}$`;

    sendOffer(player, product, amount, price);
}

function removeOffer(player, product, amount, price) {
    const table = document.getElementById(`table${product}`);
    const rows = table.rows;
    
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll('td');

        const playerCell = Number(cells[0].textContent);
        const amountCell = Number(cells[1].textContent);
        const priceCell = Number(cells[2].textContent.slice(0, -1));

        if (playerCell == (player+1) && amountCell == amount && priceCell == price) {
            withdrawOffer(player, product, amount, price);
            const parent = row.parentNode;
            parent.removeChild(row);
            return;
        }
    }
}

// Channels listeners
adminChannel.addEventListener('message', (event) => {
    if(event.data.message === "Delete") {
        removeOffer(event.data.player, event.data.product, 
            event.data.amount, event.data.price);
    }
    else if(event.data.message === "Update") {
        appendOffer(event.data.player, event.data.product, 
            event.data.amount, event.data.price);
    }
});