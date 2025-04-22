import { gameStateManager } from "../models/game-model";
import { elements } from "../helpers/dom";

class GameView {
	private readonly canvas = elements.canvas;
	private readonly context = elements.context;
	private readonly scoreBoxConfig = {
		boxHeight: 50,
		paddingX: 10,
		paddingY: 2,
		boxY: 0,
	};
	private readonly colors = {
		colorPrimary: window.getComputedStyle(document.documentElement).getPropertyValue("--color-primary"),
		colorGreen: window.getComputedStyle(document.documentElement).getPropertyValue("--color-accent-2"),
		colorRed: window.getComputedStyle(document.documentElement).getPropertyValue("--color-warning"),
		colorSecondary: window.getComputedStyle(document.documentElement).getPropertyValue("--color-secondary"),
	};

	private drawScoreText() {
		if (!this.context) return;

		const { colorPrimary } = this.colors;
		const { left: leftPlayerScore, right: rightPlayerScore } = gameStateManager.scoresState;

		// Draw score box
		const scoreText = `${leftPlayerScore} - ${rightPlayerScore}`;
		this.context.font = "40px 'Oxanium'";

		// Get the width of the text
		const textMetrics = this.context.measureText(scoreText);
		const textWidth = textMetrics.width;

		// Calculate box dimensions with padding
		const boxWidth = textWidth + this.scoreBoxConfig.paddingX * 2; // Add padding to both sides
		const boxHeight = this.scoreBoxConfig.boxHeight + this.scoreBoxConfig.paddingY * 2; // Add padding to top and bottom

		// Calculate box position (centered)
		const boxX = (this.canvas.width - boxWidth) / 2;
		const boxY = 0;

		// Draw box with padding
		this.context.strokeStyle = colorPrimary;
		this.context.lineWidth = 2;
		this.context.beginPath();
		this.context.moveTo(boxX, boxY);
		this.context.lineTo(boxX, boxY + boxHeight); // Left vertical line
		this.context.lineTo(boxX + boxWidth, boxY + boxHeight); // Bottom line
		this.context.lineTo(boxX + boxWidth, boxY); // Right vertical line
		this.context.stroke();

		// Draw score text (centered in box)
		this.context.fillStyle = colorPrimary;
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
		this.context.fillText(
			scoreText,
			this.canvas.width / 2,
			boxY + boxHeight / 2 // Center text vertically in box
		);
	}

	private drawCenterDottedLine() {
		if (!this.context) return;

		const { colorSecondary } = this.colors;
		const { boxHeight } = this.scoreBoxConfig;

		const lineWidth = 2;
		const dashLength = 10;
		const gapLength = 10;
		const centerX = this.canvas.width / 2;

		this.context.beginPath();
		this.context.setLineDash([dashLength, gapLength]);
		this.context.lineWidth = lineWidth;
		this.context.strokeStyle = colorSecondary;
		this.context.moveTo(centerX, boxHeight + gapLength);
		this.context.lineTo(centerX, this.canvas.height);
		this.context.stroke();
		this.context.setLineDash([]);
	}

	private drawBall() {
		if (!this.context) return;

		const { colorSecondary } = this.colors;
		const { ballX, ballY } = gameStateManager.ballState;

		// Draw ball onto the canvas
		this.context.beginPath();
		this.context.arc(ballX, ballY, 10, 0, Math.PI * 2); // This draws a circle - x, y, radius, start angle, end angle (2 pie)
		this.context.fillStyle = colorSecondary;
		this.context.fill();
		this.context.closePath();
	}

	private drawPaddles() {
		if (!this.context) return;

		const { colorGreen, colorRed } = this.colors;
		const { leftPaddleY, rightPaddleY, paddleWidth, paddleHeight } = gameStateManager.paddleState;

		// Left paddle
		this.context.beginPath();
		this.context.fillStyle = colorRed;
		this.context.roundRect(0, leftPaddleY, paddleWidth, paddleHeight, 6);
		this.context.fill();
		this.context.closePath();

		// Right paddle
		this.context.beginPath();
		this.context.fillStyle = colorGreen;
		this.context.roundRect(this.canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight, 6);
		this.context.fill();
		this.context.closePath();
	}

	drawGameState() {
		if (!this.context) return;

		// Clear the canvas so when invoked, it will clear the previous frame and draw the new frame
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Draw center dotted line
		this.drawCenterDottedLine();

		// Draw paddles onto the canvas
		this.drawPaddles();

		// Draw ball onto the canvas
		this.drawBall();

		// Draw score box and text
		this.drawScoreText();
	}
}

// Instantiate only once
const gameView = new GameView();
export const drawGameState = () => gameView.drawGameState();
