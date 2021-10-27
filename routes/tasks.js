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
    const newTaskQuery = `INSERT INTO tasks (title, description, category_id, user_id) VALUES ($1, $2, $3, $4)`;
    const queryParams =
    [
      req.body.task,
      req.body.description,
      req.body.category,
      req.body.user
    ];
    console.log(queryParams)
    db.query(newTaskQuery, queryParams)
      // .then((res) => {
      //   const newTask = res.rows[0];
      //   console.log(res.rows)
      //   res.send(newTask);
      // })
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
    // const queryString = `SELECT * FROM tasks WHERE user_id = $1`
    // const values = [1];
    // db.query(queryString, values)
    //   .then ((res) => {
    //     const data = res.rows;
    //     res.json({ data });
    //   })
    //   .catch(() => {
    //     console.log('Error', err.message);
    //     res.send(err);
    //   });
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
  router.post('/delete/:taskId', (req, res) => {
  const taskId = req.params.taskId;

  let queryString = `DELETE FROM tasks WHERE id = $1`;
  const values = [taskId];

  db.query(queryString, values)
    .then(()=> {
      res.status(200);
      console.log('Sucessfully deleted task');
    })
    .catch(() => {
      console.log('Error: ', err.message);
    });
  });


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
  // router.post('/tasks/modify/:tasksId', (req, res) => {
  //   const userId = req.session.user_id;
  //   const newTitle = req.body.
  //   let updateTaskQuery = `UPDATE tasks SET title = $1 WHERE id = $2 RETURNING *`;
  //   let values = [, userId];

  //   db.query(updateTaskQuery, values)
  //     .then((res) => {
  //       const updatedTask = res.rows[0];
  //       res.send(updatedTask);
  //     })
  //     .catch((err) => {
  //       console.log('Error', err.message);
  //     });
  // });

    // mark task as complete
  router.post('/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const queryParams = `UPDATE tasks SET completion_status = TRUE WHERE id = $1 RETURNING *`;
    const values = [taskId];

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
