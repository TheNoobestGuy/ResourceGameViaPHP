// Channel
const adminChannel = new BroadcastChannel('resource_game_admin');
const usersChannel = new BroadcastChannel('resource_game_users');
const xhr = new XMLHttpRequest();

// Player
const playerMoney = document.getElementById('playerMoney');
const playerA = document.getElementById('playerA')
const playerB = document.getElementById('playerB')
const playerC = document.getElementById('playerC')
const playerD = document.getElementById('playerD')

// Inputs
const AValueInput = document.getElementById('AValue')
const BValueInput = document.getElementById('BValue')
const CValueInput = document.getElementById('CValue')
const DValueInput = document.getElementById('DValue')
const inputLimit = 9999;

// Errors
const errorNegativeMoney = document.getElementById('errorNegativeMoney');
let moneyIsNegative = false;

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

// A resource input
let AInputLenght = 0;
let AInputBuffor = 0;

AValueInput.addEventListener('input', function(event) {
    let typedText = mustBeNumber(AValueInput.value.split(''));
    let value = converToInt(typedText);
    AValueInput.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        AValueInput.value = AValueInput.value.slice(0, -1);
        return;
    }
    
    // Go back to previous value
    if (AInputLenght > typedText.length) {
        let moneyEquation = AInputBuffor - value;
        let moneyAddition = Number(moneyEquation * resourcesData[0].Cost)
        let moneyResult = Number(playersData[player].Money + moneyAddition);
        
        playerMoney.innerHTML = `${moneyResult}$`;
        playersData[player].Money = moneyResult;

        let AAmount = Number(playersData[player].Resource_A - AInputBuffor + value);
        playerA.innerHTML = `${AAmount}`;
        playersData[player].Resource_A = AAmount;

        AInputBuffor = value;
        AInputLenght--;
        
        // Broadcast
        adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[0].Name, value: AAmount});

        // Remove money error
        if (moneyResult >= 0) {
            moneyIsNegative = false;
            errorNegativeMoney.style.display = 'none';
        }
        return;
    }

    // Dont let execute program for empty string
    if (typedText.length == 0) {
        return;
    }

    // Convert text to int and use it to calculate resources and money
    let moneySubtract = Number(value * resourcesData[0].Cost);
    let moneyAddition = Number(AInputBuffor * resourcesData[0].Cost);
    let moneyResult = Number(playersData[player].Money - moneySubtract + moneyAddition);
    let AAmount = Number(playersData[player].Resource_A - AInputBuffor + value);

    playerMoney.innerHTML = `${moneyResult}$`;
    playerA.innerHTML = `${AAmount}`;

    playersData[player].Money = moneyResult;
    playersData[player].Resource_A = AAmount;

    AInputBuffor = value;
    AInputLenght++;

    // Broadcast
    adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[0].Name, value: AAmount});
    
    // Check for negative money error
    if (moneyResult < 0) {
        moneyIsNegative = true;
        errorNegativeMoney.style.display = 'block';
    } 
});

// B resource input
let BInputLenght = 0;
let BInputBuffor = 0;

BValueInput.addEventListener('input', function(event) {
    let typedText = mustBeNumber(BValueInput.value.split(''));
    let value = converToInt(typedText);
    BValueInput.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        BValueInput.value = BValueInput.value.slice(0, -1);
        return;
    }

    // Go back to previous value
    if (BInputLenght > typedText.length) {
        let moneyEquation = BInputBuffor - value;
        let moneyAddition = Number(moneyEquation * resourcesData[1].Cost)
        let moneyResult = Number(playersData[player].Money + moneyAddition);

        playerMoney.innerHTML = `${moneyResult}$`;
        playersData[player].Money = moneyResult;
        
        let BAmount = Number(playersData[player].Resource_B - BInputBuffor + value);
        playerB.innerHTML = `${BAmount}`;
        playersData[player].Resource_B = BAmount;

        BInputBuffor = value;
        BInputLenght--;

        // Broadcast
        adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[1].Name, value: BAmount});

        // Remove money error
        if (moneyResult >= 0) {
            moneyIsNegative = false;
            errorNegativeMoney.style.display = 'none';
        }
        return;
    }

    // Dont let execute program for empty string
    if (typedText.length == 0) {
        return;
    }

    // Convert text to int and use it to calculate resources and money
    let moneySubtract = Number(value * resourcesData[1].Cost);
    let moneyAddition = Number(BInputBuffor * resourcesData[1].Cost);
    let moneyResult = Number(playersData[player].Money - moneySubtract + moneyAddition);
    let BAmount = Number(playersData[player].Resource_B - BInputBuffor + value);

    playerMoney.innerHTML = `${moneyResult}$`;
    playerB.innerHTML = `${BAmount}`;

    playersData[player].Money = moneyResult;
    playersData[player].Resource_B = BAmount;

    BInputBuffor = value;
    BInputLenght++;

    // Broadcast
    adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[1].Name, value: BAmount});

    // Check for negative money error
    if (moneyResult < 0) {
        moneyIsNegative = true;
        errorNegativeMoney.style.display = 'block';
    } 
});

// C resource input
let CInputLenght = 0;
let CInputBuffor = 0;

