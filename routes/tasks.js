/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // create a new task
  router.post('/new', (req, res) => {
    const newTaskQuery = `INSERT INTO tasks (title, description, user_id) VALUES ($1. $2, $3)`;
    const queryParams = [title, description, user_id];

    db.query(newTaskQuery, queryParams)
      .then((res) => {
        const newTask = res.rows[0];
        res.send(newTask);
      })
      .catch((err) =>{
        console.log('Error', err.message);
      });
  });


  // view all tasks
  router.get('/', (req, res) => {
    const queryString = `SELECT * FROM tasks WHERE user_id = $1`
    const values = [req.params.user.id];
    console.log('VALUES:: ', values);
    db.query(queryString, values)
      .then ((res) => {
        const data = res.rows;
        res.json({ data });
      })
      .catch(() => {
        console.log('Error', err.message);
        res.send(err);
      });
  });

  // view all tasks per category
 router.get('/category/:category_id', (req, res) => {
   let queryString = `SELECT * FROM categories WHERE category_id = $1 AND user_id = $2`;
   let values = [1, 1];
   db.query(queryString, values)
    .then((res) => {
      const data = res.rows;
      res.json( { data });
    })
    .catch((err) => {
      console.log('Error', err.message);
      res.send(err);
    });
 });

  // IS THIS CORRECT? IT SEEMS FUNNY?
  // delete a specific task
  router.post('/:tasksId/delete', (req, res) => {
  let deleteTaskQuery = `DELETE FROM tasks WHERE id = $1`;
  const values = [taskID];

  db.query(deleteTaskQuery, values)
    .then(()=> {
      res.status(200);
      console.log('Sucessfully deleted task');
  // /api/tasks/
  router.post('/', (req, res) => {
  })
})
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
    .catch((err) => {
      console.log('Error', err.message);
    });
  });

    // update a task
  router.post('/:tasksId/update', (req, res) => {
    let updateTaskQuery = `UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *`;
    let values = ['This is a TEST title change', 1];

    db.query(updateTaskQuery, values)
      .then((res) => {
        const updatedTask = res.rows[0];
        res.send(updatedTask);
      })
      .catch((err) => {
        console.log('Error', err.message);
      });
  });

    // mark task as complete
  router.post('/:taskId', (req, res) => {
    const markCompleteQuery = `UPDATE tasks SET completion_status = TRUE WHERE id = $1`;
    const queryParams = [taskID];

    db.query(markCompleteQuery, queryParams)
      .then((res) => {
        const taskComplete = res.rows[0];
        res.send(taskComplete);
      })
      .catch((err) => {
        console.log('Error', err.message);
      });
  });

  return router;
};
