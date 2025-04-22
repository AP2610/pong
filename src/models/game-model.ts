import { elements } from "../helpers/dom";
import { GameConfig, PaddleConfig } from "../types/types";

const { canvas } = elements;

class GameModel {
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
			ballX: canvas.width / 2,
			ballY: canvas.height / 2,
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
		const { winningScoreValue, ballSpeedValue, paddleSpeedValue } = elements;
		const value = (event.target as HTMLInputElement).value;

		if (setting === "winningScore") {
			this.settingsState.winningScore = parseInt(value);
			winningScoreValue.innerHTML = value;
		} else if (setting === "ballSpeed") {
			this.settingsState.ballSpeed = parseInt(value);
			ballSpeedValue.innerHTML = value;

			this.ballState.ballSpeedX = this.settingsState.ballSpeed;
			this.ballState.ballSpeedY = this.settingsState.ballSpeed;
		} else if (setting === "paddleSpeed") {
			this.settingsState.paddleSpeed = parseInt(value);
			paddleSpeedValue.innerHTML = value;
		}
	}

	resetGame() {
		this.scoresState.left = 0;
		this.scoresState.right = 0;
		this.paddleState.leftPaddleY = 160;
		this.paddleState.rightPaddleY = 160;
		this.paddleState.leftPaddleVelocity = 0;
		this.paddleState.rightPaddleVelocity = 0;

		elements.canvas.style.display = "none";
		elements.menu.style.display = "block";
		elements.startGameButton.disabled = false;
	}
}

// Instantiate only once
export const gameStateManager = new GameModel();
