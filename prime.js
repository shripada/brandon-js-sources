var prompt = require('prompt-sync')();
const assert = require('assert');
/*
  Prime number is a number that is divisible by itself and the number 1. It can not be divided without leaving a reminder by any other numbers
*/
//What?
/**
 * isPrime is a function that takes a number as its argument, and checks if it is a prime number.
 * if the number is a prime number, it returns true, otherwise false.
 * Thius is an impure function. The reason is, it does not derive its inputs solely from its arguments. Instead it is reading inputs via I/O. Also the outcome is not returned from the function, instead it is shown as a side effect via I/O.
 */
function isPrime_classic() {
  // Is a predicate function. Predicate functions will return a boolean
  // Ask user to provide input via console
  const number = prompt('Enter the number to check if it is prime: ');
  console.log('The number you entered: ', number);

  //  === logic ===
  // Since the number that user inputs will always be a string
  // we are using triple equal operator which is very strict about the types of values it compares against
  // in this case one is string, and the other is actually a number, so, === always returns false.
  // So it is important that we convert the number that user inputted to a number type.
  let isNumberPrime = true;

  let numberValue = parseInt(number);
  if (numberValue === 0 || numberValue === 1) {
    isNumberPrime = false;
  }

  for (let i = 2; i < numberValue; i++) {
    if (numberValue % i === 0) {
      // reminder is 0 means, i is a factor of number. So number is not a prime
      isNumberPrime = false;
      break;
    }
  }

  // output the result to console
  if (isNumberPrime === true) {
    console.log('The given number: ', number, 'is prime');
  } else {
    console.log('The given number: ', number, 'is not a prime');
  }
}

//isPrime_classic();

// Lets write a 'pure' function that derives its values solely from its arguments
// number is the input, which we want to check if it is prime or not.
// This is going to return true if the number is prime, false otherwise.
function isPrime(number) {
  // pre conditions are the ones, that need to be satisfied before a function can perform its operation.
  // if(typeof number !== 'number'){
  //    throw new Error('Encountered a non number as an argument. Please pass a valid number as an arg');
  // }
  // Pre conditioins can be expressed as valid assert statments.
  assert(typeof number === 'number', 'argument must be a number');

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

/**
 * generatePrimes is a function that will generate as many primes as specified
 * in the prime number series starting from index 0 onwards. This will return an array
 * containing the said number of prime numbers.
 *
 * @param {number} count  - This is the number of primes we expect.
 * @returns {Array<number>} Array of prime numbers
 */
function generatePrimes(count) {
  const primes = [];
  let collectedCount = 0;
  let potentialPrime = 2;
  // how this works should be explained here.
  while (collectedCount < count) {
    if (isPrime(potentialPrime)) {
      primes.push(potentialPrime);
      collectedCount++;
    }
    potentialPrime += 1;
  }

  return primes;
}

module.exports = { isPrime, generatePrimes };
