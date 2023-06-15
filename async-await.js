// import { promises as fs } from 'fs';
const { promises: fs } = require('fs');

// Async keyword on a function will result in
// wrapping any non promise return values into a resolved promise with that value.
// in case you have Promise itself being returned, it will be retained as is.
async function add(a, b) {
  return a + b;
}

const result = add(1, 2);
result.then((value) => console.log('got the result', value));
// console.log(await result);

// Call add must be returning the value of add
async function callAdd() {
  const result = add(11, 21);
  console.log(await result);

  // return await result; // =>
  // const temp =  await result;
  // return Promise.resolve(temp)

  return result; // result is already a promise, return it as is without any delay.
}

callAdd().then((value) => console.log(value));

// A function that computes the size of the provided folder.
async function computeSize(path) {
  //1. check if path is representing a file, if so goto step 2, else to step 3
  //2. since this is a file, get its size and return it.
  //3. let size = 0;
  //  for each file or folder f in path do
  //   size +=  computeSize(f)
  //4. return size;
  //
  const stats = await fs.stat(path);
  if (stats.isFile()) {
    // Forms the base case
    return stats.size;
  } else {
    // recursive case.
    // must be a directory
    // get all sub paths and recursively find size
    let size = 0;
    const subPaths = await fs.readdir(path);
    console.log(path);
    for (let subPath of subPaths) {
      console.log(subPath);
      size += await computeSize(path + '/' + subPath);
    }
    return size;
  }
}

module.exports = { computeSize };
