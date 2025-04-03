const words = [
	'JAVASCRIPT',
	'HTML',
	'CSS',
	'NODE',
	'REACT',
	'ANGULAR',
	'JQUERY',
	'VUE'
];

const template = `
  <div id="hangman-game">
    <svg width="200" height="250">
      <line x1="10" y1="230" x2="100" y2="230" stroke="black" stroke-width="4" />
      <line x1="55" y1="230" x2="55" y2="50" stroke="black" stroke-width="4" />
      <line x1="55" y1="50" x2="120" y2="50" stroke="black" stroke-width="4" />
      <line x1="120" y1="50" x2="120" y2="80" stroke="black" stroke-width="4" />
      <circle id="head" cx="120" cy="100" r="20" stroke="black" stroke-width="4" fill="none" />
      <line id="body" x1="120" y1="120" x2="120" y2="170" stroke="black" stroke-width="4" />
      <line id="leftArm" x1="120" y1="130" x2="100" y2="150" stroke="black" stroke-width="4" />
      <line id="rightArm" x1="120" y1="130" x2="140" y2="150" stroke="black" stroke-width="4" />
      <line id="leftLeg" x1="120" y1="170" x2="100" y2="200" stroke="black" stroke-width="4" />
      <line id="rightLeg" x1="120" y1="170" x2="140" y2="200" stroke="black" stroke-width="4" />
    </svg>
  </div>
`;

const maxWrongGuesses = 6;
const hangmanParts = [
	"leftLeg", "rightLeg", "rightArm", "leftArm", "body", "head"
];
const btnStart = document.querySelector('#newGameButton');
btnStart.addEventListener('click', initializeGame)

let wordToGuess = '';
let guessedLetters = [];
let wrongGuesses = 0;
let imageCount = 1;


function selectRandomWord() {
	return words[Math.floor(Math.random() * words.length)];
}

function initializeGame() {
	wordToGuess = selectRandomWord();
	guessedLetters = Array(wordToGuess.length).fill('_');
	wrongGuesses = 0;

	updateWordDisplay();
	updateMeltingSnowmanGraphic();

	const lettersContainer = document.querySelector('.letters');
	while (lettersContainer.firstChild) {
		lettersContainer.removeChild(lettersContainer.firstChild);
	}

	for (let i = 0; i < 26; i++) {
		const letter = String.fromCharCode(65 + i);
		const button = document.createElement('button');
		button.innerText = letter;
		button.addEventListener('click', function () {
			this.disabled = true;
			handleGuess(letter);
		});
		lettersContainer.appendChild(button);
	}
	const messageContainer = document.querySelector('.message');
	messageContainer.innerText = '';
	btnStart.style.display = 'none';
}

function updateWordDisplay() {
	const wordContainer = document.querySelector('.word');
	wordContainer.innerText = guessedLetters.join(' ');
}

function handleGuess(letter) {
	if (guessedLetters.includes(letter)) {
		return;
	}

	guessedLetters.forEach((guessedLetter, index) => {
		if (wordToGuess[index] === letter) {
			guessedLetters[index] = letter;
		}
	});

	if (!wordToGuess.includes(letter)) {
		wrongGuesses++;
		removeHangmanPart();
	}
	updateWordDisplay();
	checkWinOrLose();
}

function updateMeltingSnowmanGraphic() {
	const meltingSnowmanContainer = document.querySelector('.MeltingSnowman');
	meltingSnowmanContainer.innerHTML = template;
}

function removeHangmanPart() {
	if (wrongGuesses <= maxWrongGuesses) {
		const partId = hangmanParts[wrongGuesses - 1];
		const partElement = document.getElementById(partId);
		if (partElement) {
			partElement.remove();
		}
	}
}



function checkWinOrLose() {
	if (guessedLetters.join('') === wordToGuess) {
		const messageContainer = document.querySelector('.message');
		messageContainer.innerText = 'You win!';
		const letterButtons = document.querySelectorAll('.letters button');
		letterButtons.forEach(button => {
			button.disabled = true;
			button.removeEventListener('click', handleGuess);
		});
	} else if (wrongGuesses >= maxWrongGuesses) {
		const messageContainer = document.querySelector('.message');
		messageContainer.innerText = `You lose! The word was "${wordToGuess}".`;
		const letterButtons = document.querySelectorAll('.letters button');
		letterButtons.forEach(button => {
			button.disabled = true;
			button.removeEventListener('click', handleGuess);
		});
		btnStart.style.display = 'inline-block';

	}
}
window.addEventListener('load', initializeGame);