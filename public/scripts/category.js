$(document).ready(function() {

  const $reminderDate = $('.new-task-reminder-date');
  $('#set-reminder').change(function() {
    const $optionsValue = $('#set-reminder').val();

    if ($optionsValue === '02') {
      $reminderDate.show();
    }
    if ($optionsValue === '01') {
      $reminderDate.hide();
    }

    $('#reminder-date-day').val('');
    $('#reminder-date-month').val('');
    $('#reminder-date-year').val('');

  });

  const $newTaskForm = $('.new-task-form');
  let $displayValue = $newTaskForm.css('display');

  $('.edit-button').click(function() {

    if ($displayValue === 'none') {
      $('.new-task-form').show();
      $displayValue = 'block';
    } else {
      $('.new-task-form').hide();
      $displayValue = 'none';
    }

    $reminderDate.hide();
    $('#set-reminder').val('01');

  });

})
