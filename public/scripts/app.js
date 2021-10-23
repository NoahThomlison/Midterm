// Client facing scripts here
$(document).ready(function(){
console.log('running')

  $('#newTaskForm').submit(function(event){
    event.preventDefault();
    const newTask = $('#task-text').val()
  })
})
