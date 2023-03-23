
const assert = require("assert");
const {isPrime, generatePrimes} = require("./prime") // please give me access to whatever was assigned to exports on module object in prime.js

// Welcome asserts
// asserts help us to specify the invariants in a function.
let prime = isPrime(10);
assert(prime === false, "10 is not a prime number");

prime = isPrime(0);
assert(prime === false, "0 is not a prime number");

prime = isPrime(1);
assert(prime === false, "1 is not a prime number");

prime = isPrime(2)
assert(prime === true, "2 is a prime number");

prime = isPrime(4)
assert(prime === false, "4 is  not a prime number");

prime = isPrime(997)
assert(prime === true, "997 is a prime number");
prime = isPrime(11317);
assert(prime === true, "11317 is a prime number");
//prime = isPrime({});  // We expect this to throw an error 
assert.throws(() => {isPrime({})}, "Passing a non number value must throw");
assert.throws(() => {isPrime("")}, "Passing a non number value must throw");
assert.throws(() => isPrime(), "Passing a non number value must throw");
assert.throws(function (){isPrime()}, "Passing a non number value must throw");



// Tests for generatePrimes
// count 0
let expected = [] // Arrays use pass by reference semantics
let actual = generatePrimes(0);
assert.deepEqual(actual, expected,  "If the count is 0, we must get an empty array as result");

// count 1
 expected = [2] // Arrays use pass by reference semantics
 actual = generatePrimes(1);
assert.deepEqual(actual, expected,  "If the count is 1, we must get [2]");

// prime series : 2, 3, 5, 7, 11, 13, 17, 19...
// count 2
 expected = [2, 3] // Arrays use pass by reference semantics
 actual = generatePrimes(2);
assert.deepEqual(actual, expected,  "If the count is 2, we must get [2, 3]");

// count 3
 expected = [2, 3, 5] // Arrays use pass by reference semantics
 actual = generatePrimes(3);
assert.deepEqual(actual, expected,  "If the count is 3, we must get [2, 3, 5]");

// count 8
 expected = [2, 3, 5, 7, 11, 13, 17, 19] // Arrays use pass by reference semantics
 actual = generatePrimes(8);
assert.deepEqual(actual, expected,  "If the count is 8, we must get [2, 3, 5, 7, 11, 13, 17, 19]");

expected = [2,  3,  5,  7, 11, 13, 17,
  19, 23, 29, 31, 37, 41, 43,
  47, 53, 59, 61, 67, 71];
actual = generatePrimes(20);
assert.deepEqual(actual, expected,  "If the count is 20, we must get 20 primes");
