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
    const userId = req.session.user_id;
    const newTaskQuery = `INSERT INTO tasks (title, description, category_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *;`;
    const queryParams =
    [
      req.body.task,
      req.body.description,
      req.body.category,
      userId
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

  // view task details
  router.get('/:taskId', (req, res) =>{
    const taskId = req.params.taskId;

    const queryString = `SELECT tasks.*, categories.type as category_type FROM tasks JOIN categories ON category_id = categories.id WHERE tasks.id = $1`;
    const values  = [taskId];

    db.query(queryString, values)
      .then ((data) => {
        const task = data.rows[0];
        const templateVars = { task };
        res.render('task', templateVars);
      })
      .catch((err) => {
        console.log('Error: ', err.message);
      });

  })


  // view all tasks per category
 router.get('/category/:category_id', (req, res) => {
    const category_id = req.params.category_id;
    const user_id = req.session.user_id;
    let categoryType;
    if (category_id === '1') categoryType = 'Movies and TV';
    if (category_id === '2') categoryType = 'Restaurants and Cafes';
    if (category_id === '3') categoryType = 'Books and Magazines';
    if (category_id === '4') categoryType = 'Items and Produce';
    if (category_id === '5') categoryType = 'Uncategorized';
    let queryString = `
    SELECT tasks.*
    FROM tasks
    WHERE tasks.category_id = $1 AND tasks.user_id = $2
    `;
    let values = [category_id, user_id];
    db.query(queryString, values)
      .then(result => {
        const tasks = result.rows;
        const templateVars = { tasks, categoryType };
        res.render('category', templateVars);
      })
      .catch((err) => {
        console.log('Error', err.message);
        res.send(err);
      });

 });

  // delete a specific task
  router.post('/:tasksId/delete', (req, res) => {
  const taskId = req.params.tasksId;

  let queryString = `DELETE FROM tasks WHERE id = $1`;
  const values = [taskId];

  db.query(queryString, values)
    .then(()=> {
      res.status(200).send();
      console.log('Sucessfully deleted task');
    })
    .catch(() => {
      console.log('Error: ', err.message);
    });
  });


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
  router.post('/:tasksId', (req, res) => {
    console.log('ding')

    const taskId = req.params.tasksId;
    const queryParams = `UPDATE tasks SET completion_status = TRUE WHERE id = $1 RETURNING *`;
    const values = [taskId];
    console.log(values)
    db.query(queryParams, values)
      .then((data) => {
        const taskComplete = data.rows[0];
        res.send(taskComplete);
      })
      .catch((err) => {
        console.log('Error', err.message);
      });
  });

  return router;
};
