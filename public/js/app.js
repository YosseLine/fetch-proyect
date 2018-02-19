onload = ((event) => {
  const form = document.getElementById('search-form');
  const searchedField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchedField.value;
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=fc629d33b11543df9fbf5dce70b52fbe`;
    fetch(url)
    .then(handleError)
    .then(parseJSON)
    .then(addNews)
    .catch(displayError);
  });

  function handleError(res) {
   if(!res.ok){
   throw Error(res.status);
 }
 return res;
 }

function parseJSON(res) {
 return res.json().then(function(data) {
   return data.response.docs;
 })
}

function addNews(data) {
  data.forEach(function(article) {
    const snippet = article.snippet;
    let li = document.createElement('li');
    li.className = 'articleClass';
    li.innerHTML = snippet;
    responseContainer.appendChild(li);
  });
}

function displayError(err){
 console.log("INSIDE displayErrors!");
 console.log(err);
}
});
