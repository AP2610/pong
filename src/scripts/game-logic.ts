import { ballConfig, paddleConfig, playerScores } from "../config";
import { elements } from "../helpers/elements";
import { drawGameState } from "./draw";
import { GameWin } from "./win";

export class GameLogic {
	private continueGame = true;
	private gameWin = new GameWin();
	private canvas = elements.canvas;

	updateGameplay() {
		// Update paddle positions
		paddleConfig.leftPaddleY += paddleConfig.leftPaddleVelocity;
		paddleConfig.rightPaddleY += paddleConfig.rightPaddleVelocity;

		// Update ball position
		ballConfig.ballX += ballConfig.ballSpeedX;
		ballConfig.ballY += ballConfig.ballSpeedY;

		// Bounce the ball if it hits the top or bottom of the canvas
		if (ballConfig.ballY < 0 || ballConfig.ballY > this.canvas.height) {
			ballConfig.ballSpeedY = -ballConfig.ballSpeedY;
		}

		// Check if the ball passed the left paddle by check if its X position is less then paddleWidth
		if (ballConfig.ballX < paddleConfig.paddleWidth) {
			if (
				ballConfig.ballY > paddleConfig.leftPaddleY &&
				ballConfig.ballY <
					paddleConfig.leftPaddleY + paddleConfig.paddleHeight
			) {
				// Bounce the ball off the left paddle
				ballConfig.ballSpeedX = -ballConfig.ballSpeedX;
			} else {
				// Reset ball position to center of canvas, increment right paddle player score, check for win
				ballConfig.ballX = this.canvas.width / 2;
				ballConfig.ballY = this.canvas.height / 2;
				playerScores.right++;

				this.continueGame = this.gameWin.checkForWin();
			}
		}

		// Check if the ball passed the right paddle by checking if its X position is greater than canvas width - paddleWidth
		if (ballConfig.ballX > this.canvas.width - paddleConfig.paddleWidth) {
			if (
				ballConfig.ballY > paddleConfig.rightPaddleY &&
				ballConfig.ballY <
					paddleConfig.rightPaddleY + paddleConfig.paddleHeight
			) {
				// Bounce the ball off the right paddle
				ballConfig.ballSpeedX = -ballConfig.ballSpeedX;
			} else {
				// Reset ball position to center of canvas, increment left paddle player score, check for win
				ballConfig.ballX = this.canvas.width / 2;
				ballConfig.ballY = this.canvas.height / 2;
				playerScores.left++;

				this.continueGame = this.gameWin.checkForWin();
			}
		}

		// Make sure left paddle stays within the canvas
		if (paddleConfig.leftPaddleY < 0) {
			paddleConfig.leftPaddleY = 0;
		} else if (
			paddleConfig.leftPaddleY >
			this.canvas.height - paddleConfig.paddleHeight
		) {
			paddleConfig.leftPaddleY =
				this.canvas.height - paddleConfig.paddleHeight;
		}

		// Make sure right paddle stays within the canvas
		if (paddleConfig.rightPaddleY < 0) {
			paddleConfig.rightPaddleY = 0;
		} else if (
			paddleConfig.rightPaddleY >
			this.canvas.height - paddleConfig.paddleHeight
		) {
			paddleConfig.rightPaddleY =
				this.canvas.height - paddleConfig.paddleHeight;
		}

		// Insert computer player 2 logic here

		// Draw the updated game on the canvas
		drawGameState();

		return this.continueGame;
	}
}

// export const updateGameplay = (): Boolean => {
// 	const { canvas } = elements;
// 	const gameWin = new GameWin();
// 	let continueGame = true;
// 	// Update paddle positions
// 	paddleConfig.leftPaddleY += paddleConfig.leftPaddleVelocity;
// 	paddleConfig.rightPaddleY += paddleConfig.rightPaddleVelocity;

// 	// Update ball position
// 	ballConfig.ballX += ballConfig.ballSpeedX;
// 	ballConfig.ballY += ballConfig.ballSpeedY;

// 	// Bounce the ball if it hits the top or bottom of the canvas
// 	if (ballConfig.ballY < 0 || ballConfig.ballY > canvas.height) {
// 		ballConfig.ballSpeedY = -ballConfig.ballSpeedY;
// 	}

// 	// Check if the ball passed the left paddle by check if its X position is less then paddleWidth
// 	if (ballConfig.ballX < paddleConfig.paddleWidth) {
// 		if (
// 			ballConfig.ballY > paddleConfig.leftPaddleY &&
// 			ballConfig.ballY <
// 				paddleConfig.leftPaddleY + paddleConfig.paddleHeight
// 		) {
// 			// Bounce the ball off the left paddle
// 			ballConfig.ballSpeedX = -ballConfig.ballSpeedX;
// 		} else {
// 			// Reset ball position to center of canvas, increment right paddle player score, check for win
// 			ballConfig.ballX = canvas.width / 2;
// 			ballConfig.ballY = canvas.height / 2;
// 			playerScores.right++;

// 			continueGame = gameWin.checkForWin();
// 		}
// 	}

// 	// Check if the ball passed the right paddle by checking if its X position is greater than canvas width - paddleWidth
// 	if (ballConfig.ballX > canvas.width - paddleConfig.paddleWidth) {
// 		if (
// 			ballConfig.ballY > paddleConfig.rightPaddleY &&
// 			ballConfig.ballY <
// 				paddleConfig.rightPaddleY + paddleConfig.paddleHeight
// 		) {
// 			// Bounce the ball off the right paddle
// 			ballConfig.ballSpeedX = -ballConfig.ballSpeedX;
// 		} else {
// 			// Reset ball position to center of canvas, increment left paddle player score, check for win
// 			ballConfig.ballX = canvas.width / 2;
// 			ballConfig.ballY = canvas.height / 2;
// 			playerScores.left++;

// 			continueGame = gameWin.checkForWin();
// 		}
// 	}

// 	// Make sure left paddle stays within the canvas
// 	if (paddleConfig.leftPaddleY < 0) {
// 		paddleConfig.leftPaddleY = 0;
// 	} else if (
// 		paddleConfig.leftPaddleY >
// 		canvas.height - paddleConfig.paddleHeight
// 	) {
// 		paddleConfig.leftPaddleY = canvas.height - paddleConfig.paddleHeight;
// 	}

// 	// Make sure right paddle stays within the canvas
// 	if (paddleConfig.rightPaddleY < 0) {
// 		paddleConfig.rightPaddleY = 0;
// 	} else if (
// 		paddleConfig.rightPaddleY >
// 		canvas.height - paddleConfig.paddleHeight
// 	) {
// 		paddleConfig.rightPaddleY = canvas.height - paddleConfig.paddleHeight;
// 	}

// 	// Insert computer player 2 logic here

// 	// Draw the updated game on the canvas
// 	drawGameState();

// 	return continueGame;
// };
