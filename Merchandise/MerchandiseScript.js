// Reload page after switch
if (sessionStorage.getItem('redirected')) {
    location.reload();
    sessionStorage.removeItem('redirected');
}
console.log(playersAmount);
// Player
let player = 0;
let playerName = document.getElementById('playerName');
let playerWood = document.getElementById('playerWood');
let playerStone = document.getElementById('playerStone');
let playerMetal = document.getElementById('playerMetal');

// Inputs
let woodenTableValueInput = document.getElementById('woodenTableValue');
let marbleTableValueInput = document.getElementById('marbleTableValue');
let chandelierValueInput = document.getElementById('chandelierValue');
let inputLimit = 9999;

// Error
let negativeResources = document.getElementById('negativeResources');
let resourcesNegativeError = false;

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

// Wooden table input handler
let woodenTableInputLength = 0;
let woodenTableValueBuffor = 0;

woodenTableValueInput.addEventListener('input', function(event) {
    let typedText = mustBeNumber(woodenTableValueInput.value.split(''));
    let value = converToInt(typedText);
    woodenTableValueInput.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        woodenTableValueInput.value = woodenTableValueInput.value.slice(0, -1);
        return;
    }

    // Go back to previous value after delete of number
    if (woodenTableInputLength > typedText.length) {
        let bufforWoodSubtract = Number(value * goodsData[0].WoodCost);
        let bufforStoneSubtract = Number(value * goodsData[0].StoneCost);
        let bufforMetalSubtract = Number(value * goodsData[0].MetalCost);

        let bufforWoodAddition = Number(woodenTableValueBuffor * goodsData[0].WoodCost);
        let bufforStoneAddition = Number(woodenTableValueBuffor * goodsData[0].StoneCost);
        let bufforMetalAddition = Number(woodenTableValueBuffor * goodsData[0].MetalCost);

        let bufforWood = Number(playersData[player].Wood - bufforWoodSubtract + bufforWoodAddition);
        let bufforStone = Number(playersData[player].Stone - bufforStoneSubtract + bufforStoneAddition);
        let bufforMetal = Number(playersData[player].Metal - bufforMetalSubtract + bufforMetalAddition);
        woodenTableValueBuffor = value;

        playerWood.innerHTML = `${bufforWood}`;
        playerStone.innerHTML = `${bufforStone}`;
        playerMetal.innerHTML = `${bufforMetal}`;

        playersData[player].Wood = bufforWood;
        playersData[player].Stone = bufforStone;
        playersData[player].Metal = bufforMetal;
        playersData[player].WoodenTable = value;

        woodenTableInputLength--;

        // Erease error
        let woodNegativeValue = bufforWood < 0 ? true : false;
        let stoneNegativeValue = bufforStone < 0 ? true : false;
        let metalNegativeValue = bufforMetal < 0 ? true : false;
    
        if (!woodNegativeValue && !stoneNegativeValue && !metalNegativeValue) {
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
    let woodSubtract = Number(value * goodsData[0].WoodCost);
    let stoneSubtract = Number(value * goodsData[0].StoneCost);
    let metalSubtract = Number(value * goodsData[0].MetalCost);

    let woodAddition = Number(woodenTableValueBuffor * goodsData[0].WoodCost);
    let stoneAddition = Number(woodenTableValueBuffor * goodsData[0].StoneCost);
    let metalAddition = Number(woodenTableValueBuffor * goodsData[0].MetalCost);
    
    let woodAmount = Number(playersData[player].Wood - woodSubtract + woodAddition);
    let stoneAmount = Number(playersData[player].Stone - stoneSubtract + stoneAddition);
    let metalAmount = Number(playersData[player].Metal - metalSubtract + metalAddition);

    woodenTableValueBuffor = value;
    woodenTableInputLength++;

    playerWood.innerHTML = `${woodAmount}`;
    playerStone.innerHTML = `${stoneAmount}`;
    playerMetal.innerHTML = `${metalAmount}`;
    
    playersData[player].Wood = woodAmount;
    playersData[player].Stone = stoneAmount;
    playersData[player].Metal = metalAmount;
    playersData[player].WoodenTable = value;

    // Check for errors
    let woodNegativeValue = woodAmount < 0 ? true : false;
    let stoneNegativeValue = stoneAmount < 0 ? true : false;
    let metalNegativeValue = metalAmount < 0 ? true : false;

    if (woodNegativeValue || stoneNegativeValue || metalNegativeValue) {
        resourcesNegativeError = false;
        negativeResources.style.display = 'block';
    }
});

// Marble table input handler
let marbleTableInputLength = 0;
let marbleTableValueBuffor = 0;

marbleTableValueInput.addEventListener('input', function(event) {
    let typedText = mustBeNumber(marbleTableValueInput.value.split(''));
    let value = converToInt(typedText);
    marbleTableValueInput.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        marbleTableValueInput.value = marbleTableValueInput.value.slice(0, -1);
        return;
    }

    // Go back to previous value after delete of number
    if (marbleTableInputLength > typedText.length) {
        let bufforWoodSubtract = Number(value * goodsData[1].WoodCost);
        let bufforStoneSubtract = Number(value * goodsData[1].StoneCost);
        let bufforMetalSubtract = Number(value * goodsData[1].MetalCost);

        let bufforWoodAddition = Number(marbleTableValueBuffor * goodsData[1].WoodCost);
        let bufforStoneAddition = Number(marbleTableValueBuffor * goodsData[1].StoneCost);
        let bufforMetalAddition = Number(marbleTableValueBuffor * goodsData[1].MetalCost);

        let bufforWood = Number(playersData[player].Wood - bufforWoodSubtract + bufforWoodAddition);
        let bufforStone = Number(playersData[player].Stone - bufforStoneSubtract + bufforStoneAddition);
        let bufforMetal = Number(playersData[player].Metal - bufforMetalSubtract + bufforMetalAddition);
        marbleTableValueBuffor = value;

        playerWood.innerHTML = `${bufforWood}`;
        playerStone.innerHTML = `${bufforStone}`;
        playerMetal.innerHTML = `${bufforMetal}`;

        playersData[player].Wood = bufforWood;
        playersData[player].Stone = bufforStone;
        playersData[player].Metal = bufforMetal;
        playersData[player].MarbleTable = value;

        marbleTableInputLength--;

        // Erease error
        let woodNegativeValue = bufforWood < 0 ? true : false;
        let stoneNegativeValue = bufforStone < 0 ? true : false;
        let metalNegativeValue = bufforMetal < 0 ? true : false;
    
        if (!woodNegativeValue && !stoneNegativeValue && !metalNegativeValue) {
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
    let woodSubtract = Number(value * goodsData[1].WoodCost);
    let stoneSubtract = Number(value * goodsData[1].StoneCost);
    let metalSubtract = Number(value * goodsData[1].MetalCost);

    let woodAddition = Number(marbleTableValueBuffor * goodsData[1].WoodCost);
    let stoneAddition = Number(marbleTableValueBuffor * goodsData[1].StoneCost);
    let metalAddition = Number(marbleTableValueBuffor * goodsData[1].MetalCost);

    let woodAmount = Number(playersData[player].Wood - woodSubtract + woodAddition);
    let stoneAmount = Number(playersData[player].Stone - stoneSubtract + stoneAddition);
    let metalAmount = Number(playersData[player].Metal - metalSubtract + metalAddition);

    marbleTableValueBuffor = value;
    marbleTableInputLength++;
    
    playerWood.innerHTML = `${woodAmount}`;
    playerStone.innerHTML = `${stoneAmount}`;
    playerMetal.innerHTML = `${metalAmount}`;
    
    playersData[player].Wood = woodAmount;
    playersData[player].Stone = stoneAmount;
    playersData[player].Metal = metalAmount;

    playersData[player].MarbleTable = value;

    // Check for error
    let woodNegativeValue = woodAmount < 0 ? true : false;
    let stoneNegativeValue = stoneAmount < 0 ? true : false;
    let metalNegativeValue = metalAmount < 0 ? true : false;

    if (woodNegativeValue || stoneNegativeValue || metalNegativeValue) {
        resourcesNegativeError = false;
        negativeResources.style.display = 'block';
    }
});

// Chandelier input handler
let chandelierInputLength = 0;
let chandelierValueBuffor = 0;

chandelierValueInput.addEventListener('input', function(event) {
    let typedText = mustBeNumber(chandelierValueInput.value.split(''));
    let value = converToInt(typedText);
    chandelierValueInput.value = createString(typedText);

    // Stop from typing more than limit
    if (value > inputLimit) {
        chandelierValueInput.value = chandelierValueInput.value.slice(0, -1);
        return;
    }

    // Go back to previous value after delete of number
    if (chandelierInputLength > typedText.length) {
        let bufforWoodSubtract = Number(value * goodsData[2].WoodCost);
        let bufforStoneSubtract = Number(value * goodsData[2].StoneCost);
        let bufforMetalSubtract = Number(value * goodsData[2].MetalCost);

        let bufforWoodAddition = Number(chandelierValueBuffor * goodsData[2].WoodCost);
        let bufforStoneAddition = Number(chandelierValueBuffor * goodsData[2].StoneCost);
        let bufforMetalAddition = Number(chandelierValueBuffor * goodsData[2].MetalCost);

        let bufforWood = Number(playersData[player].Wood - bufforWoodSubtract + bufforWoodAddition);
        let bufforStone = Number(playersData[player].Stone - bufforStoneSubtract + bufforStoneAddition);
        let bufforMetal = Number(playersData[player].Metal - bufforMetalSubtract + bufforMetalAddition);
        chandelierValueBuffor = value;

        playerWood.innerHTML = `${bufforWood}`;
        playerStone.innerHTML = `${bufforStone}`;
        playerMetal.innerHTML = `${bufforMetal}`;

        playersData[player].Wood = bufforWood;
        playersData[player].Stone = bufforStone;
        playersData[player].Metal = bufforMetal;
        playersData[player].Chandelier = value;

        chandelierInputLength--;

        // Erease error
        let woodNegativeValue = bufforWood < 0 ? true : false;
        let stoneNegativeValue = bufforStone < 0 ? true : false;
        let metalNegativeValue = bufforMetal < 0 ? true : false;
    
        if (!woodNegativeValue && !stoneNegativeValue && !metalNegativeValue) {
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
    let woodSubtract = Number(value * goodsData[2].WoodCost);
    let stoneSubtract = Number(value * goodsData[2].StoneCost);
    let metalSubtract = Number(value * goodsData[2].MetalCost);

    let woodAddition = Number(chandelierValueBuffor * goodsData[2].WoodCost);
    let stoneAddition = Number(chandelierValueBuffor * goodsData[2].StoneCost);
    let metalAddition = Number(chandelierValueBuffor * goodsData[2].MetalCost);

    let woodAmount = Number(playersData[player].Wood - woodSubtract + woodAddition);
    let stoneAmount = Number(playersData[player].Stone - stoneSubtract + stoneAddition);
    let metalAmount = Number(playersData[player].Metal - metalSubtract + metalAddition);

    chandelierValueBuffor = value;
    chandelierInputLength++;
    
    playerWood.innerHTML = `${woodAmount}`;
    playerStone.innerHTML = `${stoneAmount}`;
    playerMetal.innerHTML = `${metalAmount}`;
    
    playersData[player].Wood = woodAmount;
    playersData[player].Stone = stoneAmount;
    playersData[player].Metal = metalAmount;
    playersData[player].Chandelier = value;

    // Check for error
    let woodNegativeValue = woodAmount < 0 ? true : false;
    let stoneNegativeValue = stoneAmount < 0 ? true : false;
    let metalNegativeValue = metalAmount < 0 ? true : false;

    if (woodNegativeValue || stoneNegativeValue || metalNegativeValue) {
        resourcesNegativeError = false;
        negativeResources.style.display = 'block';
    }
});

// Change player on click of submit
let submitButton = document.getElementById('submit');

submitButton.addEventListener('click', function(event) {
    // Check for error
    if (resourcesNegativeError) {
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

        // Switch pages
        if (roundsAmount >= 5) {
            window.location.href = `http://localhost/EndGame/EndGame.php?players=${playersAmount}`;
        }
        else {
            window.location.href = `http://localhost/Trade/Trade.php?players=${playersAmount}&round=${roundsAmount}`;
        }
    
        sessionStorage.setItem('redirected', 'true');
        return;
    }

    // Update page
    playerName.innerHTML = `Player ${playersData[player].ID}`;
    playerWood.innerHTML = `${playersData[player].Wood}`;
    playerStone.innerHTML = `${playersData[player].Stone}`;
    playerMetal.innerHTML = `${playersData[player].Metal}`;

    // Reset error
    resourcesNegativeError = false;

    // Reset buffors
    woodenTableInputLength = 1;
    woodenTableValueBuffor = 0;

    marbleTableInputLength = 1;
    marbleTableValueBuffor = 0;

    chandelierInputLength = 1;
    chandelierValueBuffor = 0;

    // Clear inputs
    woodenTableValueInput.value = "";
    marbleTableValueInput.value = "";
    chandelierValueInput.value = "";
});
