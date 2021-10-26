// Client facing scripts here
// import fetch from "node-fetch";

$(document).ready(function(){

  $('#newTaskForm').submit(function(event){
    event.preventDefault();
    const task = $('#title').val()
    const description = $('#description').val()
    let splitString = task.split(' ')
    console.log(task)
    console.log(description)
    console.log(splitString)
    let user = 1
    if(splitString.length = 1){
      console.log('ding')
      $.post('api/keywords', {keyword: task})
      .then((category) => {
        console.log(category)
        $.post('api/tasks/new', {task, description, category, user})




        $(`#${category}`).append(
          `<li class='toDoListItem'>
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
        }
      )
    }
  })
});
