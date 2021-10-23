/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cooKey = 'doremi1234567890fasolatido';


app.use(cookieParser());

// initite cookie session
app.use(cookieSession({
  name: 'session',
  keys: [cooKey],

  maxAge: 24 * 60 * 60 * 1000  // 24 hours
}));




module.exports = (db) => {
  router.get('/login', (req, res) => {
    db.query(`SELECT * FROM users WHERE users.id = 1;`)
      .then(data => {
        const users = data.rows;
        req.session = users.id;
        res.json({ users });
        res.redirect('/');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
