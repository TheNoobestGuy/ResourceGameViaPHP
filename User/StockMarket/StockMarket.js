// Channel
const adminChannel = new BroadcastChannel('resource_game_admin');
const usersChannel = new BroadcastChannel('resource_game_users');
const xhr = new XMLHttpRequest();

// Player goods
const playerX = document.getElementById('playerX');
const playerY = document.getElementById('playerY');
const playerZ = document.getElementById('playerZ');

// Inputs
const Xamount = document.getElementById('Xamount');
const Yamount = document.getElementById('Yamount');
const Zamount = document.getElementById('Zamount');
const Xprice = document.getElementById('Xprice');
const Yprice = document.getElementById('Yprice');
const Zprice = document.getElementById('Zprice');
const inputLimit = 9999;

// Buttons
const SendX =  document.getElementById('SendX');
const SendY =  document.getElementById('SendY');
const SendZ =  document.getElementById('SendZ');

// Errors
const negativeGoods = document.getElementById('error');
let Xnegative = false;
let Ynegative = false;
let Znegative = false;
const error = [];

// Function that creates row for offerts
function createRow(player, amount, price, product) {
    if (!Xnegative && !Ynegative && !Znegative) {
        const productTable = document.getElementById(`table${product}`);
        const newRow = productTable.insertRow();

        const playerCell = newRow.insertCell(0);
        const amountCell = newRow.insertCell(1);
        const priceCell = newRow.insertCell(2);
        const closeCell = newRow.insertCell(3);

        // Cells
        playerCell.textContent = player+1;
        amountCell.textContent = amount;
        priceCell.textContent = `${price}$`;

        // Button for withdrawing an offer
        const newButton = document.createElement('button');
        newButton.textContent = "X";
        newButton.onclick = function () {
            const row = this.closest('tr');
            const table = row.parentNode;
            table.removeChild(row);
            
            adminChannel.postMessage({message: "Delete", product: product, 
                player: player, amount: amount, price: price});

            const goodAmount = document.getElementById(`player${product}`);

            if(product == 'X') {
                playersData[player].Good_X = Number(playersData[player].Good_X) + Number(row.cells[1].textContent);
                goodAmount.innerHTML = playersData[player].Good_X;
            }
            else if(product == 'Y') {
                playersData[player].Good_Y = Number(playersData[player].Good_Y) + Number(row.cells[1].textContent);
                goodAmount.innerHTML = playersData[player].Good_Y;
            }
            else {
                playersData[player].Good_Z = Number(playersData[player].Good_Z) + Number(row.cells[1].textContent);
                goodAmount.innerHTML = playersData[player].Good_Z;
            }

            updateGoods();
        }
        closeCell.appendChild(newButton);
    }
}

// Update goods table
function updateGoods() {
    xhr.open("POST", "../../Includes/UpdateProducts.php", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ playersData: playersData, player: player }));
}

// Numbers table for fruther validation of input and converter
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function converToInt(typedText) {
    let value = 0;

    let counter = 1;
    for (let i = typedText.length - 1; i >= 0; i--, counter *= 10) {
        value += typedText[i] * counter;
    }

    return value;
}

function mustBeNumber(typedText) {
    let buffor = [];

    typedText.forEach(element => {
        numbers.forEach(num => {
            if (element == num) {
                buffor.push(num);
            }
        });
    });
    
    return buffor;
}

function createString(typedText) {
    let buffor = "";

    typedText.forEach(element => {
        buffor += element;
    });

    return buffor;
}

// Show offerts
const tableX = document.getElementById('tableX');
for(let i = 0; i < offertsX.length; i++) {
    createRow(offertsX[i].Player, offertsX[i].Amount, offertsX[i].Price, offertsX[i].Product);
}

const tableY = document.getElementById('tableY');
for(let i = 0; i < offertsY.length; i++) {
    createRow(offertsY[i].Player, offertsY[i].Amount, offertsY[i].Price, offertsY[i].Product);
}

const tableZ = document.getElementById('tableZ');
for(let i = 0; i < offertsZ.length; i++) {
    createRow(offertsZ[i].Player, offertsZ[i].Amount, offertsZ[i].Price, offertsZ[i].Product);
}

// X product offerts
let XInputLenght = 0;
let XInputBuffor = 0;

Xamount.addEventListener('input', function(event) {
    let typedText = mustBeNumber(Xamount.value.split(''));
    let value = converToInt(typedText);
    Xamount.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        Xamount.value = Xamount.value.slice(0, -1);
        return;
    }

    // Go back to previous value
    if (XInputLenght > typedText.length) {
        let XAmount = Number(Number(playersData[player].Good_X) + XInputBuffor - value);
        playerX.innerHTML = `${XAmount}`;
        playersData[player].Good_X = XAmount;

        XInputBuffor = value;
        XInputLenght--;
        
        // Erease error
        if (Xnegative && XAmount >= 0) {
            Xnegative = false;
            if(!Ynegative && !Znegative) {
                negativeGoods.style.display = 'none';
            }
        }
        return;
    }

    // Dont let execute program for empty string
    if (typedText.length == 0) {
        return;
    }

    // Convert text to int and use it to calculate resources and money
    let XAmount = Number(Number(playersData[player].Good_X) + XInputBuffor - value);
    playerX.innerHTML = `${XAmount}`;
    playersData[player].Good_X = XAmount;

    XInputBuffor = value;
    XInputLenght++;

    // Check for errors
    if (XAmount < 0) {
        Xnegative = true;
        goodsAreNegative = true;
        negativeGoods.style.display = 'block';
    }
});

