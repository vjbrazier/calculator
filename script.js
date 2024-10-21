let test = 2;
let test2 = 3;
let me = '*';

let numbers = document.getElementsByClassName('calc-number');
let symbols = document.getElementsByClassName('calc-button'); //separated to add spaces

var current_equation = '';

for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function(event) {
        document.getElementById('problem-textbox').innerHTML += (event.target.innerHTML);
        current_equation += (event.target.innerHTML);
    });
}
for (var i = 0; i < symbols.length; i++) {
    symbols[i].addEventListener('click', function(event) {
        document.getElementById('problem-textbox').innerHTML += (' ' + event.target.innerHTML + ' ');
        if (event.target.innerHTML != '=') {
            current_equation += (' ' + event.target.innerHTML + ' ');
        }
    });
}

if (document.getElementById('button-CE').addEventListener('click', function(event) {
    document.getElementById('problem-textbox').innerHTML = '';
    document.getElementById('answer-textbox').innerHTML = '';
    current_equation = '';
}));

function solve(equation) {
    let chunks = equation.split(' ');
    for (var i = 0; i < chunks.length; i++) {
        
        if (chunks[i] != ('+' || '-' || '*' || '/')) {
            chunks[i] = Number(chunks[i]);
        }
        
    }
    console.log(chunks);
}

if (document.getElementById('button-equals').addEventListener('click', function(event) {
    document.getElementById('problem-textbox').innerHTML = '';
    document.getElementById('answer-textbox').innerHTML = solve(current_equation);
    current_equation = '';
}));