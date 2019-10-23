var wordArray = [];

//score will be for guessing a word (e.g. filling out the resultArray) before guesses run out
var score = 0;
var numGuesses = 8;

//eventually this will be an array of words and we will randomly generate one for each game
var word = "doll";

//i think we will render the result at an array
var resultArray = new Array(word.length).fill("_");

//show the user the wrong guesses
var incorrectGuessArray = [];


//will find all the matching char or let you know if no match
document.onkeyup = (event) => {
    var userGuess = event.key.toLowerCase();
    var match = false;   
    word.split("").forEach((val, index) => {
        if (userGuess === val){
            match = true;
            resultArray[index] = val;
            document.querySelector("#result").innerHTML = "yes " + userGuess + " is correct"
            document.querySelector("#word").innerHTML = resultArray.join(" ");
        } 
    });
    if (!match){
        document.querySelector("#result").innerHTML = "no match";
        incorrectGuessArray.push(userGuess);
        document.querySelector("#wrongGuesses").innerHTML = incorrectGuessArray.join(" ");

    }
}

