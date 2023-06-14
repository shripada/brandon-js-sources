const {
  getStatPromise,
  getReadFilePromise,
  getReadFolderPromise,
} = require('./fs-promise');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
test('Getting stats of file/folder at a given path', async function () {
  // Test with a file
  getStatPromise('./chalk.js')
    .then((stat) => {
      console.log(stat);
      expect(stat.isFile()).toBe(true);
    })
    .catch((err) => {
      console.log(err);
    });

  return await delay(1000);
});

test('Getting stats of file/folder at a given path', async function () {
  // Test with a file
  getStatPromise('./non-existent.js').catch((err) => {
    expect(err).toBeDefined();
  });

  return await delay(1000);
});

test('reading contents of a file', async function () {
  getReadFilePromise('./test.txt').then(({ path, data }) => {
    expect(path).toEqual('./test.txt');
    expect(data).toEqual('This is a sample file for testing');
  });
  return await delay(1000);
});

test('reading contents of a file', async function () {
  // getReadFilePromise('./test1.txt').catch((err) => {
  //   expect(err).toBeDefined();
  // });
  try {
    await getReadFilePromise('./test1.txt');
  } catch (error) {
    expect(error).toBeDefined();
  }
  // return await delay(1000);
});

test('reading contents of a folder', async function () {
  // getReadFolderPromise('./web-app').then(({ path, files }) => {
  //   expect(files).toEqual(['index.html', 'web.js']);
  // });
  const { path, files } = await getReadFolderPromise('./web-app');
  // return await delay(1000);
});

test('reading contents of a file as folder should return an error', async function () {
  getReadFolderPromise('./test1.txt').catch((err) => {
    expect(err).toBeDefined();
  });
  return await delay(1000);
});
