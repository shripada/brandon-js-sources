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

function checkMail() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Mail has arrived');
    } else {
      reject(new Error('Failed to arrive'));
    }
  });
}

checkMail()
  .then((mail) => {
    console.log(mail);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('Experiment completed');
  });

const promise1 = Promise.resolve(100);

const delay = (timeout) =>
  new Promise((resolve, reject) => setTimeout(resolve, timeout));

const promise2 = delay(2000).then(() => {
  throw 2000;
});
const promise3 = delay(3000).then(() => 3000);

// Print to consolve when all of the above resolve
// promise1.then((value1) =>
//   promise2.then((value2) =>
//     promise3.then((value3) => {
//       console.log(
//         'All 3 promises should be resolved if we reach here!',
//         value1,
//         value2,
//         value3
//       );
//     })
//   )
// );

//This will help us to perform something that depends on success of many promises
// For example, a screen's sections having their own APIs to fill their contents.
// Here to conclude that the entire page has loaded, requires us to wait for all promises
// to succeed. Promise.all will take an array of promises and will return a single promise.
// this single promise can be used to get the values of all promises as an array.
// If any of the promises fail, then this promise will reject with that error.
const unifiedPromise = Promise.all([promise1, promise2, promise3]);
unifiedPromise
  .then((values) => {
    console.log(values);
  })
  .catch((errors) => console.log(errors));

// Promise.any on the other hand will return a single promise from an array of promises.
// If any of the promise succeeds first, its value will be the resolved value of this promise.
// if all fail, then only this resultant promise fails.

const promise4 = delay(1000).then(() => {
  throw 1000;
});
const promise5 = delay(2000).then(() => {
  throw 2000;
});
const promise6 = delay(3000).then(() => {
  throw 3000;
});

// Try to see if atleast one promise succeeds, if all fail, then return a rejected promise with all errors
// const resultPromise = promise4
//   .then((promise4Value) => promise4Value)
//   .catch((error1) => {
//     return promise5
//       .then((promise5Val) => promise5Val)
//       .catch((error2) => {
//         return promise6
//           .then((promise6Val) => promise6Val)
//           .catch((error3) => Promise.reject([error1, error2, error3]));
//       });
//   });

// Thanks to Promise.any, we dont need to do the above circus!
Promise.any([promise4, promise5, promise6])
  .then((resolveVal) => console.log('resolved:', resolveVal))
  .catch((errors) => console.log(errors));

// If you have a scenario, where you want to consume the fastest promise among a list of promises that settles first
// (with success or error, in that case, we can use Promise.race
