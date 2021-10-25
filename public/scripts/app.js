// Client facing scripts here
// import fetch from "node-fetch";

$(document).ready(function(){

  $('#newTaskForm').submit(function(event){
    event.preventDefault();
    const newTask = $('#task-text').val()
    let splitString = newTask.split(' ')
    // console.log(splitString)

    if(splitString.length = 1){
      console.log('ding')
      $.post('api/keywords', {keyword: newTask})
      .then((category) => {
        console.log(category)
        $.post('api/tasks/new', {task: newTask, category: category})
        $(`#${category}`).append(
          `<li class='toDoListItem'>
            <div class='toDoRightSide'>
              <button class='listButton'>
              <i class="fas fa-check-circle"></i>
              </button>
              <button class='listButton'>
                <i class="fas fa-minus-circle"></i>
              </button>
              <div class="task">${newTask}
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
})
