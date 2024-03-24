'use strict';

const addHabitBtn = document.querySelector('#btn__add');
const createNewBtn = document.querySelector('#btn__create');
const deleteHabitBtn = document.querySelector('#btn__delete');

document.addEventListener('DOMContentLoaded', loadHabitsFromLocalStorage);

addHabitBtn.addEventListener('click', function () {
  createHabit();
});

createNewBtn.addEventListener('click', function () {
  isOpenFunction(true);
});

deleteHabitBtn.addEventListener('click', function () {
  removeHabit();
});

// Opening Functions
isOpenFunction(false);
markCell();

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
    'Select a habit to say goodbye to:\nEnter the name of the habit you wish to remove, or type "all" to clear your slate and start fresh.'
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
  // Get habits from local storage
  const savedHabits = JSON.parse(localStorage.getItem('habits'));
  if (savedHabits) {
    savedHabits.forEach((habit) => {
      // Each row HTML
      const rowHTML = `<tr>
        <th scope="row">${habit.name}</th>
        ${habit.marks
          .map((mark) => `<td class="markableCell">${mark}</td>`)
          .join('')}
        <td class="achieved__cell"></td>
        <td class="goal__cell">${habit.goal}</td>
      </tr>`;

      // Insert row HTML to main
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

    achievedTotal += achievedVal;
    goalTotal += goalVal;
  });

  document.querySelector('.achieved__total').innerHTML = `${achievedTotal}`;
  document.querySelector('.goal__total').innerHTML = `${goalTotal}`;
}
calcTotals();

// Calculate the achieved cells in each row
function achievedCell() {
  document.querySelectorAll('tbody tr').forEach((row) => {
    // Count starts at 0
    let count = 0;
    // Count increases if marked or stays the same if unmarked
    row
      .querySelectorAll('.markableCell')
      .forEach((cell) => (cell.innerHTML !== '' ? count++ : count));
    // Count is shown in related achieved cell
    row.querySelector('.achieved__cell').innerHTML = `${count}`;
  });
}

// Create a habit
function createHabit() {
  let habitName = document.getElementById('sidebar__input--text').value;
  let habitNum = Number(document.getElementById('sidebar__input--day').value);

  if (habitName && isNaN(habitName)) {
    document
      .querySelector('tbody')
      .insertAdjacentHTML(
        'beforeend',
        `<tr><th scope="row">${habitName}</th><td class="markableCell" ></td><td class="markableCell" ></td><td class="markableCell" ></td><td class="markableCell" ></td><td class="markableCell" ></td><td class="markableCell" ></td><td class="markableCell" ></td><td class="achieved__cell"></td><td class="goal__cell">${habitNum}</td></tr>`
      );
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

// ---------- Sidebar Functionality ----------

const sidebarExitBtn = document.getElementById('sidebar__exit');
const sidebarBtn = document.getElementById('sidebar__btn');
sidebarExitBtn.addEventListener('click', function () {
  isOpenFunction(false);
});
sidebarBtn.addEventListener('click', function () {
  isOpenFunction(true);
});

let isSidebarOpen = false;

// Mark cells in each row
function markCell() {
  document.querySelectorAll('.markableCell').forEach((cell) => {
    cell.addEventListener('click', function () {
      if (!isSidebarOpen) {
        // Only allow marking if sidebar is not open
        if (cell.innerHTML === '') {
          cell.innerHTML = '✅';
        } else {
          cell.innerHTML = '';
        }
        achievedCell();
        calcTotals();
        saveHabitsToLocalStorage();
      }
    });
  });
}

function isOpenFunction(state) {
  const bodyMain = document.getElementById('body__main');
  const sideBar = document.getElementById('sidebar');
  const sidebarBtn = document.getElementById('sidebar__btn');
  const createNewBtn = document.getElementById('btn__create');
  const deleteBtn = document.getElementById('btn__delete');

  let isOpen = state;

  if (isOpen == true) {
    sideBar.style.marginLeft = '15px';
    sidebarBtn.style.marginLeft = '-45px';
    bodyMain.style.opacity = '0.5';
    createNewBtn.disabled = true;
    deleteBtn.disabled = true;
    markCell();
  }
  if (isOpen == false) {
    sideBar.style.marginLeft = '-380px';
    sidebarBtn.style.marginLeft = '0px';
    bodyMain.style.opacity = '1';
    createNewBtn.disabled = false;
    deleteBtn.disabled = false;
    markCell();
  }
}
