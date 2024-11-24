// Channel
const adminChannel = new BroadcastChannel('resource_game_admin');
const usersChannel = new BroadcastChannel('resource_game_users');
const xhr = new XMLHttpRequest();

// Player
const playerA = document.getElementById('playerA');
const playerB = document.getElementById('playerB');
const playerC = document.getElementById('playerC');
const playerD = document.getElementById('playerD');

// Inputs
const XValueInput = document.getElementById('XValue');
const YValueInput = document.getElementById('YValue');
const ZValueInput = document.getElementById('ZValue');
const inputLimit = 9999;

// Error
const negativeResources = document.getElementById('negativeResources');
let resourcesNegativeError = false;

// Reset values
let reset = false;
let X = 0;
let Y = 0;
let Z = 0;

function resetForm(X, Y, Z, undo) {
    if(undo) {
        // Reset resources for X
        playersData[player].Resource_A = Number(playersData[player].Resource_A) + (X * Number(goodsData[0].Cost_A));
        playersData[player].Resource_B = Number(playersData[player].Resource_B) + (X * Number(goodsData[0].Cost_B));
        playersData[player].Resource_C = Number(playersData[player].Resource_C) + (X * Number(goodsData[0].Cost_C));
        playersData[player].Resource_D = Number(playersData[player].Resource_D) + (X * Number(goodsData[0].Cost_D));

        // Reset resources for Y
        playersData[player].Resource_A = Number(playersData[player].Resource_A) + (Y * Number(goodsData[1].Cost_A));
        playersData[player].Resource_B = Number(playersData[player].Resource_B) + (Y * Number(goodsData[1].Cost_B));
        playersData[player].Resource_C = Number(playersData[player].Resource_C) + (Y * Number(goodsData[1].Cost_C));
        playersData[player].Resource_D = Number(playersData[player].Resource_D) + (Y * Number(goodsData[1].Cost_D));

        // Reset resources for Z
        playersData[player].Resource_A = Number(playersData[player].Resource_A) + (Z * Number(goodsData[2].Cost_A));
        playersData[player].Resource_B = Number(playersData[player].Resource_B) + (Z * Number(goodsData[2].Cost_B));
        playersData[player].Resource_C = Number(playersData[player].Resource_C) + (Z * Number(goodsData[2].Cost_C));
        playersData[player].Resource_D = Number(playersData[player].Resource_D) + (Z * Number(goodsData[2].Cost_D));

        // Reset goods
        playersData[player].Good_X = Number(playersData[player].Good_X - X);
        playersData[player].Good_Y = Number(playersData[player].Good_Y - Y);
        playersData[player].Good_Z = Number(playersData[player].Good_Z - Z);

        // Reset layout
        playerA.innerHTML = `${playersData[player].Resource_A}`;
        playerB.innerHTML = `${playersData[player].Resource_B}`;
        playerC.innerHTML = `${playersData[player].Resource_C}`;
        playerD.innerHTML = `${playersData[player].Resource_D}`;

        // Update resources
        xhr.open("POST", "../../Includes/UpdateResources.php", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({ playersData: playersData, player: player }));
        
        // Update goods
        xhr.open("POST", "../../Includes/UpdateProducts.php", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({ playersData: playersData, player: player })); 
    }

    // Update
    adminChannel.postMessage({message: "NotReady", player: player});
    adminChannel.postMessage({message: "Update", player: player, product: goodsData[0].Name, value: playersData[player].Good_X});
    adminChannel.postMessage({message: "Update", player: player, product: goodsData[1].Name, value: playersData[player].Good_Y});
    adminChannel.postMessage({message: "Update", player: player, product: goodsData[2].Name, value: playersData[player].Good_Z});
}

if (sessionStorage.getItem("X") != null) {
    X = Number(sessionStorage.getItem("X"))
    sessionStorage.removeItem("X");
    reset = true;
}
if (sessionStorage.getItem("Y") != null) {
    Y = Number(sessionStorage.getItem("Y"));
    sessionStorage.removeItem("Y");
    reset = true;
}
if (sessionStorage.getItem("Z") != null) {
    Z = Number(sessionStorage.getItem("Z"));
    sessionStorage.removeItem("Z");
    reset = true;
}

