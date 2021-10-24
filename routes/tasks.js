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
})

// /api/tasks/new
router.post('/new', (req, res) => {
  let queryString =
  `INSERT INTO tasks (title, category_id) VALUES ($1, $2)`;
  let values = [req.body.task, req.body.category]
  db.query(queryString, values)
    .then(() => {
      res.status(200)
    })
    .catch(err => {
      res
        .status(500)
        console.log(err.message)
        .json({ error: err.message });
    });
})

  // /api/tasks/new
router.get("/new", (req, res) => {
  let query = `SELECT * FROM tasks`;
  console.log(query);
  db.query(query)
    .then(data => {
      const tasks = data.rows;
      res.json({ tasks });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

  return router;
};
