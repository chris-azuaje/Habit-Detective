'use strict';

document.addEventListener('DOMContentLoaded', loadHabitsFromLocalStorage);

const addHabitBtn = document.querySelector('#addHabitBtn');
const deleteHabitBtn = document.querySelector('#deleteHabitBtn');

addHabitBtn.addEventListener('click', function () {
  createHabit();
});
deleteHabitBtn.addEventListener('click', function () {
  removeHabit();
});

// Save habits into local storage using JSON
function saveHabitsToLocalStorage() {
  let habits = [];
  document.querySelectorAll('tbody tr').forEach((row) => {
    const habit = {
      name: row.querySelector('th').innerText,
      marks: Array.from(row.querySelectorAll('.markableCell')).map(
        (cell) => cell.innerHTML
      ),
      goal: row.querySelector('.goalCell').innerText,
    };
    habits.push(habit);
  });
  localStorage.setItem('habits', JSON.stringify(habits));
}

// Remove habit from array, update localStorage, and delete the related row.
function removeHabit() {
  let removeHabitName = prompt(
    'Which habit would you like to remove? Type the name of the habit.'
  );
  let savedHabits = JSON.parse(localStorage.getItem('habits'));
  if (savedHabits) {
    const index = savedHabits.findIndex(
      (habit) => habit.name === removeHabitName
    );
    if (index !== -1) {
      savedHabits.splice(index, 1);
      localStorage.setItem('habits', JSON.stringify(savedHabits));
      document.querySelectorAll('tbody tr').forEach((row) => {
        if (row.querySelector('th').innerText === removeHabitName) {
          row.remove();
        }
      });
      calcTotals();
    } else {
      alert('Habit not found.');
    }
  }
}

// Take JSON information and create habits from that.
function loadHabitsFromLocalStorage() {
  const savedHabits = JSON.parse(localStorage.getItem('habits'));
  if (savedHabits) {
    savedHabits.forEach((habit) => {
      const rowHTML = `<tr>
        <th scope="row">${habit.name}</th>
        ${habit.marks
          .map((mark) => `<td class="markableCell">${mark}</td>`)
          .join('')}
        <td class="achievedCell"></td>
        <td class="goalCell">${habit.goal}</td>
      </tr>`;

      document.querySelector('tbody').insertAdjacentHTML('beforeend', rowHTML);
    });

    markCell();
    achievedCell();
    calcTotals();
  }
}

// Calculate achieved and goal totals
function calcTotals() {
  let achievedTotal = 0;
  let goalTotal = 0;

  document.querySelectorAll('tbody tr').forEach((row) => {
    let achievedVal = parseInt(row.querySelector('.achievedCell').innerText);
    let goalVal = parseInt(row.querySelector('.goalCell').innerText);

    achievedVal > 0
      ? (achievedTotal += achievedVal)
      : (achievedTotal = achievedTotal);

    goalVal > 0 ? (goalTotal += goalVal) : (goalTotal = goalTotal);
  });

  document.querySelector('.achievedTotal').innerHTML = `${achievedTotal}`;
  document.querySelector('.goalTotal').innerHTML = `${goalTotal}`;
}
calcTotals();

// Calculate the achieved cells in each row
function achievedCell() {
  document.querySelectorAll('tbody tr').forEach((row) => {
    let count = 0;
    row
      .querySelectorAll('.markableCell')
      .forEach((cell) => (cell.innerHTML !== '' ? count++ : count));
    row.querySelector('.achievedCell').innerHTML = `${count}`;
  });
}

// Mark cells in each row
function markCell() {
  let cells = document.querySelectorAll(
    '.markableCell:not([data-listener="true"])'
  );
  cells.forEach(function (cell) {
    cell.setAttribute('data-listener', 'true');
    cell.addEventListener('click', function () {
      if (cell.innerHTML === '') {
        cell.innerHTML = '✅';
        achievedCell();
        calcTotals();
        saveHabitsToLocalStorage();
      } else {
        cell.innerHTML = '';
        achievedCell();
        calcTotals();
        saveHabitsToLocalStorage();
      }
    });
  });
}
markCell();

// Create a habit
function createHabit() {
  let goal;
  let habit = window.prompt("Write down a habit that you'd like to work on.");

  if (habit && isNaN(habit)) {
    goal = window.prompt(
      'How many days per week would you like to work on it?'
    );
    if (
      goal &&
      !isNaN(goal) &&
      parseInt(goal, 10) >= 0 &&
      parseInt(goal, 10) <= 7
    ) {
      document
        .querySelector('tbody')
        .insertAdjacentHTML(
          'beforeend',
          `<tr><th scope="row">${habit}</th><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="achievedCell"></td><td class="goalCell">${goal}</td></tr>`
        );
      markCell();
      achievedCell();
      calcTotals();
      saveHabitsToLocalStorage();
    } else {
      window.alert('Please enter number between 1 and 7 for a valid goal.');
    }
  } else {
    window.alert('Please strictly enter text for a valid habit.');
  }
}
