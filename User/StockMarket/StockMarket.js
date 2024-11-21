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

// Function that creates row for offers
function createRow(player, amount, price, product) {
    if (!Xnegative && !Ynegative && !Znegative) {
        const productTable = document.getElementById(`table${product}`);
        const newRow = productTable.insertRow();
        const playerCell = newRow.insertCell(0);
        const amountCell = newRow.insertCell(1);
        const priceCell = newRow.insertCell(2);

        playerCell.textContent = player+1;
        amountCell.textContent = amount;
        priceCell.textContent = `${price}$`;
    }
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

// X product offers
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
        
        // Broadcast
        //adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[3].Name, value: XAmount});

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
    console.log(playersData[player].Good_X);
    playerX.innerHTML = `${XAmount}`;
    playersData[player].Good_X = XAmount;

    XInputBuffor = value;
    XInputLenght++;

    // Broadcast
    //adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[3].Name, value: XAmount});
    
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
    if (Xamount.value > 0 && Xprice.value > 0) {
        createRow(player, Xamount.value, Xprice.value, 'X');
        usersChannel.postMessage({message: "Update", product: 'X', 
            player: player, amount: Xamount.value, price: Xprice.value});

        Xamount.value = "";
        Xprice.value = "";
    }
});

// Y product offers
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
        
        // Broadcast
        //adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[3].Name, value: XAmount});

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

    // Broadcast
    //adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[3].Name, value: XAmount});
    
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
    if (Yamount.value > 0 && Yprice.value > 0) {
        createRow(player, Yamount.value, Yprice.value, 'Y');
        usersChannel.postMessage({message: "Update", product: 'Y', 
            player: player, amount: Yamount.value, price: Yprice.value});
        
        Yamount.value = "";
        Yprice.value = "";
    }
});

// Z product offers
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
        let ZAmount = Number(Number(layersData[player].Good_Z) + ZInputBuffor - value);
        playerZ.innerHTML = `${ZAmount}`;
        playersData[player].Good_Z = ZAmount;

        ZInputBuffor = value;
        ZInputLenght--;
        
        // Broadcast
        //adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[3].Name, value: XAmount});

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

    // Broadcast
    //adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[3].Name, value: XAmount});
    
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
    if (Zamount.value > 0 && Zprice.value > 0) {
        createRow(player, Zamount.value, Zprice.value, 'Z');
        usersChannel.postMessage({message: "Update", product: 'Z', 
            player: player, amount: Zamount.value, price: Zprice.value});
        
        Zamount.value = "";
        Zprice.value = "";
    }
});

// Channels listeners
adminChannel.addEventListener('message', (event) => {
    if(event.data === "GoToStockMarket") {

    }
});

usersChannel.addEventListener('message', (event) => {
    if(event.data === "GoToStockMarket") {
        
    }
});