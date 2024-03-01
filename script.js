'use strict';

const addHabitBtn = document.querySelector('#addHabitBtn');
addHabitBtn.addEventListener('click', function () {
  createHabit();
});

let habit_1 = {
  habit: 'Go to the gym',
  mon: false,
  tue: false,
  wed: true,
  thur: true,
  fri: false,
  sat: true,
  sun: false,
  goal: 3,
};

// Calculate achieved, goal, and net totals
function calcTotals() {
  let achievedTotal = 0;
  let goalTotal = 0;
  let netTotal = 0;

  document.querySelectorAll('tbody tr').forEach((row) => {
    let achievedVal = parseInt(row.querySelector('.achievedCell').innerText);
    let goalVal = parseInt(row.querySelector('.goalCell').innerText);
    let netVal = parseInt(row.querySelector('.netCell').innerText);

    achievedVal > 0
      ? (achievedTotal += achievedVal)
      : (achievedTotal = achievedTotal);

    goalVal > 0 ? (goalTotal += goalVal) : (goalTotal = goalTotal);

    netVal > 0 ? (netTotal += netVal) : (netTotal = netTotal);
  });

  document.querySelector('.achievedTotal').innerHTML = `${achievedTotal}`;

  document.querySelector('.goalTotal').innerHTML = `${goalTotal}`;

  document.querySelector('.netTotal').innerHTML = `${netTotal}`;
}
calcTotals();

// Calculate the net cells in each row
function netCell() {
  document.querySelectorAll('tbody tr').forEach((row) => {
    let achieved = parseInt(row.querySelector('.achievedCell').innerText);
    let goal = parseInt(row.querySelector('.goalCell').innerText);

    row.querySelector('.netCell').innerHTML = `${goal - achieved}`;
  });
}

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
        netCell();
        calcTotals();
      } else {
        cell.innerHTML = '';
        achievedCell();
        netCell();
        calcTotals();
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
          `<tr><th scope="row">${habit}</th><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="markableCell"></td><td class="achievedCell"></td><td class="goalCell">${goal}</td><td class="netCell"></td></tr>`
        );
      markCell();
      achievedCell();
      calcTotals();
    } else {
      window.alert('Please enter number between 1 and 7 for a valid goal.');
    }
  } else {
    window.alert('Please strictly enter text for a valid habit.');
  }
}

// Local Storage Practice

let habitObj = {
  habit: 'Example Habit',
  mon: false,
  tue: false,
  wed: true,
  thur: true,
  fri: false,
  sat: true,
  sun: false,
  goal: 3,
};

let myObj = {
  name: 'Chris',
  age: 26,
};

let myObj2 = Object.create(myObj);
myObj2.name = 'Thomas';
myObj2.age = 35;

console.log(myObj);
console.log(myObj2);

// Creates string version of object
let myObj_serialized = JSON.stringify(myObj);

// console.log(myObj_serialized);

// Converts a string and converts it to an object.
let myObj_deserialized = JSON.parse(localStorage.getItem('myObj'));

// console.log(myObj_deserialized);
