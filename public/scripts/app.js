// Client facing scripts here
// import fetch from "node-fetch";

$(document).ready(function(){

  $('#newTaskForm').submit(function(event){
    event.preventDefault();

    //get task name and description from the form
    const task = $('#title').val()
    const description = $('#description').val()

    let user = 1

    //post to end point which sorts the keywords
    $.post('/api/keywords', {keyword: task})
    .then((category) => {

      //post new task information to db, returing the newtask information from db
      $.post('/api/tasks/new', {task, description, category, user}).then((newTaskData) => {

        //append new task to the front end
        $(`#${category}`).append(
          `<li class='toDoListItem' id='${newTaskData.id}'>
            <div class='toDoRightSide'>
              <button class='listButton'>
              <i class="fas fa-check-circle"></i>
              </button>
              <button class='listButton'>
                <i class="fas fa-minus-circle"></i>
              </button>
              <div class="task">${task}
              </div>
            </div>
            <button class='listButton'>
              <i class="fas fa-filter"></i>
            </button>
          </li>`)
        $('#task-text').val('')
      })
    })
  })
});
