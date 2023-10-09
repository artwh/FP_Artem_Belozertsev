function isPalindrome(str) {
    str = str.toLowerCase().replace(/\s/g, '');
    var reversed = str.split('').reverse().join('');
    return str === reversed;
}

const word = prompt("Введите слово:");

if (word) {
    if (isPalindrome(word)) {
        alert("'" + word + "' палиндром!");
    } else {
        alert("'" + word + "' не палиндром!");
    }
} else {
    alert("Вы не ввели слово!");
}