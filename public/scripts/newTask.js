$(document).ready(function() {

  // const $newTaskForm = $(`
  //   <form id='newTaskForm' method="POST" action="/api/tasks">
  //     <div class="new-task-title">
  //       <label for="title">Title</label>
  //       <input id="title" type="text" name="title" placeholder="Enter title">
  //     </div>
  //     <div class="new-task-description">
  //       <label for="description">Description</label>
  //       <input id="description" type="text" name="password" placeholder="Description">
  //     </div>
  //     <div class="new-task-set-reminder">
  //       <label for="set-reminder">Set reminder</label>
  //       <select id="set-reminder" name="set-reminder">
  //         <option value="01">No</option>
  //         <option value="02">Yes</option>
  //       </select>
  //     </div>
  //     <div style="display: none;" class="new-task-reminder-date">
  //       <h6>Reminder-date</h6>
  //       <div class="new-task-reminder-date-day">
  //         <label for="reminder-date-day">Day</label>
  //         <select id="reminder-date-day" name="reminder-date-day">
  //           <option value="">Day</option>
  //           <option value="01">1</option>
  //           <option value="02">2</option>
  //           <option value="03">3</option>
  //           <option value="04">4</option>
  //           <option value="05">5</option>
  //           <option value="06">6</option>
  //           <option value="07">7</option>
  //           <option value="08">8</option>
  //           <option value="09">9</option>
  //           <option value="10">10</option>
  //           <option value="11">11</option>
  //           <option value="12">12</option>
  //           <option value="13">13</option>
  //           <option value="14">14</option>
  //           <option value="15">15</option>
  //           <option value="16">16</option>
  //           <option value="17">17</option>
  //           <option value="18">18</option>
  //           <option value="19">19</option>
  //           <option value="20">20</option>
  //           <option value="21">21</option>
  //           <option value="22">22</option>
  //           <option value="23">23</option>
  //           <option value="24">24</option>
  //           <option value="25">25</option>
  //           <option value="26">26</option>
  //           <option value="27">27</option>
  //           <option value="28">28</option>
  //           <option value="29">29</option>
  //           <option value="30">30</option>
  //           <option value="31">31</option>
  //         </select>
  //       </div>
  //       <div class="new-task-reminder-date-month">
  //         <label for="reminder-date-month">Month</label>
  //         <select id="reminder-date-month" name="reminder-date-month">
  //           <option value="">Month</option>
  //           <option value="01">January</option>
  //           <option value="02">February</option>
  //           <option value="03">March</option>
  //           <option value="04">April</option>
  //           <option value="05">May</option>
  //           <option value="06">June</option>
  //           <option value="07">July</option>
  //           <option value="08">August</option>
  //           <option value="09">September</option>
  //           <option value="10">October</option>
  //           <option value="11">November</option>
  //           <option value="12">December</option>
  //         </select>
  //       </div>

  //       <div class="new-task-reminder-date-year">
  //         <label for="reminder-date-month">Year</label>
  //         <select id="reminder-date-year" name="reminder-date-year">
  //           <option value="">Year</option>
  //           <option value="2021">2021</option>
  //           <option value="2022">2022</option>
  //           <option value="2023">2023</option>
  //           <option value="2024">2024</option>
  //           <option value="2025">2025</option>
  //           <option value="2026">2026</option>
  //           <option value="2027">2027</option>
  //           <option value="2028">2028</option>
  //           <option value="2029">2029</option>
  //           <option value="2030">2030</option>
  //         </select>
  //       </div>
  //     </div>
  //   </form>
  // `);

  const $reminderDate = $('.new-task-reminder-date');

  $('#set-reminder').change(function() {
    const $optionsValue = $('#set-reminder').val();

    if ($optionsValue === '02') {
      $reminderDate.slideDown();
    }
    if ($optionsValue === '01') {
      $reminderDate.slideUp();
    }

  });

  const $newTaskForm = $('#newTaskForm');
  let $displayValue = $newTaskForm.css('display');

  $('#new-task-button').click(function() {
    if ($displayValue === 'none') {
      $('#newTaskForm').slideDown();
      $displayValue = 'block'
    } else {
      $('#newTaskForm').slideUp();
      $displayValue = 'none';
      $reminderDate.hide();
      $('#set-reminder').val('01');
    }

  });

})
