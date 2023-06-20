const postURL = 'https://jsonplaceholder.typicode.com/posts';
async function getPostForId(id) {
  const postForIdURL = `${postURL}/${id}`;
  const response = await fetch(postForIdURL);
  return response.json();
}

export { getPostForId };
