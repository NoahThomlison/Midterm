// Client facing scripts here
$(document).ready(function(){
console.log('running2')

  $('#newTaskForm').submit(function(event){
    event.preventDefault();
    form = $(this)
    const newTask = $('#task-text').val()
    console.log(form)

// // sorting functions
// if single word call funtionX
// if multiword call functionY
    console.log(typeof(newTask))
    console.log(newTask)
    // $.post('api/tasks/new', {data: newTask})
    //   .then(data => {
    //     $('.food').append(`<li>${data.status}</li>`)
    //     console.log(data);
    //   })
    $.post('api/tasks/', {data: newTask})
      .then(data => {
        console.log(`data: ${data}`);
        console.log('ding');
      })

    // $.post('api/tasks/', {data: newTask})
  })
})
