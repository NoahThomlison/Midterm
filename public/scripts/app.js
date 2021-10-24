// Client facing scripts here
$(document).ready(function(){

  $('#newTaskForm').submit(function(event){
    event.preventDefault();
    const newTask = $('#task-text').val()


    console.log(newTask);
    let splitString = newTask.split(' ')
    console.log(splitString)
// // sorting functions
// if single word call funtionX
// if multiword call functionY

    if(splitString.length = 1){
      category = singleWordMatcher(splitString)
    }

    if(splitString.length > 1){
      category = multiWordMatcher(splitString)
    }

    $.post('api/tasks/new', {task: newTask,category: 1})
    $(`.foodList`).append(`<li>${newTask}</li>`)
    $('#task-text').val('')

  })
})
