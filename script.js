const board = document.getElementById('board');

const answer = 'CANNY';

let gameOver = false;
let row = 0;
let column = 0;
let numberCorrect = 0;

function initialize() {
  gameOver = false;
  row = 0;
  column = 0;
  numberCorrect = 0;

  for (i = 0; i <= 5; i++) {
    for (j = 0; j <= 4; j++) {
      let tile = document.createElement('span');
      tile.setAttribute('id', `tile${i}-${j}`);
      tile.classList.add('tile', 'neutral');
      board.appendChild(tile);
    }
  }

  document.getElementById('answer').textContent = answer;

  // Count number of each letter in the answer word
  let letterList = {};

  for (i = 0; i < answer.length; i++) {
    letterList[answer[i]]
      ? (letterList[answer[i]] += 1)
      : (letterList[answer[i]] = 1);
  }

  console.log(letterList);

  // console.log(`tile${row}-${column}`, typeof `tile${row}-${column}`);
}

initialize();

document.addEventListener('keyup', function (e) {
  console.log(e.code);

  if (gameOver === false) {
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

    if (e.code === 'Enter') {
      // Check that player is at the end of the row
      if (column === 5 && row <= 5) {
        numberCorrect = 0;

        // Updating tile colors to indicate guess accuracy
        for (i = 0; i < answer.length; i++) {
          // Indicate correct letter
          if (
            document.getElementById(`tile${row}-${i}`).textContent === answer[i]
          ) {
            numberCorrect++;
            document.getElementById(`tile${row}-${i}`).classList.add('correct');
            document
              .getElementById(`tile${row}-${i}`)
              .classList.remove('neutral');
          }
          // Indicate included letter with wrong position
          if (
            document.getElementById(`tile${row}-${i}`).textContent !==
              answer[i] &&
            answer.includes(
              document.getElementById(`tile${row}-${i}`).textContent
            )
          ) {
            document.getElementById(`tile${row}-${i}`).classList.add('present');
            document
              .getElementById(`tile${row}-${i}`)
              .classList.remove('neutral');
          }
          // Indicate incorrect letter
          else {
            document.getElementById(`tile${row}-${i}`).classList.add('absent');
            document
              .getElementById(`tile${row}-${i}`)
              .classList.remove('neutral');
          }
        }
        // Check win condition
        if (numberCorrect === 5) {
          gameOver = true;
          document.getElementById('title').textContent = 'YOU WIN!';
        }
        // Move to beginning of next row
        if (row < 5) {
          row++;
          column = 0;
        }
      }

      if (column === 5 && row === 5) {
        gameOver = true;
      }
    }

    if (gameOver === true) {
      document.getElementById('answer').style.opacity = 1;
    }
  }
});
