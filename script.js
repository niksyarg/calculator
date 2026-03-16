const display = document.getElementById('display');
const slider = document.getElementById('theme-slider');
let currentInput = '0';
slider.addEventListener('input', (e) => {
    const val = e.target.value;
    document.documentElement.setAttribute('data-theme', val);
});
function updateDisplay() {
    display.innerText = currentInput.replace(/\*/g, 'x');
}
function pressNum(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        const parts = currentInput.split(/[\+\-\*\/]/);
        if (num === '.' && parts[parts.length - 1].includes('.')) return;
        currentInput += num;
    }
    updateDisplay();
}
function pressOp(op) {
    const lastChar = currentInput.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    updateDisplay();
}
function del() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateDisplay();
}
function reset() {
    currentInput = '0';
    updateDisplay();
}
function calc() {
    try {
        let result = eval(currentInput);
        currentInput = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(8)).toString();
        updateDisplay();
    } catch (e) {
        display.innerText = 'Error';
        setTimeout(reset, 1000);
    }
}
