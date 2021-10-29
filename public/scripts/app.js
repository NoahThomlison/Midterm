// Client facing scripts here

$(document).ready(function(){

  // $('.listButtonDelete').on("click", function(event) {
  //   event.preventDefault();
  //   console.log('ding')
  //   const splitID = (this.id).split('-')
  //   const id = splitID[0]
  //   const parentListItem = this.closest('li')
  //   console.log(parentListItem)
  //   console.log(id)

  //   $.post(`/api/tasks/${id}/delete`, {tasksId: id})
  //   .then((category) => {
  //       console.log(parentListItem)
  //       parentListItem.remove()
  //   })
  //   .catch((err) => {
  //     console.log('Error: ', err.message);
  //   });
  // });


  $('#newTaskForm').submit(function(event){
    event.preventDefault();

    //get task name and description from the form
    const task = $('#title').val()
    const description = $('#description').val()

    // post to end point which sorts the keywords
    $.post('/api/keywords', {keyword: task})
    .then((category) => {
    console.log(category)

    if(!category){
      console.log('bad task')
      $("#newTaskForm").css("border", "red dotted 5px")
      $('.new-task-title-error-message').html('Bad Task, check spelling')
      $(".new-task-title-error").slideDown('slow')
    }

    if(category){
      console.log('goodtask')
      $("#newTaskForm").css("border", "none")
      $('.new-task-title-error-message').html('')
      $(".new-task-title-error").slideUp('slow')

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

    //run delete button function which adds the eventListeners
        deleteButton()

    //run complete button function which adds the eventListeners
        completeButton()
      })
    }
    })
  })




});
