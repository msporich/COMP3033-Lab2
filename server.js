const connect = require('connect');
const url = require('url');
const app = connect();

app.listen(3000);

console.log('Server running on http://localhost:3000');

function calculate(request, response, next) {
    response.setHeader('Content-Type', 'text-plain');

    //creating a JSON object to hold the URL's query data
    const queryObject = url.parse(request.url,true).query;

    //creating a variable to hold the calculation's results
    var result;

    //invoking functions depending on what the method is
    if (queryObject.method === "add") {
        result = add(queryObject.x, queryObject.y);
    }
    else if (queryObject.method === "subtract") {
        result = subtract(queryObject.x, queryObject.y);
    }
    else if (queryObject.method === "multiply") {
        result = multiply(queryObject.x, queryObject.y);
    }
    else if (queryObject.method === "divide") {
        result = divide(queryObject.x, queryObject.y);
    }
    else {
        response.end('ERROR: Invalid Method Entered.');
    }

    //adding a new parameter to the JSON object
    queryObject["result"] = result;

    //Printing the response on screen with the JSON object converted to a string with linebreaks and spaces
    response.end('This is Lab 2 for Javascript APIs\n' + JSON.stringify(queryObject, null, 2));
}

//Calculation Functions
function add(x, y) {
    var number1 = parseInt(x, 10);
    var number2 = parseInt(y, 10);

    var result = number1 + number2;

    return result;
}

function subtract(x, y) {
    var number1 = parseInt(x, 10);
    var number2 = parseInt(y, 10);

    var result = number1 - number2;

    return result;
}

function multiply(x, y) {
    var number1 = parseInt(x, 10);
    var number2 = parseInt(y, 10);

    var result = number1 * number2;

    return result;
}

function divide(x, y) {
    var number1 = parseInt(x, 10);
    var number2 = parseInt(y, 10);

    var result = number1 / number2;

    return result;
}

function logger(request, response, next) {
    console.log(request.method, request.url);
    // Important to call next
    next();
}

app.use('/lab2', calculate);