CValueInput.addEventListener('input', function(event) {
    let typedText = mustBeNumber(CValueInput.value.split(''));
    let value = converToInt(typedText);
    CValueInput.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        CValueInput.value = CValueInput.value.slice(0, -1);
        return;
    }

    // Go back to previous value
    if (CInputLenght > typedText.length) {
        let moneyEquation = CInputBuffor - value;
        let moneyAddition = Number(moneyEquation * resourcesData[2].Cost)
        let moneyResult = Number(playersData[player].Money + moneyAddition);

        playerMoney.innerHTML = `${moneyResult}$`;
        playersData[player].Money = moneyResult;
        
        let CAmount = Number(playersData[player].Resource_C - CInputBuffor + value);
        playerC.innerHTML = `${CAmount}`;
        playersData[player].Resource_C = CAmount;

        CInputBuffor = value;
        CInputLenght--;

        // Broadcast
        adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[2].Name, value: CAmount});

        // Remove money error
        if (moneyResult >= 0) {
            moneyIsNegative = false;
            errorNegativeMoney.style.display = 'none';
        }
        return;
    }

    // Dont let execute program for empty string
    if (typedText.length == 0) {
        return;
    }

    // Convert text to int and use it to calculate resources and money
    let moneySubtract = Number(value * resourcesData[2].Cost);
    let moneyAddition = Number(CInputBuffor * resourcesData[2].Cost);
    let moneyResult = Number(playersData[player].Money - moneySubtract + moneyAddition);
    let CAmount = Number(playersData[player].Resource_C - CInputBuffor + value);

    playerMoney.innerHTML = `${moneyResult}$`;
    playerC.innerHTML = `${CAmount}`;

    playersData[player].Money = moneyResult;
    playersData[player].Resource_C = CAmount;

    CInputBuffor = value;
    CInputLenght++;

    // Broadcast
    adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[2].Name, value: CAmount});

    // Check for negative money error
    if (moneyResult < 0) {
        moneyIsNegative = true;
        errorNegativeMoney.style.display = 'block';
    } 
});

// D resource input
let DInputLenght = 0;
let DInputBuffor = 0;

DValueInput.addEventListener('input', function(event) {
    let typedText = mustBeNumber(DValueInput.value.split(''));
    let value = converToInt(typedText);
    DValueInput.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        DValueInput.value = DValueInput.value.slice(0, -1);
        return;
    }

    // Go back to previous value
    if (DInputLenght > typedText.length) {
        let moneyEquation = DInputBuffor - value;
        let moneyAddition = Number(moneyEquation * resourcesData[3].Cost)
        let moneyResult = Number(playersData[player].Money + moneyAddition);

        playerMoney.innerHTML = `${moneyResult}$`;
        playersData[player].Money = moneyResult;
        
        let DAmount = Number(playersData[player].Resource_D - DInputBuffor + value);
        playerD.innerHTML = `${DAmount}`;
        playersData[player].Resource_D = DAmount;

        DInputBuffor = value;
        DInputLenght--;
        
        // Broadcast
        adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[3].Name, value: DAmount});

        // Remove money error
        if (moneyResult >= 0) {
            moneyIsNegative = false;
            errorNegativeMoney.style.display = 'none';
        }
        return;
    }

    // Dont let execute program for empty string
    if (typedText.length == 0) {
        return;
    }

    // Convert text to int and use it to calculate resources and money
    let moneySubtract = Number(value * resourcesData[3].Cost);
    let moneyAddition = Number(DInputBuffor * resourcesData[3].Cost);
    let moneyResult = Number(playersData[player].Money - moneySubtract + moneyAddition);
    let DAmount = Number(playersData[player].Resource_D - DInputBuffor + value);

    playerMoney.innerHTML = `${moneyResult}$`;
    playerD.innerHTML = `${DAmount}`;

    playersData[player].Money = moneyResult;
    playersData[player].Resource_D = DAmount;

    DInputBuffor = value;
    DInputLenght++;

    // Broadcast
    adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[3].Name, value: DAmount});
    
    // Check for negative money error
    if (moneyResult < 0) {
        moneyIsNegative = true;
        errorNegativeMoney.style.display = 'block';
    } 
});

// Change player on click of submit
let submitButton = document.getElementById('submit');

submitButton.addEventListener('click', function(event) {
    // Check for error
    if (moneyIsNegative) {
        return;
    }

    adminChannel.postMessage({message: "Ready", player: player});

    AValueInput.disabled = true;
    BValueInput.disabled = true;
    DValueInput.disabled = true;
    CValueInput.disabled = true;
});

// Channels listeners
adminChannel.addEventListener('message', (event) => {
    if(event.data === "GoToGoodsMarket") {
        // Update resources
        xhr.open("POST", "../../Includes/UpdateResources.php", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({ playersData: playersData}));
        
        // Generate token and switch pages
        xhr.open("POST", "../../Includes/GenerateToken.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`player=${player}`);
        
        let respone = JSON.parse(xhr.responseText)
        window.location.href = `http://localhost/User/GoodsMarket/GoodsMarket.php?player=${player}&token=${respone.token}`;
    }
});