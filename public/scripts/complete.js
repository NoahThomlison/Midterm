// Event Listener for the complete button
$(document).ready(function(){


  $('.listButtonComplete').on("click", function(event) {
      event.preventDefault();
      const splitID = (this.id).split('-')
      const id = splitID[0]

      $.post(`/api/tasks/${id}`, {tasksId: id})
      .then((category) => {
        $(`#${id}-Text`).css("text-decoration", "line-through")
      })
      .catch((err) => {
        console.log('Error: ', err.message);
      });
  });

});
