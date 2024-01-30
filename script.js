let completionCell = document.querySelectorAll('.completionCell');
let achievedCell = document.querySelectorAll('.achievedCell');

completionCell.forEach((e) =>
  e.addEventListener('click', function () {
    if (e.textContent === 'X') {
      e.textContent = '';
    } else {
      e.textContent = 'X';
    }
  })
);
