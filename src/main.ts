// TODO: Update canvas size to make it larger - Priority 1
// TODO: implement computer AI - Priority 2
// TODO: Update UI with styling, make it retro like an arcade game - Priority 3
// TODO: make a mobbile version with a slider for each player to move the paddle - Priority - 4
// TODO: Refactor into separate files
// TODO: Refactor variables into objects for better organisation
// TODO: Use document.querySelectorAll for getting all input elements

import { drawGameState } from "./scripts/draw";

// Get all elements
const winningScoreInput = document.querySelector(
	".winning-score"
) as HTMLInputElement;
const ballSpeedInput = document.querySelector(
	".ball-speed"
) as HTMLInputElement;
const paddleSpeedInput = document.querySelector(
	".paddle-speed"
) as HTMLInputElement;
const startGameButton = document.querySelector(
	".btn-start-game"
) as HTMLButtonElement;

const winningScoreValue = document.querySelector(
	".winning-score-value"
) as HTMLSpanElement;
const ballSpeedValue = document.querySelector(
	".ball-speed-value"
) as HTMLSpanElement;
const paddleSpeedValue = document.querySelector(
	".paddle-speed-value"
) as HTMLSpanElement;

const countdown = document.querySelector(".countdown") as HTMLDivElement;
const countdownOverlay = document.querySelector(
	".countdown-overlay"
) as HTMLDivElement;
const menu = document.querySelector(".menu") as HTMLDivElement;

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

// Initial game settings
let winningScore = 1;
let ballSpeed = 3;
let paddleSpeed = 5;

const updateSetting = (
	setting: "ballSpeed" | "paddleSpeed" | "winningScore"
) => {
	return (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		if (setting === "winningScore") {
			winningScore = parseInt(value);
			winningScoreValue.innerHTML = value;
		} else if (setting === "ballSpeed") {
			ballSpeed = parseInt(value);
			ballSpeedValue.innerHTML = value;

			ballSpeedX = ballSpeed;
			ballSpeedY = ballSpeed;
		} else if (setting === "paddleSpeed") {
			paddleSpeed = parseInt(value);
			paddleSpeedValue.innerHTML = value;
		}
	};
};

winningScoreInput.addEventListener("input", updateSetting("winningScore"));
ballSpeedInput.addEventListener("input", updateSetting("ballSpeed"));
paddleSpeedInput.addEventListener("input", updateSetting("paddleSpeed"));

// Vertical position of paddles
let leftPaddleY = 160;
let rightPaddleY = 160;

const resetPaddles = () => {
	leftPaddleY = 160;
	rightPaddleY = 160;
};

// Velocity of paddles
let leftPaddleVelocity = 0;
let rightPaddleVelocity = 0;

const setPaddleVelocity = (paddle: "left" | "right", velocity: number) => {
	if (paddle === "left") {
		leftPaddleVelocity = velocity;
	} else {
		rightPaddleVelocity = velocity;
	}
};

// Initial ball position
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;

// Speed of ball movement on x and y axis
let ballSpeedX = ballSpeed;
let ballSpeedY = ballSpeed;

// Player scores
let leftPlayerScore = 0;
let rightPlayerScore = 0;

const didPlayerWin = (player: "left" | "right") => {
	return player === "left"
		? leftPlayerScore === winningScore
		: rightPlayerScore === winningScore;
};

// Computer difficulty
let computerDifficulty = 0.1;

// Is playerTwo a computer?
let isPlayerTwoComputer = false;

// Game variables
let isGameStarted = false;

// Drawing variables
const paddleWidth = 10;
const paddleHeight = 80;

// Movement config
const movementConfig: Record<string, Record<string, () => void>> = {
	arrowup: {
		keydown: () => setPaddleVelocity("right", -paddleSpeed),
		keyup: () => setPaddleVelocity("right", 0),
	},
	arrowdown: {
		keydown: () => setPaddleVelocity("right", paddleSpeed),
		keyup: () => setPaddleVelocity("right", 0),
	},
	w: {
		keydown: () => setPaddleVelocity("left", -paddleSpeed),
		keyup: () => setPaddleVelocity("left", 0),
	},
	s: {
		keydown: () => setPaddleVelocity("left", paddleSpeed),
		keyup: () => setPaddleVelocity("left", 0),
	},
};

