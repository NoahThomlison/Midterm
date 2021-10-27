// Event Listener for the delete button

deleteButton = () => {
  $('.listButtonDelete').on("click",(function(event){
    event.preventDefault();
    const splitID = (this.id).split('-')
    const id = splitID[0]
    const parentListItem = this.closest('li')
    console.log(parentListItem)

    $.post('/api/tasks/:tasksId/delete', {tasksId: id})
     .then((category) => {
        console.log(parentListItem)
        parentListItem.remove()
    })
  }))
}

module.exports = deleteButton