if(reset) {
    if(sessionStorage.getItem("Done") != null) {
        resetForm(Number(X), Number(Y), Number(Z), true);
        sessionStorage.clear();
    }
    else {
        resetForm(X, Y, Z, false);
    }
    reset = false;
}

// Numbers table for fruther validation of input and converter
let numbers = ['0', '1', '2', '3', '4' ,'5', '6', '7', '8', '9'];

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

// X good input handler
let XInputLength = 0;
let XValueBuffor = 0;

XValueInput.addEventListener('input', function(event) {
    let typedText = mustBeNumber(XValueInput.value.split(''));
    let value = converToInt(typedText);
    XValueInput.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        XValueInput.value = XValueInput.value.slice(0, -1);
        return;
    }

    // Go back to previous value after delete of number
    if (XInputLength > typedText.length) {
        let bufforASubtract = Number(value * goodsData[0].Cost_A);
        let bufforBSubtract = Number(value * goodsData[0].Cost_B);
        let bufforCSubtract = Number(value * goodsData[0].Cost_C);
        let bufforDSubtract = Number(value * goodsData[0].Cost_D);

        let bufforAAddition = Number(XValueBuffor * goodsData[0].Cost_A);
        let bufforBAddition = Number(XValueBuffor * goodsData[0].Cost_B);
        let bufforCAddition = Number(XValueBuffor * goodsData[0].Cost_C);
        let bufforDAddition = Number(XValueBuffor * goodsData[0].Cost_D);

        let bufforA = Number(playersData[player].Resource_A - bufforASubtract + bufforAAddition);
        let bufforB = Number(playersData[player].Resource_B - bufforBSubtract + bufforBAddition);
        let bufforC = Number(playersData[player].Resource_C - bufforCSubtract + bufforCAddition);
        let bufforD = Number(playersData[player].Resource_D - bufforDSubtract + bufforDAddition);
        XValueBuffor = value;

        playerA.innerHTML = `${bufforA}`;
        playerB.innerHTML = `${bufforB}`;
        playerC.innerHTML = `${bufforC}`;
        playerD.innerHTML = `${bufforD}`;

        playersData[player].Resource_A = bufforA;
        playersData[player].Resource_B = bufforB;
        playersData[player].Resource_C = bufforC;
        playersData[player].Resource_D = bufforD;
        playersData[player].Good_X = value;

        XInputLength--;
        
        // Broadcast
        adminChannel.postMessage({message: "Update", player: player, product: goodsData[0].Name, value: value});
        sessionStorage.setItem('X', value);

        // Erease error
        let ANegativeValue = bufforA < 0 ? true : false;
        let BNegativeValue = bufforB < 0 ? true : false;
        let CNegativeValue = bufforC < 0 ? true : false;
        let DNegativeValue = bufforD < 0 ? true : false;
    
        if (!ANegativeValue && !BNegativeValue && !CNegativeValue && !DNegativeValue) {
            resourcesNegativeError = false;
            negativeResources.style.display = 'none';
        }
        return;
    }

    // Dont let execute program for empty string
    if (typedText.length == 0) {
        return;
    }

    // Convert text to int and use it to calculate resources and money
    let ASubtract = Number(value * goodsData[0].Cost_A);
    let BSubtract = Number(value * goodsData[0].Cost_B);
    let CSubtract = Number(value * goodsData[0].Cost_C);
    let DSubtract = Number(value * goodsData[0].Cost_D);

    let AAddition = Number(XValueBuffor * goodsData[0].Cost_A);
    let BAddition = Number(XValueBuffor * goodsData[0].Cost_B);
    let CAddition = Number(XValueBuffor * goodsData[0].Cost_C);
    let DAddition = Number(XValueBuffor * goodsData[0].Cost_D);
    
    let AAmount = Number(playersData[player].Resource_A - ASubtract + AAddition);
    let BAmount = Number(playersData[player].Resource_B - BSubtract + BAddition);
    let CAmount = Number(playersData[player].Resource_C - CSubtract + CAddition);
    let DAmount = Number(playersData[player].Resource_D - DSubtract + DAddition);

    XValueBuffor = value;
    XInputLength++;

    playerA.innerHTML = `${AAmount}`;
    playerB.innerHTML = `${BAmount}`;
    playerC.innerHTML = `${CAmount}`;
    playerD.innerHTML = `${DAmount}`;
    
    playersData[player].Resource_A = AAmount;
    playersData[player].Resource_B = BAmount;
    playersData[player].Resource_C = CAmount;
    playersData[player].Resource_D = DAmount;
    playersData[player].Good_X = value;

    // Broadcast
    adminChannel.postMessage({message: "Update", player: player, product: goodsData[0].Name, value: value});
    sessionStorage.setItem('X', value);

    // Check for errors
    let ANegativeValue = AAmount < 0 ? true : false;
    let BNegativeValue = BAmount < 0 ? true : false;
    let CNegativeValue = CAmount < 0 ? true : false;
    let DNegativeValue = DAmount < 0 ? true : false;

    if (ANegativeValue || BNegativeValue || CNegativeValue || DNegativeValue) {
        resourcesNegativeError = true;
        negativeResources.style.display = 'block';
    }
});

