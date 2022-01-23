const movies_to_guess = [
  "interstellar",
  "tenet",
  "dune",
  "joker",
  "spiderman",
  "logan",
  "cars",
  "prometheus",
  "rocky",
  "creed",
  "commando",
  "skyfall",
  "godzilla",
];

let answer = "";
let maxWrongGuesses = 7;
let mistakes = 0;
let guesses = [];
let answerState = null;

function randomWordGenerator() {
  answer = movies_to_guess[Math.floor(Math.random() * movies_to_guess.length)];
}

function letterButtons() {
  let alphaButtons = "abcdefghijklmnopqrstuvwxyz"
    .split('')
    .map(
      letter => ` <button class = "btn btn-lg btn-primary m-2"
        id = '` + letter + `'
        onClick = "guessInput('` + letter + `')"
      >
        ` + letter + `
</button>
    `).join('');

  document.getElementById('keyboard').innerHTML = alphaButtons;
}

function guessInput(letterpicked) {
  guesses.indexOf(letterpicked) === -1 ? guesses.push(letterpicked) : null;
  document.getElementById(letterpicked).setAttribute('disabled', true);
  if (answer.indexOf(letterpicked) >= 0) {
    guessedMovie();
    checkForWin();
  }
  
  else if(answer.indexOf(letterpicked) == -1)
  {
    mistakes++;
    updateMistakes();
    checkforLoss();
    hangmanChange();
  }
}

function hangmanChange() {
  document.getElementById('pic').src = './images/' + mistakes + '.png';
}

function checkForWin() {
  if (answerState == answer) {
    
    document.getElementById('keyboard').innerHTML = "Congratulations! You found the correct answer!";

  }
}

function checkforLoss() {
  if (mistakes === maxWrongGuesses) {
    document.getElementById('wordSpotlight').innerHTML = "The movie is: " + answer;
    document.getElementById('keyboard').innerHTML = "You ran out of guesses! Try again.";
  }
}

function guessedMovie() {
  answerState = answer.split('').map(letter => (guesses.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  document.getElementById('wordSpotlight').innerHTML = answerState;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guesses = [];
  document.getElementById('pic').src = './images/0.png';

  randomWordGenerator();
  guessedMovie();
  updateMistakes();
  letterButtons();
}

document.getElementById('maxWrongGuesses').innerHTML = maxWrongGuesses;

randomWordGenerator();
letterButtons();
guessedMovie();
