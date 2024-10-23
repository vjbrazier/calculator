//Creates two arrays, one for the numbers and one for symbols
let numbers = document.getElementsByClassName('calc-number');
let symbols = document.getElementsByClassName('calc-button'); //separated to add spaces with symbols

//Stores the equation as the user enters numbers. Starts blank
let current_equation = '';
let problem_history = [];
let answer_history = [];
let history_total = 0;

let load_problems = document.getElementsByClassName('load-problem');
let load_answers = document.getElementsByClassName('load-answer');
let delete_entries = document.getElementsByClassName('delete-entry');

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
//This was working, but after adding the history functionality, it stopped.
//The conditional that makes each one unique came from ChatGPT.
document.getElementById('button-history').addEventListener('click', function() {
    if (!document.getElementById('history-panel').classList.contains('visible')) {
        document.getElementById('history-panel').classList.add('visible');
    }
});
document.getElementById('close-history').addEventListener('click', function() {
    if (document.getElementById('history-panel').classList.contains('visible')) {
        document.getElementById('history-panel').classList.remove('visible');
    }
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
    let equation_fragments = equation.split(' ');
    
    //Conversion to integers
    for (let i = 0; i < equation_fragments.length; i++) {
        if ((equation_fragments[i] != '+') && (equation_fragments[i] != '-') && 
            (equation_fragments[i] != '*') && (equation_fragments[i] != '/') ) {
                equation_fragments[i] = Number(equation_fragments[i]);
        }
    }
    console.log(equation_fragments);

    //Multiplication/division
    while ((equation_fragments.includes('*')) || (equation_fragments.includes('/'))) {
        for (let i = 0; i < equation_fragments.length; i++) {
            if (equation_fragments[i] === '*') {
                equation_fragments[i-1] = equation_fragments[i-1] * equation_fragments[i+1];
                equation_fragments.splice(i,2);
                break;
           }

           if (equation_fragments[i] === '/') {
                equation_fragments[i-1] = equation_fragments[i-1] / equation_fragments[i+1];
                equation_fragments.splice(i,2);
                break;
           }
       }
    }
    console.log(equation_fragments);

    //Addition/subtraction
    while ((equation_fragments.includes('+')) || (equation_fragments.includes('/'))) {
        for (let i = 0; i < equation_fragments.length; i++) {
            if (equation_fragments[i] === '+') {
                equation_fragments[i-1] = equation_fragments[i-1] + equation_fragments[i+1];
                equation_fragments.splice(i,2);
                break;
            }

            if (equation_fragments[i] === '-') {
                equation_fragments[i-1] = equation_fragments[i-1] - equation_fragments[i+1];
                equation_fragments.splice(i,2);
                break;
            }
        }
    }
    console.log(equation_fragments);
    
    return equation_fragments[0];
}

/*

*/
function addToHistory(equation) {
    problem_history[history_total] = current_equation;
    answer_history[history_total] = solve(current_equation);
    document.getElementById('history-list').innerHTML += '<p>' + problem_history[history_total] + '</p>' +
                                                         '<p>= ' + answer_history[history_total] + '</p>' +
                                                         '<button class="load-problem" id="load-problem-' + history_total + '">Load Problem</button>' +
                                                         '<button class="load-answer"  id="load-answer-' + history_total + '">Load Answer</button>' +
                                                         '<button class="delete-entry" id="delete-entry-' + history_total + '">Delete</button>';
    history_total ++;
}

for (let i = 0; i < load_problems.length; i++) {
    load_problems[i].addEventListener('click', function(event) {
        if (i == event.target.id.substring(event.target.id.length-1, event.target.length)) {
            
        } 
    });
};

//Used to display the answer, update the history, and reset the current equation
document.getElementById('button-equals').addEventListener('click', function(event) {
    
    //Checks that the equation being passed through isn't blank or invalid
    if ((current_equation != '') && (current_equation.substring((current_equation.length-1), current_equation.length) != ' ')) {
        addToHistory(current_equation);
        document.getElementById('problem-textbox').innerHTML = '';
        document.getElementById('answer-textbox').innerHTML = solve(current_equation);
        current_equation = '';
    } else {
        document.getElementById('answer-textbox').innerHTML = "It looks like your equation is blank, or unfinished.";
    }; 
});