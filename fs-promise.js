// This module is a promisified version of few of fs APIs which rely on callbacks

const fs = require('fs');

// Promisify fs.stat API.
// We should create a promise that encapsulates calling the fs.stat API.
// The idea is to resolve on success with the stat of the file as the resolved value.
// in case any error, we would reject with that error.
function getStatPromise(path) {
  const promise = new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
      if (err) {
        reject(err);
      } else {
        resolve(stat);
      }
      // If we reach here, then success.
    });
  });
  return promise;
}

// promisified fs.readFile API
// fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
function getReadFilePromise(path, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({ path, data });
      }
    });
  });
}

// promisified fs.readFile API
// fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
function getReadFolderPromise(path, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    fs.readdir(path, { encoding }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ path, files });
      }
    });
  });
}

module.exports = { getStatPromise, getReadFilePromise, getReadFolderPromise };
