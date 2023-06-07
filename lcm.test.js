const { lcm } = require('./lcm');

test('tests for lcm function', function () {
  expect(() => lcm()).toThrow();
  expect(() => lcm(0, 0)).toThrow();
  expect(lcm(1, 2)).toBe(2);
  expect(lcm(1, 3)).toBe(3);
  expect(lcm(3, 1)).toBe(3);
  expect(lcm(2, 3)).toBe(6);
  expect(lcm(6, 7)).toBe(42);
  expect(lcm(16, 20)).toBe(80);
  expect(lcm(1600, 2000)).toBe(8000);
  expect(lcm(29, 31)).toBe(899);
});
