/*
    search.js

    MediaWiki API Demos
    Demo of `Search` module: Search for a text or title

    MIT License
*/

import fetch from 'cross-fetch';

var url = "https://en.wikipedia.org/w/api.php";

var params = {
  action: "query",
  prop: "extracts",
  list: "search",
  srsearch: "Burger",
  srlimit: 50,
  format: "json"
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

  let siteData = fetch(url)
      .then(function(response){return response.json();})
      // .then(function(response) {
      //   console.log(response.query.search)
      // })
      .catch(function(error){console.log(error);});
