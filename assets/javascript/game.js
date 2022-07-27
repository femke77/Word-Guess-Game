var wordArray = [
  "persian",
  "bengal",
  "siamese",
  "sphynx",
  "abyssinian",
  "chartreux",
  "savannah",
  "himalayan",
  "ragamuffin",
  "peterbald",
  "ocicat",
  "korat",
  "tonkinese",
  "lykoi",
  "burmilla",
];
var resultArray = [];
var incorrectGuessArray = [];
var wordArrayIndex = 0;
var wins = 0;
var numGuesses;
var word;
var incorrect = document.querySelector("#incorrect");
var charResult = document.querySelector("#charResult");
var wordResult = document.querySelector("#wordResult");
var gameResult = document.querySelector("#gameResult");
var incorrectGuessEl = document.querySelector("#guesses")
var wordID = document.querySelector("#word");
var guessDisplay = document.querySelector("#numGuesses");

function renderWord() {
  // onkeyupHolder to detach event listening during the timeout transition, otherwise key presses will register
  document.onkeyup = document.onkeyupHolder;
  document.onkeyupHolder = null;

  //clear display
  guessDisplay.innerHTML = "";
  incorrect.innerHTML = " ";
  gameResult.innerHTML = " ";
  charResult.innerHTML = " ";
  wordResult.innerHTML = " ";

  // check if we are out of words
  if (wordArrayIndex < wordArray.length) {
    // get next word
    word = wordArray[wordArrayIndex];
    // result array is filled with _ for each letter
    resultArray = new Array(word.length).fill("_");
    // incorrectGuessArray is wiped out
    incorrectGuessArray.length = 0;
    // get number of guesses allowed based on word length
    numGuesses = getNumGuesses();

    var guesses = document.createTextNode(
      "You have " + numGuesses + " guesses for this word."
    );
    guessDisplay.appendChild(guesses);

    // append to html as a string with a space between each _
    wordID.innerHTML = resultArray.join(" ");

    //if the word array is out of words, end the game
  } else {
    // do not listen for key presses
    document.onkeyupHolder = document.onkeyup;
    document.onkeyup = null;
    // clear the word
    wordID.innerHTML = "";
    // display user info
    gameResult.innerHTML = "Game Over!";
    charResult.innerHTML = "You scored " + wins + " out of " + wordArray.length;
    incorrectGuessEl.setAttribute("class", "hide")
  }
}

function getNumGuesses() {
  if (word.length < 5) {
    numGuesses = 2;
  } else if (word.length >= 5 && word.length < 10) {
    numGuesses = 3;
  } else {
    numGuesses = 4;
  }
  return numGuesses;
}

function checkForWon() {
  let won = true;
  // you must have all the letters guessed correctly to win
  resultArray.forEach((val) => {
    if (val === "_") {
      won = false;
    }
  });
  return won;
}

//----------------------------------------GAME----------------------------------------------------

renderWord();

//find all the matching char(s) or let user know if no match. guesses only go down when user is wrong.
document.onkeyup = (event) => {
  var userGuess = event.key.toLowerCase();
  var match = wonGame = lostGame = false;

  // iterate over each character in the word with split then join back to array if match after all "_" updated to char
  word.split("").forEach((val, index) => {
    if (userGuess === val) {
      match = true;
      resultArray[index] = val;
      charResult.innerHTML = "Yes, " + userGuess + " is a correct guess!";
      wordID.innerHTML = resultArray.join(" ");
    }
  });

  // if there is not a match, user loses a guess and the wrong guess renders
  if (!match) {
    numGuesses--;
    charResult.innerHTML =
      "That letter is not in the word. " +
      "&nbsp" +
      numGuesses +
      " guesses remaining.";
    incorrectGuessArray.push(userGuess);
    incorrect.innerHTML = incorrectGuessArray.join(" ");
  }

  // after each guess check if user won, if not, check if they lost and if so, give them the word
  wonGame = checkForWon();

  if (wonGame) {
    wins++;
    gameResult.innerHTML = "You won this round!";
    charResult.innerHTML = "";
  } else if (numGuesses === 0) {
      lostGame = true;
      wordResult.innerHTML =
        "The word was " + "<span style='color:red'>" + word + "</span>" + ".";  
  }

  //if the game is won or lost, its over, so start a new word after a small timeout
  if (wonGame || lostGame) {
    wordArrayIndex++;
    document.onkeyupHolder = document.onkeyup;
    document.onkeyup = null;
    setTimeout(() => {
      renderWord();
    }, 4000);
  }
};


