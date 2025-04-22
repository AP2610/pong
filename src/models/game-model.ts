import { elements } from "../helpers/dom";
import { GameConfig, PaddleConfig } from "../types/types";
import { drawGameState } from "../views/game-view";

class GameModel {
	private readonly canvas = elements.canvas;
	private readonly mainTitle = elements.mainTitle;
	private readonly menu = elements.menu;
	private readonly startGameButton = elements.startGameButton;
	private readonly winningScoreValue = elements.winningScoreValue;
	private readonly ballSpeedValue = elements.ballSpeedValue;
	private readonly paddleSpeedValue = elements.paddleSpeedValue;
	private readonly backToMenuButton = elements.backToMenuButton;

	private gameConfig: GameConfig = {
		settings: {
			winningScore: 5,
			ballSpeed: 3,
			paddleSpeed: 5,
		},
		scores: { left: 0, right: 0 },
		paddle: {
			paddleWidth: 10,
			paddleHeight: 80,
			leftPaddleY: 160,
			rightPaddleY: 160,
			leftPaddleVelocity: 0,
			rightPaddleVelocity: 0,
		},
		ball: {
			ballX: this.canvas.width / 2,
			ballY: this.canvas.height / 2,
			ballSpeedX: 3,
			ballSpeedY: 3,
		},
	};
	isGameStarted = false;

	get settingsState() {
		return this.gameConfig.settings;
	}

	get scoresState() {
		return this.gameConfig.scores;
	}

	get paddleState() {
		return this.gameConfig.paddle;
	}

	get ballState() {
		return this.gameConfig.ball;
	}

	get isRunning() {
		return this.isGameStarted;
	}

	updateScore(player: "left" | "right") {
		this.scoresState[player]++;
	}

	updatePaddlePosition(paddle: "left" | "right", position: number) {
		const key = `${paddle}PaddleY` as keyof PaddleConfig;
		this.paddleState[key] += position;
	}

	updateBallPosition() {
		this.ballState.ballX += this.ballState.ballSpeedX;
		this.ballState.ballY += this.ballState.ballSpeedY;
	}

	updateGameSetting(event: Event, setting: "ballSpeed" | "paddleSpeed" | "winningScore") {
		const value = (event.target as HTMLInputElement).value;

		if (setting === "winningScore") {
			this.settingsState.winningScore = parseInt(value);
			this.winningScoreValue.innerHTML = value;
		} else if (setting === "ballSpeed") {
			this.settingsState.ballSpeed = parseInt(value);
			this.ballSpeedValue.innerHTML = value;
			this.ballState.ballSpeedX = this.settingsState.ballSpeed;
			this.ballState.ballSpeedY = this.settingsState.ballSpeed;
		} else if (setting === "paddleSpeed") {
			this.settingsState.paddleSpeed = parseInt(value);
			this.paddleSpeedValue.innerHTML = value;
		}
	}

	resetGameState() {
		this.scoresState.left = 0;
		this.scoresState.right = 0;
		this.paddleState.leftPaddleY = 160;
		this.paddleState.rightPaddleY = 160;
		this.paddleState.leftPaddleVelocity = 0;
		this.paddleState.rightPaddleVelocity = 0;

		// Draw reset state
		drawGameState();
	}

	resetGame() {
		this.resetGameState();

		this.mainTitle.style.display = "block";
		this.canvas.style.display = "none";
		this.menu.style.display = "block";
		this.backToMenuButton.style.display = "none";

		this.startGameButton.disabled = false;
	}
}

// Instantiate only once
export const gameStateManager = new GameModel();
