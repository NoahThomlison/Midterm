// Event Listener for the delete button

$(document).ready(function(){
  $('.listButtonDelete').on("click", function(event) {
      event.preventDefault();
      console.log('ding')
      const splitID = (this.id).split('-')
      const id = splitID[0]
      const parentListItem = this.closest('li')
      console.log(parentListItem)
      console.log(id)

      $.post(`/api/tasks/${id}/delete`, {tasksId: id})
      .then((category) => {
          console.log(parentListItem)
          parentListItem.remove()
      })
      .catch((err) => {
        console.log('Error: ', err.message);
      });
  });
});
