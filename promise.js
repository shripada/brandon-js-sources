// True that node system has had the asynchronous API like the one we saw using fs module
// But as a node/web programmer, how do we create such async functions ourselves?
// the answer is Promise API.

const executor = (resolve, reject) => {
  // both resolve and reject are functions.
  // Executor function is the work horse of the promise
  // we can do any time consuming operation here.
  // when our operation finishes, we can 'resolve' the promise
  // by calling resolve(resultData)
  // on the other hand, if our operation fails with an error,
  // reject(errorInfo)

  // Every promise will start with 'pending'
  // After a while, it can be 'resolved' or 'rejected'
  resolve(100);
  resolve(200);
  reject(new Error('No money left! sorry'));
};
const aPromise = new Promise(executor); // Promise's constuctor is a HOF. reason is the only arg that we need to pass is a function

const resolveCallback = (successData) => console.log('Success: ', successData);
const rejectCallback = (errorData) => console.log('Error: ', errorData);

aPromise.then(resolveCallback, rejectCallback); // Async

console.log('Welcome to the world of promises'); // sync

let bankBalance = 1000;
const amountToWithDraw = 200;

const backAccountPromise = new Promise((resolve, reject) => {
  if (amountToWithDraw > bankBalance) {
    reject(new Error('Low balance!'));
  } else {
    setTimeout(() => {
      bankBalance = bankBalance - amountToWithDraw;
      resolve(amountToWithDraw);
    }, 1000);
  }
});

backAccountPromise
  .then(
    (amount) => {
      console.log(amount);
      return amount * 1000;
      // return Promise.resolve(amount * 10000)
      // return Promise.resolve(undefined);
    },
    (error) => console.log(error)
  )
  .then((someVal) => console.log('Chained promise is resolving:', someVal));

console.log('Bank balance = ', bankBalance);

// Promise.resolve
// it simply creates a new Promise and in the executor, simply calls resolve with this value.
// Promise.resolve = (valueToResolve) =>
//   new Promise((resolve) => resolve(valueToResolve));
// const resolved = Promise.resolve(10);
// console.log('resolved promise', resolved);

// const rejected = Promise.reject('rejected!');
// console.log('rejected promise', rejected);
