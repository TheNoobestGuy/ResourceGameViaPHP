// Reload page after switch and update tabel
if (sessionStorage.getItem('redirected')) {
    location.reload();
    sessionStorage.removeItem('redirected');
}

// Update table
let resourcesTable = document.getElementById('resourcesTable');

for (let i = 0; i < playersAmount; i++) {
    resourcesTable.innerHTML += `
        <tr>
            <td>${playersData[i].ID}</td>
            <td>${playersData[i].Wood}</td>
            <td>${playersData[i].Stone}</td>
            <td>${playersData[i].Metal}</td>
            <td>${playersData[i].Money}$</td>
        </tr>`
};

// Handle click of submit
let submitButton = document.getElementById('submit');

submitButton.addEventListener('click', function(event) {
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
    if (roundsAmount < 5) {
        window.location.href = `http://localhost/Resources/Resources.php?players=${playersAmount}&round=${++roundsAmount}`;
        sessionStorage.setItem('redirected', 'true');
    }
    else {
        window.location.href = `http://localhost/EndGame/EndGame.php?players=${playersAmount}`;
        sessionStorage.setItem('redirected', 'true');
    }
});

