// Client facing scripts here

$(document).ready(function(){

  const newTaskListItem =
      `<li class='toDoListItem'>
        <div class='toDoRightSide'>
          <button class='listButton'>
          <i class="fas fa-check-circle"></i>
          </button>
          <button class='listButton'>
            <i class="fas fa-minus-circle"></i>
          </button>
          <div class="task">test
          </div>
        </div>
        <button class='listButton'>
          <i class="fas fa-filter"></i>
        </button>
      </li>`

  $('#newTaskForm').submit(function(event){
    event.preventDefault();
    const newTask = $('#task-text').val()
    console.log(newTask);
    let splitString = newTask.split(' ')
    console.log(splitString)
    // // sorting functions
    // if single word call funtionX
    // if multiword call functionY
    // (wikiSearch(newTask))
    // console.log(wikiSearch(newTask))

    // if(splitString.length = 1){
    //   category = singleWordMatcher(splitString)
    // }

    // if(splitString.length > 1){
    //   category = multiWordMatcher(splitString)
    // }

    $.post('api/tasks/new', {task: newTask,category: 1})
    $(`.foodList`).append(newTaskListItem)
    $('#task-text').val('')
  })
})
