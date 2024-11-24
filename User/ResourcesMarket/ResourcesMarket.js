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

// Reset values
let reset = false;
let A = 0;
let B = 0;
let C = 0;
let D = 0;

function resetForm(A, B, C, D, undo) {
    if (undo) {
        // Reset resources
        playersData[player].Resource_A -= Number(A);
        playersData[player].Resource_B -= Number(B);
        playersData[player].Resource_C -= Number(C);
        playersData[player].Resource_D -= Number(D);
    

        // Reset money
        const Abuffor =  A * Number(resourcesData[0].Cost);
        const Bbuffor =  B * Number(resourcesData[1].Cost); 
        const Cbuffor =  C * Number(resourcesData[2].Cost);
        const Dbuffor =  D * Number(resourcesData[3].Cost);
        playersData[player].Money = Number(Number(playersData[player].Money) + Abuffor + Bbuffor + Cbuffor + Dbuffor);
    

        // Reset layout
        playerA.innerHTML = `${playersData[player].Resource_A}`;
        playerB.innerHTML = `${playersData[player].Resource_B}`;
        playerC.innerHTML = `${playersData[player].Resource_C}`;
        playerD.innerHTML = `${playersData[player].Resource_D}`;
        playerMoney.innerHTML = `${playersData[player].Money}$`;

        // Update database
        xhr.open("POST", "../../Includes/UpdateResources.php", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({ playersData: playersData, player: player }));
    }

    // Update resources
    adminChannel.postMessage({message: "NotReady", player: player});
    adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[0].Name, value: playersData[player].Resource_A});
    adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[1].Name, value: playersData[player].Resource_B});
    adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[2].Name, value: playersData[player].Resource_C});
    adminChannel.postMessage({message: "Update", player: player, resource: resourcesData[3].Name, value: playersData[player].Resource_D}); 
}

if (sessionStorage.getItem("A") != null) {
    A = Number(sessionStorage.getItem("A"))
    sessionStorage.removeItem("A");
    reset = true;
}
if (sessionStorage.getItem("B") != null) {
    B = Number(sessionStorage.getItem("B"));
    sessionStorage.removeItem("B");
    reset = true;
}
if (sessionStorage.getItem("C") != null) {
    C = Number(sessionStorage.getItem("C"));
    sessionStorage.removeItem("C");
    reset = true;
}
if (sessionStorage.getItem("D") != null) {
    D = Number(sessionStorage.getItem("D"));
    sessionStorage.removeItem("D");
    reset = true;
}

if(reset) {
    if (sessionStorage.getItem("Done") != null) {
        resetForm(A, B, C, D, true);
        sessionStorage.clear();
    }
    else {
        resetForm(A, B, C, D, false);
    }
    reset = false;
}

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
        sessionStorage.setItem("A", value);

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
    sessionStorage.setItem("A", value);

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
        sessionStorage.setItem("B", value);

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
    sessionStorage.setItem("B", value);

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
        sessionStorage.setItem("C", value);

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
    sessionStorage.setItem("C", value);

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
        sessionStorage.setItem("C", value);

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
    sessionStorage.setItem("C", value);

    // Check for negative money error
    if (moneyResult < 0) {
        moneyIsNegative = true;
        errorNegativeMoney.style.display = 'block';
    } 
});

// Submit
const submitButton = document.getElementById('submit');
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

    // Set storage
    sessionStorage.setItem("Done", true);
    sessionStorage.setItem("A", AValueInput.value);
    sessionStorage.setItem("B", BValueInput.value);
    sessionStorage.setItem("C", CValueInput.value);
    sessionStorage.setItem("D", DValueInput.value);

    // Update resources
    xhr.open("POST", "../../Includes/UpdateResources.php", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ playersData: playersData, player: player }));
});

// Reset
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', (event) => {
    // Enable inputs
    AValueInput.disabled = false;
    BValueInput.disabled = false;
    DValueInput.disabled = false;
    CValueInput.disabled = false;

    // Reset form
    if (sessionStorage.getItem("Done") != null) {
        sessionStorage.removeItem("Done");
    }
    resetForm(Number(AValueInput.value), Number(BValueInput.value), Number(CValueInput.value), Number(DValueInput.value), true);
    
    // Reset inputs
    AValueInput.value = "";
    BValueInput.value = "";
    CValueInput.value = "";
    DValueInput.value = "";

    // Reset buffors
    AInputLenght = 0;
    AInputBuffor = 0;
    BInputLenght = 0;
    BInputBuffor = 0;
    CInputLenght = 0;
    CInputBuffor = 0;
    DInputLenght = 0;
    DInputBuffor = 0;
});

// Channels listeners
adminChannel.addEventListener('message', (event) => {
    if(event.data === "GoToGoodsMarket") {
        // Generate token and switch pages
        xhr.open("POST", "../../Includes/GenerateToken.php", false);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`player=${player}`);
        
        let respone = JSON.parse(xhr.responseText)
        window.location.href = `http://localhost/User/GoodsMarket/GoodsMarket.php?player=${player}&token=${respone.token}`;
    }
});