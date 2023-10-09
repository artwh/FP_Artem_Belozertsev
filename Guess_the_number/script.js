let targetNumber;
let attempts = 0;

function startGame() {
    targetNumber = Math.floor(Math.random() * 1000) + 1;
    attempts = 0;
    guessNumber();
}

function guessNumber() {
    let userGuess = prompt("Введите число:");

    if (userGuess === null || userGuess === "") {
        alert("Введите число!");
        guessNumber();
        return;
    }

    let parsedGuess = parseInt(userGuess);

    if (isNaN(parsedGuess)) {
        alert("Введите число!");
        guessNumber();
        return;
    }

    attempts++;

    if (parsedGuess < targetNumber) {
        alert("Искомое число больше!");
        guessNumber();
    } else if (parsedGuess > targetNumber) {
        alert("Искомое число меньше!");
        guessNumber();
    } else {
        let playAgain = confirm(`Вы угадали! Количество попыток: ${attempts}. Начать заново?`);
        if (playAgain) {
            startGame();
        }
    }
}

document.getElementById("startButton").addEventListener("click", startGame);