const assert = require('assert');
function doFoo(first = 11, second, third = 13, ...rest) {
  // perform some computations
  // an optional return value
  //   console.log(first);
  //   console.log(second);
  //   console.log(third);
  //   console.log(rest[0]);
  //   console.log(rest[1]);
  //   console.log(rest[2]);
  //   console.log(rest[3]);
  //   console.log(rest[4]);
  //   console.log(rest[5]);
  //   console.log(rest[6]); // undefined.
  // `this` is another special argument that gets passed to every function created using function keyword, or
  // the function is part of an object or class.
  // If we create a function using () => {} this will not be passed explicitely, neither it will receive arguments
}

// assert(doFoo()).toEqual(undefined);
doFoo(1, undefined, 3);

const student = {
  name: 'John',
  age: 20,
  address: { street: 'first cross', pin: 574198 },
};

const { name, age, address, score = 10 } = student;

const squares = [1, 4, 9, 16];
const [firstSqure, secondSquare, ...rest] = squares;

// name, age or address.
// console.log(score);

function displayStudent({ name: inputName, age, address }) {
  console.log(inputName);
  console.log(age);
  console.log(address);
}

// displayStudent(student);

function displayFirstTwoSquares([firstSquare, secondSquare]) {
  console.log(firstSquare, secondSquare);
}

// displayFirstTwoSquares(squares);

const employee = {
  name1: 'Ram',
  age1: 34,
  company: 'CodeCraft',
  // a function when it becomes member of an object, is called as method.
  display: function () {
    console.log(this);

    const formatName = () => {
      // by default this will be bound to global/module scope unless the function is
      // is invoked on an object.
      const upperName = this.name1.toUpperCase();
      return upperName;
    };

    console.log(this.name1, this.age1, formatName());
  },
};

// during invocation of display on employee, the "this" argument
// of display gets associated with the object on which it is being invoked.
// employee.display();

function doIncrement(value) {
  return value + 1;
}

// Arrow function. If there is only one statement in the function, we
// can ommit open and close paranthes, and simply write the statement.
// the return value will be the value computed by the expression.
const doIncrement1 = (value) => {
  // console.log(this);
  console.log(arguments);
  // Arrow functions do not have their own  version of this or arguments.
  // however, if their containing scope has a value bound to this or arguments,
  // that will be seen by arrow function as is.
  const anotherFunc = () => {
    console.log(arguments);
  };
  anotherFunc();
  return value + 1;
};
// doIncrement1(10);

const displayOfEmployee = employee.display;
//displayOfEmployee(); // this is not same as employee.display();
// apply method on any function created using 'function' keyword
// will bind its this with the passed in object as an argument.
// apply will bind and invoke the function.
//displayOfEmployee.apply(employee);

const boundDisplay = displayOfEmployee.bind(employee);
// boundDisplay();

// Lets create a function that returns another function.
// makeCounter function returns another function, that will increment a counter variable
// created within  makeCounter. A function that receives atleast one argument which is a function
// or returns a function - is known as higher order function.
function makeCounter(initialValue = 0, incrementValue = 1) {
  let count = initialValue;
  const increment = () => {
    count += incrementValue;
    return count;
  };
  return increment;
}

// const counter1 = makeCounter();
// console.log(counter1);
// console.log(counter1());
// console.log(counter1());

// const counter2 = makeCounter();
// console.log(counter2()); //

// const counter3 = makeCounter(100, 2);
// console.log(counter3()); //

// point free method of creating functions. A function creates another function and returns it.

// Logs a given message along with given module name, severity(warning, debug, info),
function log(moduleName, severity, message) {
  console.log(`[${moduleName}]:${severity}:${message}`);
  //console.log('%cconsole.log', 'color: green;');
}

log('network', 'warning', 'currently the communication is happening over http');
log('nework', 'info', 'currently the communication is happening over http');
log('ui', 'debug', 'control came inside the component');
log('model', 'info', 'the total disk consumed is 10MB');

// Partial application is used to convert our log method into a partially
// applied function.
function createLogger(moduleName, severity) {
  return function (message) {
    console.log(`[${moduleName}]:${severity}:${message}`);
  };
}

const warnInNetwork = createLogger('network', 'warn');

warnInNetwork('currently the traffic is going over http communication');
warnInNetwork('warning 2');
warnInNetwork('warning 3');

// currying
function createLoggerNew(moduleName) {
  return function (severity) {
    return function (message) {
      console.log(`[${moduleName}]:${severity}:${message}`);
    };
  };
}

const networkLoggerWithWarning = createLogger('network')('warn');
// const networkLoggerWithWarn = networkLogger('warn');
// networkLoggerWithWarn("message");
networkLoggerWithWarning('unsafe communication');

// create a function wait that will take milliseconds as an argument and return a promise.
// the promise will be resolved after the given milliseconds.
function wait(milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
} 
