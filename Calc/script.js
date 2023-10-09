const Calculator = (function () {

    let currentInput = "";
    let operator = "";
    let firstOperand = "";
    let isResultDisplayed = false;

    function clear() {
        currentInput = "";
        operator = "";
        firstOperand = "";
        display.value = "";
    }

    function backspace() {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }

    function appendNumber(number) {
        if (isResultDisplayed) {
            clear();
            isResultDisplayed = false;
        }
        currentInput += number;
        display.value = currentInput;
    }

    function setOperator(newOperator) {
        if (operator && currentInput !== "") {
            calculate();
        }
        operator = newOperator;
        firstOperand = currentInput;
        currentInput = "";
    }

    function calculate() {
        if (operator && firstOperand && currentInput !== "") {
            const num1 = parseFloat(firstOperand);
            const num2 = parseFloat(currentInput);
            switch (operator) {
                case "+":
                    currentInput = (num1 + num2).toString();
                    break;
                case "-":
                    currentInput = (num1 - num2).toString();
                    break;
                case "*":
                    currentInput = (num1 * num2).toString();
                    break;
                case "/":
                    if (num2 === 0) {
                        currentInput = "Error";
                    } else {
                        currentInput = (num1 / num2).toString();
                    }
                    break;
                case "^":
                    currentInput = (Math.pow(num1, num2)).toString();
                    break;
                case "√":
                    currentInput = (Math.sqrt(num1)).toString();
                    break;
            }
            display.value = currentInput;
            operator = "";
            isResultDisplayed = true;
        }
    }

    return {
        clear,
        backspace,
        appendNumber,
        setOperator,
        calculate
    };
})();

document.getElementById("clear").addEventListener("click", Calculator.clear);
document.getElementById("backspace").addEventListener("click", Calculator.backspace);
document.getElementById("add").addEventListener("click", () => Calculator.setOperator("+"));
document.getElementById("subtract").addEventListener("click", () => Calculator.setOperator("-"));
document.getElementById("multiply").addEventListener("click", () => Calculator.setOperator("*"));
document.getElementById("divide").addEventListener("click", () => Calculator.setOperator("/"));
document.getElementById("power").addEventListener("click", () => Calculator.setOperator("^"));
document.getElementById("squareRoot").addEventListener("click", () => Calculator.setOperator("√"));
document.getElementById("calculate").addEventListener("click", Calculator.calculate);

for (let i = 0; i <= 9; i++) {
    document.getElementById(i.toString()).addEventListener("click", () => Calculator.appendNumber(i.toString()));
}

document.getElementById("decimal").addEventListener("click", () => {
    if (Calculator.currentInput.indexOf(".") === -1) {
        Calculator.appendNumber(".");
    }
});