// Y good input handler
let YInputLength = 0;
let YValueBuffor = 0;

YValueInput.addEventListener('input', function(event) {
    let typedText = mustBeNumber(YValueInput.value.split(''));
    let value = converToInt(typedText);
    YValueInput.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        YValueInput.value = YValueInput.value.slice(0, -1);
        return;
    }

    // Go back to previous value after delete of number
    if (YInputLength > typedText.length) {
        let bufforASubtract = Number(value * goodsData[1].Cost_A);
        let bufforBSubtract = Number(value * goodsData[1].Cost_B);
        let bufforCSubtract = Number(value * goodsData[1].Cost_C);
        let bufforDSubtract = Number(value * goodsData[1].Cost_D);

        let bufforAAddition = Number(YValueBuffor * goodsData[1].Cost_A);
        let bufforBAddition = Number(YValueBuffor * goodsData[1].Cost_B);
        let bufforCAddition = Number(YValueBuffor * goodsData[1].Cost_C);
        let bufforDAddition = Number(YValueBuffor * goodsData[1].Cost_D);

        let bufforA = Number(playersData[player].Resource_A - bufforASubtract + bufforAAddition);
        let bufforB = Number(playersData[player].Resource_B - bufforBSubtract + bufforBAddition);
        let bufforC = Number(playersData[player].Resource_C - bufforCSubtract + bufforCAddition);
        let bufforD = Number(playersData[player].Resource_D - bufforDSubtract + bufforDAddition);
        YValueBuffor = value;

        playerA.innerHTML = `${bufforA}`;
        playerB.innerHTML = `${bufforB}`;
        playerC.innerHTML = `${bufforC}`;
        playerD.innerHTML = `${bufforD}`;

        playersData[player].Resource_A = bufforA;
        playersData[player].Resource_B = bufforB;
        playersData[player].Resource_C = bufforC;
        playersData[player].Resource_D = bufforD;
        playersData[player].Good_Y = value;

        YInputLength--;
        
        // Broadcast
        adminChannel.postMessage({message: "Update", player: player, product: goodsData[1].Name, value: value});
        sessionStorage.setItem('Y', value);

        // Erease error
        let ANegativeValue = bufforA < 0 ? true : false;
        let BNegativeValue = bufforB < 0 ? true : false;
        let CNegativeValue = bufforC < 0 ? true : false;
        let DNegativeValue = bufforD < 0 ? true : false;
    
        if (!ANegativeValue && !BNegativeValue && !CNegativeValue && !DNegativeValue) {
            resourcesNegativeError = false;
            negativeResources.style.display = 'none';
        }
        return;
    }

    // Dont let execute program for empty string
    if (typedText.length == 0) {
        return;
    }

    // Convert text to int and use it to calculate resources and money
    let ASubtract = Number(value * goodsData[1].Cost_A);
    let BSubtract = Number(value * goodsData[1].Cost_B);
    let CSubtract = Number(value * goodsData[1].Cost_C);
    let DSubtract = Number(value * goodsData[1].Cost_D);

    let AAddition = Number(YValueBuffor * goodsData[1].Cost_A);
    let BAddition = Number(YValueBuffor * goodsData[1].Cost_B);
    let CAddition = Number(YValueBuffor * goodsData[1].Cost_C);
    let DAddition = Number(YValueBuffor * goodsData[1].Cost_D);
    
    let AAmount = Number(playersData[player].Resource_A - ASubtract + AAddition);
    let BAmount = Number(playersData[player].Resource_B - BSubtract + BAddition);
    let CAmount = Number(playersData[player].Resource_C - CSubtract + CAddition);
    let DAmount = Number(playersData[player].Resource_D - DSubtract + DAddition);

    YValueBuffor = value;
    YInputLength++;

    playerA.innerHTML = `${AAmount}`;
    playerB.innerHTML = `${BAmount}`;
    playerC.innerHTML = `${CAmount}`;
    playerD.innerHTML = `${DAmount}`;
    
    playersData[player].Resource_A = AAmount;
    playersData[player].Resource_B = BAmount;
    playersData[player].Resource_C = CAmount;
    playersData[player].Resource_D = DAmount;
    playersData[player].Good_Y = value;

    // Broadcast
    adminChannel.postMessage({message: "Update", player: player, product: goodsData[1].Name, value: value});
    sessionStorage.setItem('Y', value);

    // Check for errors
    let ANegativeValue = AAmount < 0 ? true : false;
    let BNegativeValue = BAmount < 0 ? true : false;
    let CNegativeValue = CAmount < 0 ? true : false;
    let DNegativeValue = DAmount < 0 ? true : false;

    if (ANegativeValue || BNegativeValue || CNegativeValue || DNegativeValue) {
        resourcesNegativeError = true;
        negativeResources.style.display = 'block';
    }
});

