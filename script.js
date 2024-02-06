// Completion cells and achieved total cells
let completionCells = document.querySelectorAll('.completion-cell');
let achievedTotal = document.querySelector('.achieved-total');

// Edit btn and new habit btn
const editBtn = document.querySelectorAll('.edit-btn');
const newHabitBtn = document.querySelector('#new-habit-btn');

// Modal window with inner buttons
const modalWindow = document.querySelector('.modal-window');
const exitModalBtn = document.querySelector('#exit-modal-btn');
const submitHabitBtn = document.querySelector('#submit-habit-btn');
const deleteHabitBtn = document.querySelector('#delete-habit-btn');

// Toggle Modal Window
function toggleWindow() {
  modalWindow.classList.toggle('hidden-class');
}

// Open/close modal when edit btn is clicked
editBtn.forEach((e) =>
  e.addEventListener('click', function () {
    modalWindow.classList.toggle('hidden-class');
  })
);

// Open/close modal when new habit btn is clicked
newHabitBtn.addEventListener('click', function () {
  toggleWindow();
});

// Close modal when exit btn is clicked
exitModalBtn.addEventListener('click', function () {
  toggleWindow();
});

// Close modal when delete habit is clicked
deleteHabitBtn.addEventListener('click', function () {
  toggleWindow();
});

// Function to update achieved count
function updateAchievedCount(row) {
  let achievedCell = row.querySelector('.achieved-cell');
  let count = 0;
  const completionCellsNew = row.querySelectorAll('.completion-cell');
  completionCellsNew.forEach((cell) => {
    if (cell.textContent === 'X') {
      count++;
    }
  });
  achievedCell.textContent = count;
}

// Adds a new habit row
submitHabitBtn.addEventListener('click', function () {
  // Get values from input fields
  const behaviorInput = document.getElementById('behavior').value;
  const goalInput = document.getElementById('goal').value;

  // Create a new row element
  const newRow = document.createElement('tr');
  newRow.classList.add('row');

  // Populate the new row with cells
  newRow.innerHTML = `
    <th class="action">${behaviorInput}</th>
    <td class="completion-cell"></td>
    <td class="completion-cell"></td>
    <td class="completion-cell"></td>
    <td class="completion-cell"></td>
    <td class="completion-cell"></td>
    <td class="completion-cell"></td>
    <td class="completion-cell"></td>
    <td class="achieved-cell">0</td>
    <td class="goal-cell">${goalInput}</td>
    <td class="net-cell"></td>
    <td><button class="edit-btn">Edit</button></td>
  `;

  // Append the new row to the table body
  document.querySelector('tbody').appendChild(newRow);

  // Add click event listener to new edit button
  newRow.querySelector('.edit-btn').addEventListener('click', function () {
    modalWindow.classList.toggle('hidden-class');
  });

  const newCompletionCells = newRow.querySelectorAll('.completion-cell');
  newCompletionCells.forEach((cell) => {
    cell.addEventListener('click', function () {
      if (cell.textContent === 'X') {
        cell.textContent = '';
      } else {
        cell.textContent = 'X';
      }
      // Update achieved count when a cell is clicked
      updateAchievedCount(newRow);
    });
  });

  toggleWindow();
});

// Add/remove 'x' to each completion cell
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
