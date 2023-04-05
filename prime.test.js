
const assert = require("assert");
const {isPrime, generatePrimes} = require("./prime") // please give me access to whatever was assigned to exports on module object in prime.js

test("test isPrime", () => {
  expect(isPrime(0)).toBe(false);
  expect(isPrime(1)).toBe(false);
  expect(isPrime(2)).toBe(true);
  expect(isPrime(4)).toBe(false);
  expect(isPrime(5)).toBe(true);
  expect(isPrime(11317)).toEqual(true);
})

test("test prime generation", ()=> {
  expect(generatePrimes(0)).toEqual([]);
  expect(generatePrimes(1)).toEqual([2]);
  expect(generatePrimes(2)).toEqual([2,3]);
  expect(generatePrimes(3)).toEqual([2,3,5]);
  expect(generatePrimes(4)).toEqual([2,3,5,7]);
  expect(generatePrimes(5)).toEqual([2,3,5,7,11]);
})


