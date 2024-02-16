'use strict';

const addHabitBtn = document.querySelector('.add-habit-btn');

function createHabit() {
  let habit = window.prompt("Write down a habit that you'd like to work on.");
  let goal = window.prompt(
    'How many days per week would you like to work on it?'
  );
  document.querySelector(
    'tbody'
  ).innerHTML += `<tr><th scope="row">${habit}</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td class="goal-cell">${goal}</td><td></td></tr>`;
}

addHabitBtn.addEventListener('click', function () {
  createHabit();
});

const cells = document.querySelectorAll('.markable-cell');
cells.forEach(function (cell) {
  cell.addEventListener('click', function () {
    if (cell.innerHTML === '') {
      cell.innerHTML = 'X';
    } else {
      cell.innerHTML = '';
    }
  });
});
