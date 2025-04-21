// TODO: Update canvas size to make it larger - Priority 1
// TODO: implement computer AI - Priority 2
// TODO: Update UI with styling, make it retro like an arcade game - Priority 3
// TODO: make a mobbile version with a slider for each player to move the paddle - Priority - 4
// TODO: Refactor into separate files
// TODO: Refactor variables into objects for better organisation
// TODO: Use document.querySelectorAll for getting all input elements

import { gameSettings, paddleConfig } from "./config";
import { elements } from "./helpers/elements";
import { countdownTimer } from "./scripts/countdown";
import { drawGameState } from "./scripts/draw";
import { GameLogic } from "./scripts/game-logic";

class Game {
	private isGameStarted = false;
	private gameLogic = new GameLogic();

	start() {
		this.isGameStarted = true;
		this.gameLoop();
	}

	private stop() {
		this.isGameStarted = false;
	}

	isRunning() {
		return this.isGameStarted;
	}

	private gameLoop() {
		if (!this.isGameStarted) return;

		const continueGame = this.gameLogic.updateGameplay();

		if (continueGame) {
			requestAnimationFrame(() => this.gameLoop());
		} else {
			this.stop();
		}
	}
}

// Elements
const { startGameButton, menu, canvas } = elements;

const setPaddleVelocity = (paddle: "left" | "right", velocity: number) => {
	if (paddle === "left") {
		paddleConfig.leftPaddleVelocity = velocity;
	} else {
		paddleConfig.rightPaddleVelocity = velocity;
	}
};

// Computer difficulty
let computerDifficulty = 0.1;

// Is playerTwo a computer?
let isPlayerTwoComputer = false;

// Game variables
let isGameStarted = false;

// Initialise game
const game = new Game();

// Movement config
const movementConfig: Record<string, Record<string, () => void>> = {
	arrowup: {
		keydown: () => setPaddleVelocity("right", -gameSettings.paddleSpeed),
		keyup: () => setPaddleVelocity("right", 0),
	},
	arrowdown: {
		keydown: () => setPaddleVelocity("right", gameSettings.paddleSpeed),
		keyup: () => setPaddleVelocity("right", 0),
	},
	w: {
		keydown: () => setPaddleVelocity("left", -gameSettings.paddleSpeed),
		keyup: () => setPaddleVelocity("left", 0),
	},
	s: {
		keydown: () => setPaddleVelocity("left", gameSettings.paddleSpeed),
		keyup: () => setPaddleVelocity("left", 0),
	},
};

// Event handlers
const handleKeypressEvent = (event: KeyboardEvent) => {
	if (!game.isRunning()) return;
	const eventType = event.type;

	// Loop over movementConfig. If the pressed key is one of the keys in movementConfig, set the value based on the type of event (keydown/keyup) by calling the function sotred in movementConfig.
	Object.keys(movementConfig).forEach((key) => {
		if (event.key.toLowerCase() === key) {
			movementConfig[key][eventType]();
		}
	});
};

const handleStartGameClick = () => {
	menu.style.display = "none";
	canvas.style.display = "block";

	countdownTimer().then(() => {
		startGameButton.disabled = true;
		game.start();
	});
};

// Draw the initial game state
drawGameState();

// Event listeners
document.addEventListener("keydown", handleKeypressEvent);
document.addEventListener("keyup", handleKeypressEvent);
startGameButton.addEventListener("click", handleStartGameClick);