// Event handlers
const handleKeypressEvent = (event: KeyboardEvent) => {
	if (!isGameStarted) return;
	const eventType = event.type;

	// Loop over movementConfig. If the pressed key is one of the keys in movementConfig, set the value based on the type of event (keydown/keyup) by calling the function sotred in movementConfig.
	Object.keys(movementConfig).forEach((key) => {
		if (event.key.toLowerCase() === key) {
			movementConfig[key][eventType]();
		}
	});
};

// Game logic
const checkForWin = () => {
	if (!(didPlayerWin("left") || didPlayerWin("right"))) return;

	alert(didPlayerWin("left") ? "Player 1 Wins!" : "Player 2 Wins!");

	leftPlayerScore = 0;
	rightPlayerScore = 0;
	isGameStarted = false;
	canvas.style.display = "none";
	menu.style.display = "block";
	startGameButton.disabled = false;
	resetPaddles();
};

const updateGameplay = () => {
	// Update paddle positions
	leftPaddleY += leftPaddleVelocity;
	rightPaddleY += rightPaddleVelocity;

	// Update ball position
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	// Bounce the ball if it hits the top or bottom of the canvas
	if (ballY < 0 || ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}

	// Check if the ball passed the left paddle by check if its X position is less then paddleWidth
	if (ballX < paddleWidth) {
		if (ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
			// Bounce the ball off the left paddle
			ballSpeedX = -ballSpeedX;
		} else {
			// Reset ball position to center of canvas, increment right paddle player score, check for win
			ballX = canvas.width / 2;
			ballY = canvas.height / 2;
			rightPlayerScore++;
			checkForWin();
		}
	}

	// Check if the ball passed the right paddle by checking if its X position is greater than canvas width - paddleWidth
	if (ballX > canvas.width - paddleWidth) {
		if (ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
			// Bounce the ball off the right paddle
			ballSpeedX = -ballSpeedX;
		} else {
			// Reset ball position to center of canvas, increment left paddle player score, check for win
			ballX = canvas.width / 2;
			ballY = canvas.height / 2;
			leftPlayerScore++;
			checkForWin();
		}
	}

	// Make sure left paddle stays within the canvas
	if (leftPaddleY < 0) {
		leftPaddleY = 0;
	} else if (leftPaddleY > canvas.height - paddleHeight) {
		leftPaddleY = canvas.height - paddleHeight;
	}

	// Make sure right paddle stays within the canvas
	if (rightPaddleY < 0) {
		rightPaddleY = 0;
	} else if (rightPaddleY > canvas.height - paddleHeight) {
		rightPaddleY = canvas.height - paddleHeight;
	}

	// Insert computer player 2 logic here

	// Draw the updated game on the canvas
	drawGameState(
		canvas,
		context!,
		{ left: leftPlayerScore, right: rightPlayerScore },
		{ leftPaddleY, rightPaddleY, paddleWidth, paddleHeight, ballX, ballY }
	);
};

const gameLoop = () => {
	if (!isGameStarted) return;
	// Update the game state
	updateGameplay();

	// schedules the execution of the gameLoop function for the next frame refresh of the browser's display
	requestAnimationFrame(gameLoop);
};

const countdownTimer = () => {
	countdownOverlay.style.display = "flex";

	return new Promise<void>((resolve) => {
		let count = 5;
		countdown.innerHTML = count.toString();

		const interval = setInterval(() => {
			count--;
			countdown.innerHTML = count.toString();

			if (count === 0) {
				countdown.innerHTML = "Pong!";

				setTimeout(() => {
					clearInterval(interval);
					countdownOverlay.style.display = "none";
					resolve();
				}, 1000);
			} else {
				countdown.innerHTML = count.toString();
			}
		}, 1000);
	});
};

const handleStartGameClick = () => {
	menu.style.display = "none";
	canvas.style.display = "block";

	countdownTimer().then(() => {
		countdown.innerHTML = "";
		isGameStarted = true;
		startGameButton.disabled = true;
		gameLoop();
	});
};

// Draw the initial game state
drawGameState(
	canvas,
	context!,
	{ left: leftPlayerScore, right: rightPlayerScore },
	{ leftPaddleY, rightPaddleY, paddleWidth, paddleHeight, ballX, ballY }
);

// Event listeners
document.addEventListener("keydown", handleKeypressEvent);
document.addEventListener("keyup", handleKeypressEvent);
startGameButton.addEventListener("click", handleStartGameClick);
