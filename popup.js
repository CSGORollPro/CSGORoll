document.addEventListener('DOMContentLoaded', function() {
    let allowedUsernames = [];

    fetch('https://raw.githubusercontent.com/dzejlanbezs/Moja/main/allowedUsernames.json')
        .then(response => response.json())
        .then(data => {
            allowedUsernames = data.allowedUsernames;
        })
        .catch(error => {
            console.error('Error loading allowed usernames:', error);
        });

    document.getElementById('calculateButton').addEventListener('click', function() {
        console.log("Calculate button clicked");
        const xp = parseInt(document.getElementById('xp').value);
        const targetLevel = parseInt(document.getElementById('targetLevel').value);
        const username = document.getElementById('username').value;

        if (isNaN(xp) || isNaN(targetLevel) || !username) {
            alert('Please fill out all fields correctly.');
            return;
        }

        if (!allowedUsernames.includes(username)) {
            alert('You are not using referall code on roll: HIGHPOTENTIAL');
            return;
        }

        console.log(`XP: ${xp}, Target Level: ${targetLevel}, Username: ${username}`);

        const coinsWager = (targetLevel - xp) / 400;
        const diceStrategy = coinsWager * 0.06;

        console.log(`Coins Wager: ${coinsWager}, Dice Strategy: ${diceStrategy}`);

        document.getElementById('result').innerHTML = `
            <h5>Thanks ${username} for using code!</h5>
            <p class="tekst" style="display: flex; align-items: center;">Coins Wager: ‍ ‍<img src="https://i.imgur.com/NCR9cvw.png" style="vertical-align: middle;">‎‎‎‎‎‎‎‎ ${coinsWager.toFixed(2)}</p>
            <p class="tekst" style="display: flex; align-items: center;">Dice Strategy: ‍ ‍<img src="https://i.imgur.com/NCR9cvw.png" style="vertical-align: middle;">‎‎‎‎‎‎‎‎ ‍${diceStrategy.toFixed(2)}</p>
        `;
    });
});
