/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // /api/tasks/
  router.get("/", (req, res) => {
    let query = `SELECT * FROM tasks`;
    console.log("/api/tasks/")
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // /api/tasks/
router.post('/', (req, res) => {
  console.log('/api/tasks/')
  console.log(req.body);
  // res.json({status: 'hello'})
  res.send('hi max')
})

// /api/tasks/new
router.post('/new', (req, res) => {
  console.log('ding')
  console.log(req.body)
  // console.log(res)
  res.json({status: 'hello'})
})

  // /api/tasks/new
router.get("/new", (req, res) => {
  let query = `SELECT * FROM tasks`;
  console.log(query);
  db.query(query)
    .then(data => {
      const widgets = data.rows;
      res.json({ widgets });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

  return router;
};
