// Reload page after switch
if (sessionStorage.getItem('redirected')) {
    location.reload();
    sessionStorage.removeItem('redirected');
}

// Player
let player = 0;
let playerName = document.getElementById('playerName');
let playerMoney = document.getElementById('playerMoney');
let playerWood = document.getElementById('playerWood')
let playerStone = document.getElementById('playerStone')
let playerMetal = document.getElementById('playerMetal')

// Inputs
let woodValueInput = document.getElementById('woodValue')
let stoneValueInput = document.getElementById('stoneValue')
let metalValueInput = document.getElementById('metalValue')
let inputLimit = 9999;

woodValueInput.addEventListener('select', function(e) {
    e.preventDefault(); // Prevent mouse down event (selection)
});

// Errors
let errorNegativeMoney = document.getElementById('errorNegativeMoney');
let moneyIsNegative = false;

// Numbers table for fruther validation of input and converter
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

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

// Wood input
let woodInputLenght = 0;
let woodMoneyInputBuffor = 0;

woodValueInput.addEventListener('input', function(event) {
    let typedText = mustBeNumber(woodValueInput.value.split(''));
    let value = converToInt(typedText);
    woodValueInput.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        woodValueInput.value = woodValueInput.value.slice(0, -1);
        return;
    }
    
    // Go back to previous value
    if (woodInputLenght > typedText.length) {
        let moneyEquation = woodMoneyInputBuffor - value;
        let moneyAddition = Number(moneyEquation * resourcesData[0].Cost)
        let moneyResult = Number(playersData[player].Money + moneyAddition);
        woodMoneyInputBuffor = value;

        playerMoney.innerHTML = `${moneyResult}$`;
        playersData[player].Money = moneyResult;
        
        playerWood.innerHTML = `${value}`;
        playersData[player].Wood = value;

        woodInputLenght--;

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
    let moneyAddition = Number(woodMoneyInputBuffor * resourcesData[0].Cost);
    let moneyResult = Number(playersData[player].Money - moneySubtract + moneyAddition);
    woodMoneyInputBuffor = value;

    woodInputLenght++;

    playerMoney.innerHTML = `${moneyResult}$`;
    playerWood.innerHTML = `${value}`;

    playersData[player].Money = moneyResult;
    playersData[player].Wood = value;

    // Check for negative money error
    if (moneyResult < 0) {
        moneyIsNegative = false;
        errorNegativeMoney.style.display = 'block';
    } 
});

// Stone input
let stoneInputLenght = 0;
let stoneMoneyInputBuffor = 0;

stoneValueInput.addEventListener('input', function(event) {
    let typedText = mustBeNumber(stoneValueInput.value.split(''));
    let value = converToInt(typedText);
    stoneValueInput.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        stoneValueInput.value = stoneValueInput.value.slice(0, -1);
        return;
    }

    // Go back to previous value
    if (stoneInputLenght > typedText.length) {
        let moneyEquation = stoneMoneyInputBuffor - value;
        let moneyAddition = Number(moneyEquation * resourcesData[0].Cost)
        let moneyResult = Number(playersData[player].Money + moneyAddition);
        stoneMoneyInputBuffor = value;

        playerMoney.innerHTML = `${moneyResult}$`;
        playersData[player].Money = moneyResult;
        
        playerStone.innerHTML = `${value}`;
        playersData[player].Stone = value;

        stoneInputLenght--;

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
    let moneyAddition = Number(stoneMoneyInputBuffor * resourcesData[0].Cost);
    let moneyResult = Number(playersData[player].Money - moneySubtract + moneyAddition);
    stoneMoneyInputBuffor = value;

    stoneInputLenght++;

    playerMoney.innerHTML = `${moneyResult}$`;
    playerStone.innerHTML = `${value}`;

    playersData[player].Money = moneyResult;
    playersData[player].Stone = value;

    // Check for negative money error
    if (moneyResult < 0) {
        moneyIsNegative = true;
        errorNegativeMoney.style.display = 'block';
    } 
});

// Metal input
let metalInputLenght = 0;
let metalMoneyInputBuffor = 0;

metalValueInput.addEventListener('input', function(event) {
    let typedText = mustBeNumber(metalValueInput.value.split(''));
    let value = converToInt(typedText);
    metalValueInput.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        metalValueInput.value = metalValueInput.value.slice(0, -1);
        return;
    }

    // Go back to previous value
    if (metalInputLenght > typedText.length) {
        let moneyEquation = metalMoneyInputBuffor - value;
        let moneyAddition = Number(moneyEquation * resourcesData[0].Cost)
        let moneyResult = Number(playersData[player].Money + moneyAddition);
        metalMoneyInputBuffor = value;

        playerMoney.innerHTML = `${moneyResult}$`;
        playersData[player].Money = moneyResult;
        
        playerMetal.innerHTML = `${value}`;
        playersData[player].Metal = value;

        metalInputLenght--;

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
    let moneyAddition = Number(metalMoneyInputBuffor * resourcesData[0].Cost);
    let moneyResult = Number(playersData[player].Money - moneySubtract + moneyAddition);
    metalMoneyInputBuffor = value;

    metalInputLenght++;

    playerMoney.innerHTML = `${moneyResult}$`;
    playerMetal.innerHTML = `${value}`;

    playersData[player].Money = moneyResult;
    playersData[player].Metal = value;

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

    // Update database and switch page
    player++;

    if (player > playersAmount-1) {
        // Convert the arrays to a JSON object and send it to PHP
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "../UpdateDatabase.php", true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Response from server:", xhr.responseText);
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({ playersData: playersData, goodsData: goodsData }));

        // Switch page
        window.location.href = `http://localhost/Merchandise/Merchandise.php?players=${playersAmount}&round=${roundsAmount}`;
        sessionStorage.setItem('redirected', 'true');
        player = 0;
        return;
    }

    // Update page
    playerName.innerHTML = `Player ${playersData[player].ID}`;
    playerMoney.innerHTML = `${playersData[player].Money}$`;
    playerWood.innerHTML = `${playersData[player].Wood}`;
    playerStone.innerHTML = `${playersData[player].Stone}`;
    playerMetal.innerHTML = `${playersData[player].Metal}`;

    // Reset error
    moneyIsNegative = false;

    // Reset variables
    woodInputLenght = 1;
    woodMoneyInputBuffor = 0;

    stoneInputLenght = 1;
    stoneMoneyInputBuffor = 0;

    metalInputLenght = 1;
    metalMoneyInputBuffor = 0;

    // Clear inputs
    woodValueInput.value = "";
    stoneValueInput.value = "";
    metalValueInput.value = "";
});