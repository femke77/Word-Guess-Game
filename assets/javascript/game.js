
//eventually this will be an array of words and we will randomly generate one for each game
var word = "doll";

//i think we will render the result at an array
var resultArray = new Array(word.length).fill("_")



//will find all the matching char
document.onkeyup = (event) => {
    var userGuess = event.key.toLowerCase();
    var match = false;
    
    word.split("").forEach(char => {
        console.log(char);
        if (userGuess === char){
            match = true;
            document.querySelector("#result").innerHTML = "yes " + userGuess + " is correct"
        } 
    });
    if (match === false){
        document.querySelector("#result").innerHTML = "no match"
    }

}