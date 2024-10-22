//Creates two arrays, one for the numbers and one for symbols
let numbers = document.getElementsByClassName('calc-number');
let symbols = document.getElementsByClassName('calc-button'); //separated to add spaces with symbols

//Stores the equation as the user enters numbers. Starts blank
var current_equation = '';

//Adds the numbers/symbols to the problem text. Symbols need a space, hence the separation
for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function(event) {
        document.getElementById('problem-textbox').innerHTML += (event.target.innerHTML);
        current_equation += (event.target.innerHTML);
    });
}
for (var i = 0; i < symbols.length; i++) {
    symbols[i].addEventListener('click', function(event) {
        if ((event.target.innerHTML != '=') && (event.target.innerHTML != 'CE')) {
            //This if statement ensures you don't start with a symbol, and don't enter one twice
            if ((current_equation != '') && (current_equation.substring((current_equation.length-1), current_equation.length) != ' ')) { 
                document.getElementById('problem-textbox').innerHTML += (' ' + event.target.innerHTML + ' ');
                current_equation += (' ' + event.target.innerHTML + ' ');
            }    
        }
    });
}

//Opens/closes the history panel when the button is clicked
document.getElementById('button-history').addEventListener('click', function() {
    document.getElementById('history-panel').classList.toggle('visible');
});

document.getElementById('close-history').addEventListener('click', function() {
    console.log("close click");
    document.getElementById('history-panel').classList.toggle('visible');
});

//Clears the textbox and current equation when clicking CE
document.getElementById('button-CE').addEventListener('click', function(event) {
    document.getElementById('problem-textbox').innerHTML = '';
    document.getElementById('answer-textbox').innerHTML = '';
    current_equation = '';
});

/*
This is for solving the equation. There are several steps.
It first creates an array that splits the equation based on spaces.

Then it converts all numbers into integers, rather than a string

Then, it goes through and looks for multiplication and division symbols
If it finds any, it calculates with the index before and after the symbol, and updates the array
It does this until all the symbols are gone

This process is repeated for addition and subtraction

The final number remaining in the array is then returned as the answer.
*/
function solve(equation) {
    let chunks = equation.split(' ');
    
    //Conversion to integers
    for (var i = 0; i < chunks.length; i++) {
        if ((chunks[i] != '+') && (chunks[i] != '-') && 
            (chunks[i] != '*') && (chunks[i] != '/') ) {
                chunks[i] = Number(chunks[i]);
        }
    }
    console.log(chunks);

    //Multiplication/division
    while ((chunks.includes('*')) || (chunks.includes('/'))) {
        for (let i = 0; i < chunks.length; i++) {
            if (chunks[i] === '*') {
                chunks[i-1] = chunks[i-1] * chunks[i+1];
                chunks.splice(i,2);
                break;
           }

           if (chunks[i] === '/') {
                chunks[i-1] = chunks[i-1] / chunks[i+1];
                chunks.splice(i,2);
                break;
           }
       }
    }
    console.log(chunks);

    //Addition/subtraction
    while ((chunks.includes('+')) || (chunks.includes('/'))) {
        for (let i = 0; i < chunks.length; i++) {
            if (chunks[i] === '+') {
                chunks[i-1] = chunks[i-1] + chunks[i+1];
                chunks.splice(i,2);
                break;
            }

            if (chunks[i] === '-') {
                chunks[i-1] = chunks[i-1] - chunks[i+1];
                chunks.splice(i,2);
                break;
            }
        }
    }
    console.log(chunks);
    
    return chunks[0];
}



//Used to display the answer, update the history, and reset the current equation
document.getElementById('button-equals').addEventListener('click', function(event) {
    
    //Checks that the equation being passed through isn't blank or invalid
    
    
    if ((current_equation != '') && (current_equation.substring((current_equation.length-1), current_equation.length) != ' ')) {
        document.getElementById('problem-textbox').innerHTML = '';
        document.getElementById('answer-textbox').innerHTML = solve(current_equation);
        current_equation = '';
    } else {
        document.getElementById('answer-textbox').innerHTML = "It looks like your equation is blank, or unfinished.";
    }; 
});