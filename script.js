
let firstVal = null;
let op = "";
let secondVal = null;
let secondInput = false;
let multiOp = false;

function add(a,b){
    return +a + +b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return (b == 0) ? "ERROR" : a / b ;
}

function operate (op, a, b){
    if (op === "add"){
        return add(a,b);
    }
    else if(op === "sub"){
        return subtract(a,b);
    }
    else if (op === "mult"){
        return multiply(a,b);
    }
    else if (op == "div"){
        return divide(a,b);
    }
}

const display = document.querySelector(".display");
const numBtns = document.querySelectorAll(".num");
const opBtns = document.querySelectorAll(".op");
const equalBtn = document.querySelector("#equal");
const clrBtn = document.querySelector("#clear");
const delBtn = document.querySelector("#del");
const ptBtn = document.querySelector("#point")

document.addEventListener('keydown', function(e) {
    if (e.key === '.') {inputPoint();} 
    else if (!isNaN(e.key)){inputNumber(document.querySelector(`button[id='${e.key}']`));}
    else if ("+-*/".includes(e.key)){
        if (e.key === '+') {inputOperator(document.querySelector("#add"));}
        else if (e.key === '-') {inputOperator(document.querySelector("#sub"));}
        else if (e.key === '*') {inputOperator(document.querySelector("#mult"));}
        else {inputOperator(document.querySelector("#div"));}
    }
    else if (e.key === 'Enter'){inputEnter();}
    else if (e.key === 'Backspace'){inputDel();}
    else if (e.key === 'Escape'){inputClr();}
})

numBtns.forEach(btn => {btn.addEventListener('click', () => inputNumber(btn))})
function inputNumber(btn) {
    if (secondInput === true || display.innerHTML === "0") {
        display.innerHTML = "";
        secondInput = false;
    }
    display.innerHTML += btn.innerHTML;
}

opBtns.forEach(btn => {btn.addEventListener('click', () => inputOperator(btn))})
function inputOperator(btn) {
    if (secondInput){
        secondVal = display.innerHTML;
        display.innerHTML = operate(op, firstVal, secondVal);
    }
    firstVal = display.innerHTML;
    op = btn.id;
    secondInput = true;
}

equalBtn.addEventListener('click', () => inputEnter());
function inputEnter(){
    secondVal = display.innerHTML;
    display.innerHTML = operate(op, firstVal, secondVal);
    secondInput = false;
}

clrBtn.addEventListener('click', () => inputClr());
function inputClr(){
    firstVal = null;
    secondVal = null;
    op = "";
    display.innerHTML = "0";
}

delBtn.addEventListener('click', () => inputDel());
function inputDel(){
    if (display.innerHTML !== null){
        display.innerHTML = display.innerHTML.slice(0,-1);
    }
}

ptBtn.addEventListener('click', () => inputPoint());
function inputPoint(){
    if (display.innerHTML.lastIndexOf(".") === -1) {
        display.innerHTML += ".";
    }
}