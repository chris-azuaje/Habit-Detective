let completionCells = document.querySelectorAll('.completion-cell');
let achievedTotal = document.querySelector('.achieved-total');
const editBtn = document.querySelectorAll('.edit-btn');
const editWindow = document.querySelector('.edit-window');
const newHabitBtn = document.querySelector('#new-habit-btn');
const submitHabitBtn = document.querySelector('#submit-habit-btn');
const exitModalBtn = document.querySelector('#exit-modal-btn');
const deleteHabitBtn = document.querySelector('#delete-habit-btn');

// Toggle Modal Window
function toggleWindow() {
  editWindow.classList.toggle('hidden-class');
}

editBtn.forEach((e) =>
  e.addEventListener('click', function () {
    editWindow.classList.toggle('hidden-class');
  })
);

newHabitBtn.addEventListener('click', function () {
  // deleteHabitBtn.remove();
  toggleWindow();
});

submitHabitBtn.addEventListener('click', function () {
  toggleWindow();
});

exitModalBtn.addEventListener('click', function () {
  toggleWindow();
});

deleteHabitBtn.addEventListener('click', function () {
  toggleWindow();
});

// Add click event listener to each completion cell
completionCells.forEach((cell) =>
  cell.addEventListener('click', function () {
    if (cell.textContent === 'X') {
      cell.textContent = '';
    } else {
      cell.textContent = 'X';
    }
    // Update achieved count when a cell is clicked
    updateAchievedCount(cell.parentElement);
  })
);

// Function to update achieved count
function updateAchievedCount(row) {
  let achievedCell = row.querySelector('.achieved-cell');
  let count = 0;
  completionCells.forEach((cell) => {
    if (cell.textContent === 'X' && cell.parentElement === row) {
      count++;
    }
  });
  achievedCell.textContent = count;
}

// EDIT THIS
if (editWindow.classList.contains('hidden-class')) {
  editBtn.forEach((e) => e.removeAttribute('disabled'));
} else {
  editBtn.forEach((e) => e.setAttribute('disabled'));
}
