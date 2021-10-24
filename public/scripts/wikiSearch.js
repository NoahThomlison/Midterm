/*
    search.js

    MediaWiki API Demos
    Demo of `Search` module: Search for a text or title

    MIT License
*/

// const fetch = require('fetch');

function wikiSearch (){

let url = "https://en.wikipedia.org/w/api.php";

let params = {
  action: "query",
  prop: "extracts",
  list: "search",
  srsearch: 'burger',
  srlimit: 50,
  format: "json"
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

  let siteData = fetch(url)
      .then(function(response){return response.json();})
      .then(function(response) {
        console.log(response.query.search)
      })
      .catch(function(error){console.log(error);});

return siteData
}
