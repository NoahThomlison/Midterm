$(document).ready(function() {

  const $reminderDate = $('.new-task-reminder-date');

  $('#set-reminder').change(function() {
    const $optionsValue = $('#set-reminder').val();

    if ($optionsValue === '02') {
      $reminderDate.slideDown();
    }
    if ($optionsValue === '01') {
      $reminderDate.slideUp();
    }

    $('#reminder-date-day').val('');
    $('#reminder-date-month').val('');
    $('#reminder-date-year').val('');

  });

  const $newTaskForm = $('#newTaskForm');
  let $displayValue = $newTaskForm.css('display');

  $('#new-task-button').click(function() {

    if ($displayValue === 'none') {
      $('#newTaskForm').slideDown('slow');
      $displayValue = 'block';
    } else {
      $('#newTaskForm').slideUp('slow');
      $displayValue = 'none';
    }

    $reminderDate.hide();
    $('#set-reminder').val('01');

  });

});
