const { computeSize } = require('./async-await');

test('finding size of a file', async () => {
  const size = await computeSize('./fs.js');
  console.log(size);
  expect(size).toBeGreaterThan(0);
});

test('finding size of a folder', async () => {
  const size = await computeSize('./web-app');
  console.log(size);
  expect(size).toBeGreaterThan(0);
});

test('finding size of a folder', async () => {
  const size = await computeSize('../js-playground/coverage');
  console.log(size);
  expect(size).toBeGreaterThan(0);
});
