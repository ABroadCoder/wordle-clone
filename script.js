const board = document.getElementById('board');

let gameOver = false;

const word = 'LANCE';
let row = 0;
let column = 0;

function initialize() {
  for (i = 0; i <= 5; i++) {
    for (j = 0; j <= 4; j++) {
      let tile = document.createElement('span');
      tile.setAttribute('id', `tile${i}-${j}`);
      tile.className = 'tile';
      board.appendChild(tile);
    }
  }
}

initialize();
console.log(`tile${row}-${column}`, typeof `tile${row}-${column}`);

document.addEventListener('keyup', function (e) {
  console.log(e.code);

  if (e.code.startsWith('Key') && e.code.length === 4 && column <= 4) {
    document.getElementById(`tile${row}-${column}`).textContent =
      e.code[3].toString();
    if (column < 5) {
      column++;
    }
    console.log(`current row: ${row}; current column: ${column}`);
  }

  if (e.code === 'Backspace') {
    if (0 < column && column <= 5) {
      document.getElementById(`tile${row}-${column - 1}`).textContent = '';
      column--;
      console.log(`current row: ${row}; current column: ${column}`);
    }
  }
});
