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
    const newTaskQuery = `INSERT INTO tasks (title, description, category_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *;`;
    const queryParams =
    [
      req.body.task,
      req.body.description,
      req.body.category,
      req.body.user
    ];
    console.log(queryParams)
    db.query(newTaskQuery, queryParams)
        .then((data) => {
        const updatedTask = data.rows[0];
        res.send(updatedTask);
      })
      .catch((err) =>{
        console.log('Error', err.message);
      });
  });


  // view all tasks
  router.get('/', (req, res) => {
    const userId = req.session.user_id;
    const queryString = `SELECT * FROM tasks WHERE user_id = $1;`;
    const values = [userId];
    db.query(queryString, values)
      .then(result => {
        const tasks = result.rows;
        const tasksFood = [];
        const tasksMovies = [];
        const tasksBooks = [];
        const tasksProducts = [];
        const tasksUncategorized = [];
        for (let task of tasks) {
          const categoryId = task.category_id
          if (categoryId === 1) {
            tasksMovies.push(task);
          } else if (categoryId === 2) {
            tasksFood.push(task);
          } else if (categoryId === 3) {
            tasksBooks.push(task);
          } else if (categoryId === 4) {
            tasksProducts.push(task);
          } else {
            tasksUncategorized.push(task);
          }
        }

        const templateVars = { tasksFood, tasksMovies, tasksBooks, tasksProducts,tasksUncategorized };
        res.render('index', templateVars);
        // renderAllTasks(tasks);
      })
      .catch(err => console.log(err.message));
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

  // delete a specific task
  router.post('/:tasksId/delete', (req, res) => {
  let deleteTaskQuery = `DELETE FROM tasks WHERE id = $1`;
  console.log(req.body.tasksId)
  // const values = [taskID];
  const values = [req.body.tasksId];

  db.query(deleteTaskQuery, values)
    .then(()=> {
      res.status(200);
      console.log('Sucessfully deleted task');
      res.send();
  // /api/tasks/
  // router.post('/', (req, res) => {
  // })
})
})

  // /api/tasks/new
router.get("/new", (req, res) => {
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
