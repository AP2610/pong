import { gameStateManager } from "./game-model";
import { elements } from "../helpers/dom";
import { drawGameState } from "./game-view";
import { PaddleConfig } from "../types/types";

export class GameController {
	private continueGame = true;
	private readonly canvas = elements.canvas;
	private readonly movementConfig: Record<string, Record<string, () => void>>;

	constructor() {
		this.movementConfig = {
			arrowup: {
				keydown: () => this.setPaddleVelocity("right", -gameStateManager.settingsState.paddleSpeed),
				keyup: () => this.setPaddleVelocity("right", 0),
			},
			arrowdown: {
				keydown: () => this.setPaddleVelocity("right", gameStateManager.settingsState.paddleSpeed),
				keyup: () => this.setPaddleVelocity("right", 0),
			},
			w: {
				keydown: () => this.setPaddleVelocity("left", -gameStateManager.settingsState.paddleSpeed),
				keyup: () => this.setPaddleVelocity("left", 0),
			},
			s: {
				keydown: () => this.setPaddleVelocity("left", gameStateManager.settingsState.paddleSpeed),
				keyup: () => this.setPaddleVelocity("left", 0),
			},
		};
	}

	start(): void {
		gameStateManager.isGameStarted = true;
		this.setUpEventListeners();
		this.gameLoop();
	}

	private stop(): void {
		gameStateManager.isGameStarted = false;
		this.removeEventListeners();
	}

	private gameLoop(): void {
		if (!gameStateManager.isRunning) return;

		const continueGame = this.updateGameplay();

		if (continueGame) {
			requestAnimationFrame(() => this.gameLoop());
		} else {
			this.stop();
		}
	}

	private setUpEventListeners(): void {
		document.addEventListener("keydown", this.handleKeypressEvent);
		document.addEventListener("keyup", this.handleKeypressEvent);
	}

	private removeEventListeners(): void {
		document.removeEventListener("keydown", this.handleKeypressEvent);
		document.removeEventListener("keyup", this.handleKeypressEvent);
	}

	private setPaddleVelocity(paddle: "left" | "right", velocity: number): void {
		const paddleKey = `${paddle}PaddleVelocity` as keyof PaddleConfig;
		gameStateManager.paddleState[paddleKey] = velocity;
	}

	// Event handlers
	private handleKeypressEvent = (event: KeyboardEvent): void => {
		if (!gameStateManager.isRunning) return;
		const eventType = event.type;

		// Loop over movementConfig. If the pressed key is one of the keys in movementConfig, set the value based on the type of event (keydown/keyup) by calling the function sotred in movementConfig.
		Object.keys(this.movementConfig).forEach((key) => {
			if (event.key.toLowerCase() === key) {
				this.movementConfig[key][eventType]();
			}
		});
	};

	private handleWallCollision(): void {
		const { ballState } = gameStateManager;

		if (ballState.ballY < 0 || ballState.ballY > this.canvas.height) {
			ballState.ballSpeedY = -ballState.ballSpeedY;
		}
	}

	private handlePaddleYPosition(paddle: "left" | "right"): void {
		const { paddleState } = gameStateManager;
		const paddleY = paddle === "left" ? "leftPaddleY" : "rightPaddleY";

		// If the paddle hits the top of the canvas
		if (paddleState[paddleY] < 0) {
			paddleState[paddleY] = 0;
			// if the paddle hits the bottom of the canvas
		} else if (paddleState[paddleY] > this.canvas.height - paddleState.paddleHeight) {
			paddleState[paddleY] = this.canvas.height - paddleState.paddleHeight;
		}
	}

	private handleBallPaddleHitOrMiss(paddle: "left" | "right"): void {
		const { ballState } = gameStateManager;
		const { paddleState } = gameStateManager;

		const ballX = ballState.ballX;
		const ballY = ballState.ballY;
		const paddleWidth = paddleState.paddleWidth;
		const paddleHeight = paddleState.paddleHeight;
		const topOfPaddle = paddle === "left" ? paddleState.leftPaddleY : paddleState.rightPaddleY;
		const bottomOfPaddle = topOfPaddle + paddleHeight;
		const isBallXApproachingPaddle = paddle === "left" ? ballX < paddleWidth : ballX > this.canvas.width - paddleWidth;

		if (!isBallXApproachingPaddle) return;

		// Check if the ball is within the vertical bounds of the paddle
		if (ballY > topOfPaddle && ballY < bottomOfPaddle) {
			// Bounce ball of the paddle
			ballState.ballSpeedX = -ballState.ballSpeedX;
		} else {
			// Reset ball position to center of canvas, increment player score oppposite to the current paddle, check for win
			ballState.ballX = this.canvas.width / 2;
			ballState.ballY = this.canvas.height / 2;
			gameStateManager.updateScore(paddle === "left" ? "right" : "left");

			this.continueGame = gameStateManager.checkForWin();
		}
	}

	private updateGameplay(): boolean {
		const { paddleState } = gameStateManager;

		// Update paddle positions
		gameStateManager.updatePaddlePosition("left", paddleState.leftPaddleVelocity);
		gameStateManager.updatePaddlePosition("right", paddleState.rightPaddleVelocity);

		// Update ball position
		gameStateManager.updateBallPosition();

		// Bounce the ball if it hits the top or bottom of the canvas
		this.handleWallCollision();

		// Check if the ball passed the left paddle by check if its X position is less then paddleWidth
		this.handleBallPaddleHitOrMiss("left");

		// Check if the ball passed the right paddle by checking if its X position is greater than canvas width - paddleWidth
		this.handleBallPaddleHitOrMiss("right");

		// Make sure left paddle stays within the canvas
		this.handlePaddleYPosition("left");

		// Make sure right paddle stays within the canvas
		this.handlePaddleYPosition("right");

		// Insert computer player 2 logic here

		// Draw the updated game on the canvas
		drawGameState();

		return this.continueGame;
	}
}
