
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

// Function to run after each guess is made 
function roundComplete() {
	// Log inital status update in the console
	console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

	// Update the HTML to reflect the new number of guesses, and update correct guesses
	document.getElementById("guesses-left").innerHTML = numGuesses;
	// Print the array of guesses and blanks onto the page
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
	// Print the wrong guesses onto the page
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

	// If all the letters match the solution
	if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
		// Add to the win counter and alert the user
		winCounter++;
		alert("You escape the noose to ride another day!");

		// Update the win counter in the HTML and restart the game
		document.getElementById("win-counter").innerHTML = winCounter;
		startGame();
	}

	// If user runs out of guesses
	else if (numGuesses === 0) {
		// Add to the loss counter and alert the user
		lossCounter++;
		alert("You have met your fate by the Hangman's Noose!");

		// Update the loss counter in the HTML and restart the game
		document.getElementById("loss-counter").innerHTML = lossCounter;
		startGame();
	}
}; 

// MAIN PROCESS
// ==========================================================================

// Start game
startGame();

// Initiate click listners
document.onkeyup = function(event) {
	// Converts all key clicks to lowercase letters
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	// Runs the code to check for correctness
	checkLetters(letterGuessed);
	// Runs the code after each round is done
	roundComplete();
}
