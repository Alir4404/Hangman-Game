
var wordsList = ["saddle", "horse", "saloon", "whiskey", "dust", "cowboy", "sheriff", "appaloosa", "horseshoe"];

var chosenWord = "";
var lettersInChosenWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];

var winCounter = 0;
var lossCounter = 0;
var numGuesses = 12;


function startGame() {
	numGuesses = 12;
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  
  lettersInChosenWord = chosenWord.split("");
  
	numBlanks = lettersInChosenWord.length;

	console.log(chosenWord);

	blanksAndSuccesses = [];

	wrongGuesses = [];

	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_");
	};

	console.log(blanksAndSuccesses);

	document.getElementById("guesses-left").innerHTML = numGuesses;
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
};


function checkLetters(letter) {
	var letterInWord = false;

	for (var i = 0; i < numBlanks; i++) {
		if (chosenWord[i] === letter) {
			letterInWord = true;
		}
	}

	if (letterInWord) {
		for (var j = 0; j < numBlanks; j++) {
			if (chosenWord[j] === letter) {
				blanksAndSuccesses[j] = letter;
			}
		}
		console.log(blanksAndSuccesses);
  }
  
	else {
		wrongGuesses.push(letter);
		numGuesses--;
	}
};


function roundComplete() {

	console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);


	document.getElementById("guesses-left").innerHTML = numGuesses;
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

	if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
		winCounter++;
		alert("You escape the noose to ride another day!");

		document.getElementById("win-counter").innerHTML = winCounter;
		startGame();
	}

	else if (numGuesses === 0) {
		lossCounter++;
		alert("You have met your fate by the Hangman's Noose!");

		document.getElementById("loss-counter").innerHTML = lossCounter;
		startGame();
	}
}; 

startGame();

document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();
}
