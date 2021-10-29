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
      wikiSearch(keyword)
      .then((wikiData) => {
        return (wikiData)})
      .catch(function(error){console.log(error);});

    const dbPromise = db.query(`SELECT * FROM keywords;`)
    .then(data => {
      const dbKeywords = data.rows;
      return(dbKeywords)
    })
    .catch(err => {
      res.status(500)
      res.json({ error: err.message });
      });

    return Promise.all([wikiPromise, dbPromise])
    .then((values) => {
      let wikiValues = values[0]
      let dbPromise = values[1]
      let categories = {}
      let noHTMLWikiValues = wikiValues.replace(/<[^>]*>?/gm, '');
      let wikiWords = noHTMLWikiValues.split(" ");
      let matchingKeyWords = []
      console.log(dbPromise)
      console.log(wikiValues)
      console.log(noHTMLWikiValues)

      //return counts of each catagory for weight average
      const reducedDB = dbPromise.reduce((s, { category_id }) => (s[category_id] = (s[category_id] || 0) + 1, s), {});
      const dbKeyValueCount = Object.keys(reducedDB).map((key) => ({ category_id: key, count: reducedDB[key] }));

      //loop through the array of works on wiki and compare to the db words related to each catagory. if same index
      for (const db of dbPromise) {
        for (const word of wikiWords) {
          if(word === db.keyword)
          {categories[db.category_id] = (categories[db.category_id]+1) || 1 ;}
          // matchingKeyWords.push(`${word} = ${db.keyword}`)
        }
      }

      // console.log(`MATCHING KEYWORDS: ${matchingKeyWords}`)

      console.log(`NON-NORMALIZED RESULTS:`)
      console.log(categories)

      console.log('DBKEYWORD COUNTS:')
      console.log(dbKeyValueCount)

      //normalizing results (ie divide matches against count for each catagory in db to return weighted average and not absolute counts)
      let normalizedValue = []
      for (const count of dbKeyValueCount) {
        for (const key in categories) {
          if(key === count.category_id){
            categories[key] = categories[key]/count.count
          }
        }
      }

      console.log(`NORMALIZED RESULTS:`)
      console.log(categories)

      //return highest value in catagories object
      let correctCatagory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b);

      console.log(`CORRECT CATEGORY:`)
      console.log(correctCatagory)
      res.json(correctCatagory)
      res.end()
      })
    .catch(function(error){
      console.log(error);
      res.send(false)});
  });
  return router;
};

//function which searchs the wikipedia for the keyword given and returns 100 snippets of articles to compare
function wikiSearch (keyword) {

  let url = "https://en.wikipedia.org/w/api.php";
    let params = {
    action: "query",
    generator: "allpages",
    gaplimit: 1,
    gapfrom: keyword,
    prop: "extracts",
    format: "json",
    formatversion: 2
    }

  url = url + "?origin=*";

  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

  console.log(url)

  let data = fetch(url)
    .then(response => response.json())
    .then(data => {
      // console.log((data.query.pages[0].extract))
      return(data.query.pages[0].extract)})
    .catch(function(error){console.log(error);});

  return data
}