// Z good input handler
let ZInputLength = 0;
let ZValueBuffor = 0;

ZValueInput.addEventListener('input', function(event) {
    let typedText = mustBeNumber(ZValueInput.value.split(''));
    let value = converToInt(typedText);
    ZValueInput.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        ZValueInput.value = ZValueInput.value.slice(0, -1);
        return;
    }

    // Go back to previous value after delete of number
    if (ZInputLength > typedText.length) {
        let bufforASubtract = Number(value * goodsData[2].Cost_A);
        let bufforBSubtract = Number(value * goodsData[2].Cost_B);
        let bufforCSubtract = Number(value * goodsData[2].Cost_C);
        let bufforDSubtract = Number(value * goodsData[2].Cost_D);

        let bufforAAddition = Number(ZValueBuffor * goodsData[2].Cost_A);
        let bufforBAddition = Number(ZValueBuffor * goodsData[2].Cost_B);
        let bufforCAddition = Number(ZValueBuffor * goodsData[2].Cost_C);
        let bufforDAddition = Number(ZValueBuffor * goodsData[2].Cost_D);

        let bufforA = Number(playersData[player].Resource_A - bufforASubtract + bufforAAddition);
        let bufforB = Number(playersData[player].Resource_B - bufforBSubtract + bufforBAddition);
        let bufforC = Number(playersData[player].Resource_C - bufforCSubtract + bufforCAddition);
        let bufforD = Number(playersData[player].Resource_D - bufforDSubtract + bufforDAddition);
        ZValueBuffor = value;

        playerA.innerHTML = `${bufforA}`;
        playerB.innerHTML = `${bufforB}`;
        playerC.innerHTML = `${bufforC}`;
        playerD.innerHTML = `${bufforD}`;

        playersData[player].Resource_A = bufforA;
        playersData[player].Resource_B = bufforB;
        playersData[player].Resource_C = bufforC;
        playersData[player].Resource_D = bufforD;
        playersData[player].Good_Z = value;

        ZInputLength--;

        // Broadcast
        adminChannel.postMessage({message: "Update", player: player, product: goodsData[2].Name, value: value});
        sessionStorage.setItem('Z', value);

        // Erease error
        let ANegativeValue = bufforA < 0 ? true : false;
        let BNegativeValue = bufforB < 0 ? true : false;
        let CNegativeValue = bufforC < 0 ? true : false;
        let DNegativeValue = bufforD < 0 ? true : false;
    
        if (!ANegativeValue && !BNegativeValue && !CNegativeValue && !DNegativeValue) {
            resourcesNegativeError = false;
            negativeResources.style.display = 'none';
        }
        return;
    }

    // Dont let execute program for empty string
    if (typedText.length == 0) {
        return;
    }

    // Convert text to int and use it to calculate resources and money
    let ASubtract = Number(value * goodsData[2].Cost_A);
    let BSubtract = Number(value * goodsData[2].Cost_B);
    let CSubtract = Number(value * goodsData[2].Cost_C);
    let DSubtract = Number(value * goodsData[2].Cost_D);

    let AAddition = Number(ZValueBuffor * goodsData[2].Cost_A);
    let BAddition = Number(ZValueBuffor * goodsData[2].Cost_B);
    let CAddition = Number(ZValueBuffor * goodsData[2].Cost_C);
    let DAddition = Number(ZValueBuffor * goodsData[2].Cost_D);
    
    let AAmount = Number(playersData[player].Resource_A - ASubtract + AAddition);
    let BAmount = Number(playersData[player].Resource_B - BSubtract + BAddition);
    let CAmount = Number(playersData[player].Resource_C - CSubtract + CAddition);
    let DAmount = Number(playersData[player].Resource_D - DSubtract + DAddition);

    ZValueBuffor = value;
    ZInputLength++;

    playerA.innerHTML = `${AAmount}`;
    playerB.innerHTML = `${BAmount}`;
    playerC.innerHTML = `${CAmount}`;
    playerD.innerHTML = `${DAmount}`;
    
    playersData[player].Resource_A = AAmount;
    playersData[player].Resource_B = BAmount;
    playersData[player].Resource_C = CAmount;
    playersData[player].Resource_D = DAmount;
    playersData[player].Good_Z = value;

    // Broadcast
    adminChannel.postMessage({message: "Update", player: player, product: goodsData[2].Name, value: value});
    sessionStorage.setItem('Z', value);

    // Check for errors
    let ANegativeValue = AAmount < 0 ? true : false;
    let BNegativeValue = BAmount < 0 ? true : false;
    let CNegativeValue = CAmount < 0 ? true : false;
    let DNegativeValue = DAmount < 0 ? true : false;

    if (ANegativeValue || BNegativeValue || CNegativeValue || DNegativeValue) {
        resourcesNegativeError = true;
        negativeResources.style.display = 'block';
    }
});

