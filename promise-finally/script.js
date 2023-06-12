const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function checkMail() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      delay(3000).then(() => resolve('Mail has arrived'));
    } else {
      delay(3000).then(() => reject(new Error('Failed to arrive')));
    }
  });
}

// Element containing loader ui
const loader = document.getElementById('loader');

function showLoader() {
  loader.style.display = 'flex';
}

function hideLoader() {
  loader.style.display = 'none';
}

function doGetMails() {
  showLoader();
  checkMail()
    .then((mails) => {
      console.log('Mails received', mails);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      hideLoader();
    });
}

doGetMails();
