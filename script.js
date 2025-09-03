const board = document.getElementById('board');
const toggle = document.getElementById('invisible-checkbox');
const title = document.getElementById('title');

const answer = 'JEWEL';

const keyboardContent = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

let gameOver = false;
let row = 0;
let column = 0;
let numberCorrect = 0;
let letterList = {};

function initialize() {
  gameOver = false;
  row = 0;
  column = 0;
  numberCorrect = 0;

  // Create and assign IDs to board tiles
  for (i = 0; i <= 5; i++) {
    for (j = 0; j <= 4; j++) {
      let tile = document.createElement('span');
      tile.setAttribute('id', `tile${i}-${j}`);
      tile.classList.add('tile', 'neutral');
      board.appendChild(tile);
      console.log(tile.id);
    }
  }

  // Create and assign IDs to keyboard keys
  for (i = 0; i < keyboardContent.length; i++) {
    for (j = 0; j < keyboardContent[i].length; j++) {
      let key = document.createElement('span');
      key.setAttribute('id', `key-${keyboardContent[i][j]}`);
      key.textContent = keyboardContent[i][j];
      key.classList.add('key', 'neutral');
      document.getElementById('keyboard').appendChild(key);
      console.log(key.id);
    }
  }

  // Make ENTER and BACKSPACE keys wide, adjust font sizes
  document.getElementById('key-ENTER').classList.add('wide-key');
  document.getElementById('key-ENTER').style.fontSize = '15px';

  document.getElementById('key-⌫').classList.add('wide-key');
  document.getElementById('key-⌫').style.fontSize = '20px';

  document.getElementById('answer').textContent = `Answer: ${answer}`;

  // Count number of each letter in the answer word

  for (i = 0; i < answer.length; i++) {
    letterList[answer[i]]
      ? (letterList[answer[i]] += 1)
      : (letterList[answer[i]] = 1);
  }

  console.log(letterList);

  // console.log(`tile${row}-${column}`, typeof `tile${row}-${column}`);
}

// Call iniitialization function to set up game
initialize();

// Change color properties when toggle switch is clicked
toggle.addEventListener('change', function () {
  document.documentElement.classList.toggle('dark-mode');
});

// Detect and react to key presses
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
          let tile = document.getElementById(`tile${row}-${i}`);
          let letter = tile.textContent;
          let key = document.getElementById(`key-${letter}`);
          console.log(letter);

          // Indicate correct letter
          if (letter === answer[i]) {
            numberCorrect++;

            letterList[letter] -= 1;

            tile.classList.add('correct');
            tile.classList.remove('neutral');

            key.classList.add('correct');
            key.classList.remove('neutral');
          }

          // Mark absent the ones which the 'present' condition will miss due to letterList count
          else {
            tile.classList.add('absent');
            key.classList.add('absent');
          }
        }

        for (i = 0; i < answer.length; i++) {
          let tile = document.getElementById(`tile${row}-${i}`);
          let letter = tile.textContent;
          let key = document.getElementById(`key-${letter}`);

          // Indicate included letter with wrong position
          if (letter !== answer[i] && answer.includes(letter)) {
            if (letterList[letter] > 0) {
              tile.classList.add('present');
              tile.classList.remove('neutral');

              key.classList.add('present');
              key.classList.remove('neutral');
            }

            letterList[letter] -= 1;
          }
          // Indicate incorrect letter
          else {
            tile.classList.add('absent');
            tile.classList.remove('neutral');

            key.classList.add('absent');
            key.classList.remove('neutral');
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

      // Reset letterList object for counting new row's letters

      letterList = {};
      for (i = 0; i < answer.length; i++) {
        letterList[answer[i]]
          ? (letterList[answer[i]] += 1)
          : (letterList[answer[i]] = 1);
      }

      if (column === 5 && row === 5) {
        gameOver = true;
      }
    }

    if (gameOver === true && numberCorrect < 5) {
      // Triggering opacity transitions
      title.style.opacity = 0;
      setTimeout(() => {
        title.textContent = 'YOU LOST!';
        title.style.opacity = 1;
      }, 1);

      document.getElementById('answer').style.opacity = 1;
    }
  }
});
