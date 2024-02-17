'use strict';

const addHabitBtn = document.querySelector('.add-habit-btn');

// FIX THIS
function createHabit() {
  let goal;
  let habit = window.prompt("Write down a habit that you'd like to work on.");
  if (typeof habit !== 'string') {
    window.alert('Numbers are not accepted. Please write a goal.');
  } else {
    goal = window.prompt(
      'How many days per week would you like to work on it?'
    );
  }

  document.querySelector(
    'tbody'
  ).innerHTML += `<tr><th scope="row">${habit}</th><td class="markable-cell"></td><td class="markable-cell"></td><td class="markable-cell"></td><td class="markable-cell"></td><td class="markable-cell"></td><td class="markable-cell"></td><td class="markable-cell"></td><td></td><td class="goal-cell">${goal}</td><td></td></tr>`;
  console.log(typeof habit);
}

addHabitBtn.addEventListener('click', function () {
  createHabit();
});

const cells = document.querySelectorAll('.markable-cell');

cells.forEach(function (cell) {
  cell.addEventListener('click', function () {
    if (cell.innerHTML === '') {
      cell.innerHTML = '&#9737;';
    } else {
      cell.innerHTML = '';
    }
  });
});