// Submit
let submitButton = document.getElementById('submit');

submitButton.addEventListener('click', function(event) {
    // Check for error
    if (resourcesNegativeError) {
        return;
    }

    adminChannel.postMessage({message: "Ready", player: player});

    XValueInput.disabled = true;
    YValueInput.disabled = true;
    ZValueInput.disabled = true;

    // Set storage
    sessionStorage.setItem("Done", true);
    sessionStorage.setItem("X", XValueInput.value);
    sessionStorage.setItem("Y", YValueInput.value);
    sessionStorage.setItem("C", ZValueInput.value);

    // Update resources
    xhr.open("POST", "../../Includes/UpdateResources.php", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ playersData: playersData, player: player }));

    // Update products
    xhr.open("POST", "../../Includes/UpdateProducts.php", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ playersData: playersData, player: player }));     
});

// Reset
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', (event) => {
    // Enable inputs
    XValueInput.disabled = false;
    YValueInput.disabled = false;
    ZValueInput.disabled = false;

    // Reset form
    if (sessionStorage.getItem("Done") != null) {
        sessionStorage.removeItem("Done");
    }
    resetForm(Number(XValueInput.value), Number(YValueInput.value), Number(ZValueInput.value), true);
    
    // Reset inputs
    XValueInput.value = "";
    YValueInput.value = "";
    ZValueInput.value = "";

    // Reset buffors
    XInputLenght = 0;
    XValueBuffor = 0;
    YInputLenght = 0;
    YValueBuffor = 0;
    ZInputLenght = 0;
    ZValueBuffor = 0;
});


// Channels listeners
adminChannel.addEventListener('message', (event) => {
    if(event.data === "GoToStockMarket") {
        // Generate token and switch pages
        xhr.open("POST", "../../Includes/GenerateToken.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`player=${player}`);
        
        let respone = JSON.parse(xhr.responseText)
        window.location.href = `http://localhost/User/StockMarket/StockMarket.php?player=${player}&token=${respone.token}`;
    }
});