Xprice.addEventListener('input', function(event) {
    let typedText = mustBeNumber(Xprice.value.split(''));
    Xprice.value = createString(typedText);
});

SendX.addEventListener('click', function(event) {
    if (!Xnegative && Xamount.value != "" && Xprice.value != "") {
        createRow(player, Xamount.value, Xprice.value, 'X');

        updateGoods();
        adminChannel.postMessage({message: "Update", product: 'X', 
            player: player, amount: Xamount.value, price: Xprice.value});
        
        XInputBuffor = 0;
        Xamount.value = "";
        Xprice.value = "";
    }
});

// Y product offerts
let YInputLenght = 0;
let YInputBuffor = 0;

Yamount.addEventListener('input', function(event) {
    let typedText = mustBeNumber(Yamount.value.split(''));
    let value = converToInt(typedText);
    Yamount.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        Yamount.value = Yamount.value.slice(0, -1);
        return;
    }

    // Go back to previous value
    if (YInputLenght > typedText.length) {
        let YAmount = Number(Number(playersData[player].Good_Y) + YInputBuffor - value);
        playerY.innerHTML = `${YAmount}`;
        playersData[player].Good_Y = YAmount;

        YInputBuffor = value;
        YInputLenght--;

        // Erease error
        if (Ynegative && YAmount >= 0) {
            Ynegative = false;
            if(!Znegative && !Xnegative) {
                negativeGoods.style.display = 'none';
            }
        }
        return;
    }

    // Dont let execute program for empty string
    if (typedText.length == 0) {
        return;
    }

    // Convert text to int and use it to calculate resources and money
    let YAmount = Number(Number(playersData[player].Good_Y) + YInputBuffor - value);

    playerY.innerHTML = `${YAmount}`;
    playersData[player].Good_Y = YAmount;

    YInputBuffor = value;
    YInputLenght++;

    // Check for errors
    if (YAmount < 0) {
        Ynegative = true;
        goodsAreNegative = true;
        negativeGoods.style.display = 'block';
    }
});

Yprice.addEventListener('input', function(event) {
    let typedText = mustBeNumber(Yprice.value.split(''));
    Yprice.value = createString(typedText);
});

SendY.addEventListener('click', function(event) {
    if (!Ynegative && Yamount.value != "" && Yprice.value != "") {
        createRow(player, Yamount.value, Yprice.value, 'Y');

        updateGoods();
        adminChannel.postMessage({message: "Update", product: 'Y', 
            player: player, amount: Yamount.value, price: Yprice.value});
        
        YInputBuffor = 0;
        Yamount.value = "";
        Yprice.value = "";
    }
});

// Z product offerts
let ZInputLenght = 0;
let ZInputBuffor = 0;

Zamount.addEventListener('input', function(event) {
    let typedText = mustBeNumber(Zamount.value.split(''));
    let value = converToInt(typedText);
    Zamount.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        Zamount.value = Zamount.value.slice(0, -1);
        return;
    }

    // Go back to previous value
    if (ZInputLenght > typedText.length) {
        let ZAmount = Number(Number(playersData[player].Good_Z) + ZInputBuffor - value);
        playerZ.innerHTML = `${ZAmount}`;
        playersData[player].Good_Z = ZAmount;

        ZInputBuffor = value;
        ZInputLenght--;

        // Erease error
        if (Znegative && ZAmount >= 0) {
            Znegative = false;
            if(!Ynegative && !Xnegative) {
                negativeGoods.style.display = 'none';
            }
        }
        return;
    }

    // Dont let execute program for empty string
    if (typedText.length == 0) {
        return;
    }

    // Convert text to int and use it to calculate resources and money
    let ZAmount = Number(Number(playersData[player].Good_Z) + ZInputBuffor - value);

    playerZ.innerHTML = `${ZAmount}`;
    playersData[player].Good_Z = ZAmount;

    ZInputBuffor = value;
    ZInputLenght++;

    // Check for errors
    if (ZAmount < 0) {
        Znegative = true;
        goodsAreNegative = true;
        negativeGoods.style.display = 'block';
    }
});

Zprice.addEventListener('input', function(event) {
    let typedText = mustBeNumber(Zprice.value.split(''));
    Zprice.value = createString(typedText);
});

SendZ.addEventListener('click', function(event) {
    if (!Znegative && Zamount.value != "" && Zprice.value != "") {
        createRow(player, Zamount.value, Zprice.value, 'Z');

        updateGoods();
        adminChannel.postMessage({message: "Update", product: 'Z', 
            player: player, amount: Zamount.value, price: Zprice.value});
        
        ZInputBuffor = 0;
        Zamount.value = "";
        Zprice.value = "";
    }
});

// Channels listeners
adminChannel.addEventListener('message', (event) => {
    if(event.data === "GoToResults") {
        // Generate token and switch pages
        xhr.open("POST", "../../Includes/GenerateToken.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`player=${player}`);

        let respone = JSON.parse(xhr.responseText);
        window.location.href = `http://localhost/Statistics/Statistics.php?player=${player}&token=${respone.token}`;
    }
});