$(document).ready(function() {

  const renderAllTasks = function(tasks) {

    const $food = $('.sub-container-food');
    const $movies = $('.sub-container-movies');
    const $books = $('.sub-container-books');
    const $products = $('.sub-container-products');
    const $uncategorized = $('sub-container-uncategorized');

    for (let task of tasks) {

      const categoryId = task.category_id;

      if (categoryId === 2) {
        $food.append(`<li>${task.title}</li>`);
      } else if (categoryId === 1) {
        $movies.append(`<li>${task.title}</li>`);
      } else if (categoryId === 3) {
        $books.append(`<li>${task.title}</li>`);
      } else if (categoryId === 4) {
        $products.append(`<li>${task.title}</li>`);
      } else {
        $uncategorized.append(`<li>${task.title}</li>`);
      }

    }
  }
  renderAllTasks();
});
