const fs = require('fs');
const {
  getStatPromise,
  getReadFilePromise,
  getReadFolderPromise,
} = require('./fs-promise');

const path = process.argv.slice(2)[0];
console.log(process.argv);
console.log(path);
if (!path) {
  console.error('Path missing: Usage: node fs.js <path>');
  return;
}

// Check if the provided path is a file or folder.
// if folder then print it is a folder, and then the names of the files within it
// else print the contents of it (as it is a file)
function processPath(path) {
  // We need to check if path represents a file
  fs.stat(path, (err, stat) => {
    if (err) {
      console.log(err);
      return;
    }

    // check if path is a file or folder
    if (stat.isFile()) {
      fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`Contents of file ${path}\n`, data);
      });
    } else {
      fs.readdir(path, { encoding: 'utf8' }, (err, files) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`Files within directory ${path}: \n`, files);
      });
    }
  });
}

// Implementation of processPath using promisified fs APIs

function processPathAsync(path) {
  // check if path is a file
  getStatPromise(path)
    .then((stat) => {
      if (stat.isFile()) {
        getReadFilePromise(path).then(({ data }) =>
          console.log(`Contents of file ${path}\n`, data)
        );
      } else {
        getReadFolderPromise(path).then(({ files }) =>
          console.log(`Files within directory ${path}: \n`, files)
        );
      }
    })
    .catch((err) => {
      console.log('Error recieved', err);
    });
}

processPathAsync(path);
console.log('I will be called first always');
