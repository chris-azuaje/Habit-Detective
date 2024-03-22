'use strict';

document.addEventListener('DOMContentLoaded', loadHabitsFromLocalStorage);

const addHabitBtn = document.querySelector('#btn__add');
const createNewBtn = document.querySelector('#btn__create');
const deleteHabitBtn = document.querySelector('#btn__delete');

addHabitBtn.addEventListener('click', function () {
  createHabit();
  document.querySelector('#check').checked = false;
});

createNewBtn.addEventListener('click', function () {
  document.querySelector('#check').checked = true;
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
      goal: row.querySelector('.goal__cell').innerText,
    };
    habits.push(habit);
  });
  localStorage.setItem('habits', JSON.stringify(habits));
}

// Remove habit from array, update localStorage, and delete the related row.
function removeHabit() {
  let removeHabitName = prompt(
    'Which habit would you like to remove? Type the name of the habit or "all" to remove all habits at once.'
  );

  // Getting habits from local storage
  let savedHabits = JSON.parse(localStorage.getItem('habits'));

  if (savedHabits) {
    if (removeHabitName.toLowerCase() == 'all') {
      // Remove all habits
      savedHabits.splice(0);

      // Save updated arr into local storage
      localStorage.setItem('habits', JSON.stringify(savedHabits));

      // Remove all habits from UI
      document.querySelectorAll('tbody tr').forEach((row) => {
        row.remove();
      });

      calcTotals();
    } else {
      // Find index of habit wished to remove
      const removeHabitIndex = savedHabits.findIndex(
        (habit) => habit.name === removeHabitName
      );

      if (removeHabitIndex !== -1) {
        // Remove habit from array
        savedHabits.splice(removeHabitIndex, 1);

        // Save updated arr into local storage
        localStorage.setItem('habits', JSON.stringify(savedHabits));

        // Remove selected habit from UI
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
        <td class="achieved__cell"></td>
        <td class="goal__cell">${habit.goal}</td>
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
    let achievedVal = parseInt(row.querySelector('.achieved__cell').innerText);
    let goalVal = parseInt(row.querySelector('.goal__cell').innerText);

    achievedVal > 0
      ? (achievedTotal += achievedVal)
      : (achievedTotal = achievedTotal);

    goalVal > 0 ? (goalTotal += goalVal) : (goalTotal = goalTotal);
  });

  document.querySelector('.achieved__total').innerHTML = `${achievedTotal}`;
  document.querySelector('.goal__total').innerHTML = `${goalTotal}`;
}
calcTotals();

// Calculate the achieved cells in each row
function achievedCell() {
  document.querySelectorAll('tbody tr').forEach((row) => {
    let count = 0;
    row
      .querySelectorAll('.markableCell')
      .forEach((cell) => (cell.innerHTML !== '' ? count++ : count));
    row.querySelector('.achieved__cell').innerHTML = `${count}`;
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
  let habitName = document.getElementById('sidebar__input--text').value;
  let habitNum = Number(document.getElementById('sidebar__input--day').value);

  if (habitName && isNaN(habitName)) {
    document
      .querySelector('tbody')
      .insertAdjacentHTML(
        'beforeend',
        `<tr><th scope="row">${habitName}</th><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="achieved__cell"></td><td class="goal__cell">${habitNum}</td></tr>`
      );
    markCell();
    achievedCell();
    calcTotals();
    saveHabitsToLocalStorage();
    clearInputs();
  }
}

function clearInputs() {
  let habitName = document.getElementById('sidebar__input--text');
  let habitNum = document.getElementById('sidebar__input--day');

  habitName.value = '';
  habitNum.value = '';
}
