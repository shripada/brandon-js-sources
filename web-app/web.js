// Lets write a 'pure' function that derives its values solely from its arguments
// number is the input, which we want to check if it is prime or not.
// This is going to return true if the number is prime, false otherwise.
function isPrime(number) {
  // pre conditions are the ones, that need to be satisfied before a function can perform its operation.
  // if(typeof number !== 'number'){
  //    throw new Error('Encountered a non number as an argument. Please pass a valid number as an arg');
  // }
  // Pre conditioins can be expressed as valid assert statments.
  console.assert(typeof number === 'number', 'argument must be a number');

  let isNumberPrime = true;
  let numberValue = parseInt(number);
  if (numberValue === 0 || numberValue === 1) {
    isNumberPrime = false;
  }
  if (numberValue === 2) {
    return true;
  }

  for (let i = 2; i <= Math.sqrt(numberValue); i++) {
    if (numberValue % i === 0) {
      // reminder is 0 means, i is a factor of number. So number is not a prime
      isNumberPrime = false;
      break;
    }
  }

  return isNumberPrime;
}

console.log(isPrime(100));

function C() {
  console.log('This is function C');
}

function B() {
  console.log('This is function B');
  C();
}

function A() {
  console.log('this is function A');
  B();
}

A();
A();
A();
