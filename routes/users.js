/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router  = express.Router();
const bcrypt = require('bcryptjs');

module.exports = (db) => {

  // GET api/users/login - render the login page
  router.get('/login', (req, res) => {
    res.render('login');
  });

  // POST api/users/login - set the cookie - redirect to the main page /tasks
  router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // If either of email and password is empty
    if (!email || !password) {
      const errMessage = 'Cannot enter an empty email or password';
      return res.status(400).send(errMessage);
    }

    const queryString = `SELECT * FROM users WHERE users.email = $1;`;
    const values = [email];
    // const values = ['yellowbrickroad@yahoo.can'];
    db.query(queryString, values)
      .then(data => {
        const user = data.rows[0];

        // If the email does not exist
        if (!user) {
          const errMessage = 'We cannot find and account with that email address!';
          return res.status(403).send(errMessage);
        }
        // If the password is not correct
        if (!bcrypt.compareSync(password, user.password)) {
          const errMessage = 'Incorrect password!';
          return res.status(403).send(errMessage);
        }
        req.session.user_id = user.id;
        // Redirect to main page
        res.redirect('/api/tasks');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // POST api/users/logout - clear the cookie - redirect to main page /tasks
  router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/api/users/login');
  });

  // GET api/users/register - render the register page
  router.get('/register', (req, res) => {

    res.render('register');
  });

  // POST api/users/register - INSERT the db - redirect the main page /tasks
  router.post('/register', (req, res) => {
    const { name, email, password, repeatedPassword } = req.body;

    // If one of the name, email, password and repeatedPassword is empty
    if (!name || !email || !password || !repeatedPassword) {
      const errMessage = 'Cannot enter an empty name, email or password!';
      return res.status(400).send(errMessage);
    }

    // If passwords don't match
    if (password !== repeatedPassword) {
      const errMessage = 'Passwords do not match';
      return res.status(400).send(errMessage);
    }

    // If the entered email has already existed
    const queryString1 = `SELECT * FROM users WHERE users.email = $1;`;
    const values1 = [email];
    db.query(queryString1, values1)
      .then(data => {
        const user = data.rows[0];

        if (user) {
          const errMessage = 'Email has been registered!';
          return res.status(403).send(errMessage);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    // If the entered name has already existed
    const queryString2 = `SELECT * FROM users WHERE users.name = $1;`;
    const values2 = [name];
    db.query(queryString2, values2)
      .then(data => {
        const user = data.rows[0];

        if (user) {
          const errMessage = 'Name has been registered!';
          return res.status(403).send(errMessage);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    // Use bcrypt to generate hashed password
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(hashedPassword);
    const queryString3 = `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;`;
    const values3 = [name, email, hashedPassword];
    db.query(queryString3, values3)
      .then(data => {
        const user = data.rows[0];
        req.session.user_id = user.id;
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    res.redirect('/tasks');
  });

  return router;
};
