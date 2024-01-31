let completionCells = document.querySelectorAll('.completion-cell');

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
