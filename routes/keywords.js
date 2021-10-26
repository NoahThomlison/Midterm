/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const fetch = require('cross-fetch');
const { response } = require('express');

module.exports = (db) => {
  router.post("/", (req, res) => {
    let keyword = req.body.keyword
    let count = 0

    const wikiPromise =
      wikiSearch(keyword).then((wikiData) => {return (wikiData)})

    const dbPromise = db.query(`SELECT * FROM keywords;`)
    .then(data => {
      const dbKeywords = data.rows;
      return(dbKeywords)
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message });
      });

    return Promise.all([wikiPromise, dbPromise]).then((values) => {
      let wikiValues = values[0]
      let dbPromise = values[1]
      let categories = {}

      let wikiStringSnippet = ''

      for (const wiki of wikiValues) {
        wikiStringSnippet = wikiStringSnippet + ' ' + wiki.snippet
      }

      for (const db of dbPromise) {
        if(wikiStringSnippet.includes(db.keyword)){
          console.log(db.keyword)
          categories[db.category_id] = (categories[db.category_id]+1) || 1 ;
        }
      }
      let correctCatagory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b);

      console.log(categories)
      console.log(correctCatagory)
      res.json(correctCatagory)
      });
  });
  return router;
};

//function which searchs the wikipedia for the keyword given and returns 100 snippets of articles to compare
function wikiSearch (keyword) {

  let url = "https://en.wikipedia.org/w/api.php";
  let params = {
    action: "query",
    prop: "extracts",
    list: "search",
    srsearch: keyword,
    srlimit: 100,
    format: "json",
    exchars: 1200
    };

  url = url + "?origin=*";

  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

  console.log(url)

  let data = fetch(url)
    .then(response => response.json())
    .then(data => {
      return(data.query.search)})
    .catch(function(error){console.log(error);});

  return data
}
