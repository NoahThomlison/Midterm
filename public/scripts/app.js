// Client facing scripts here

$(document).ready(function(){

  $('#newTaskForm').submit(function(event){
    event.preventDefault();

    //get task name and description from the form
    const task = $('#title').val()
    const description = $('#description').val()

    // post to end point which sorts the keywords
    $.post('/api/keywords', {keyword: task})
    .then((category) => {

      //post new task information to db, returing the newtask information from db
      $.post('/api/tasks/new', {task, description, category}).then((newTaskData) => {

        //append new task to the front end
        $(`#${category}`).find('ul').append(
          `<li class='toDoListItem' id='${newTaskData.id}'>
            <div class='toDoRightSide'>
              <button class='listButton listButtonComplete' id='${newTaskData.id}-CompleteButton'>
                <i class="fas fa-check-circle"></i>
              </button>
              <button class='listButton listButtonDelete' id='${newTaskData.id}-DeleteButton'>
                <i class="fas fa-minus-circle"'></i>
              </button>
              <div class="task" id='${newTaskData.id}-Text'>${task}
              </div>
            </div>
          </li>`)
      })
    })
  })
});
