//JSDoc format
const assert = require('assert');
/**
 * Finds the least common multiple of the given two numbers
 * @param {number} a  the first number
 * @param {number} b  the second number
 * @returns the lcm of the two numbers.
 */
function lcm(a, b) {
  // pre conditions.
  // a, and be must be numbers
  assert(typeof a === 'number' && typeof b === 'number');
  assert(a !== 0 && b !== 0);

  // lcm is a least common multiple of the two numbers
  // we start with the maxmimum of two provided numbers (proposed lcm), and check if both the numbers devide
  // it without leaving a remainder. If there is a remainder, increment the proposed lcm by 1 and repeat the process
  // until we reach a number which is completely divisible by both.
  let proposedLcm = Math.max(a, b);
  while (true) {
    if (proposedLcm % a === 0 && proposedLcm % b === 0) {
      return proposedLcm;
    }
    proposedLcm++;
  }
}

module.exports = { lcm };
