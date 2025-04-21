import type { PlayerScores } from "./types";

const colors = {
	colorPrimary: window
		.getComputedStyle(document.documentElement)
		.getPropertyValue("--color-primary"),
	colorGreen: window
		.getComputedStyle(document.documentElement)
		.getPropertyValue("--color-accent-2"),
	colorRed: window
		.getComputedStyle(document.documentElement)
		.getPropertyValue("--color-warning"),
	colorSecondary: window
		.getComputedStyle(document.documentElement)
		.getPropertyValue("--color-secondary"),
};

const scoreBoxConfig = {
	boxHeight: 50,
	paddingX: 10,
	paddingY: 2,
	boxY: 0,
};

const drawScoreText = (
	canvas: HTMLCanvasElement,
	context: CanvasRenderingContext2D,
	playerScores: PlayerScores
) => {
	if (!context) return;
	const { colorPrimary } = colors;
	const { left: leftPlayerScore, right: rightPlayerScore } = playerScores;

	// Draw score box
	const scoreText = `${leftPlayerScore} - ${rightPlayerScore}`;
	context.font = "40px 'Oxanium'";

	// Get the width of the text
	const textMetrics = context.measureText(scoreText);
	const textWidth = textMetrics.width;

	// Calculate box dimensions with padding
	const boxWidth = textWidth + scoreBoxConfig.paddingX * 2; // Add padding to both sides
	const boxHeight = scoreBoxConfig.boxHeight + scoreBoxConfig.paddingY * 2; // Add padding to top and bottom

	// Calculate box position (centered)
	const boxX = (canvas.width - boxWidth) / 2;
	const boxY = 0;

	// Draw box with padding
	context.strokeStyle = colorPrimary;
	context.lineWidth = 2;
	context.beginPath();
	context.moveTo(boxX, boxY);
	context.lineTo(boxX, boxY + boxHeight); // Left vertical line
	context.lineTo(boxX + boxWidth, boxY + boxHeight); // Bottom line
	context.lineTo(boxX + boxWidth, boxY); // Right vertical line
	context.stroke();

	// Draw score text (centered in box)
	context.fillStyle = colorPrimary;
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText(
		scoreText,
		canvas.width / 2,
		boxY + boxHeight / 2 // Center text vertically in box
	);
};

const drawCenterDottedLine = (
	context: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement
) => {
	if (!context) return;
	const { colorPrimary } = colors;
	const { boxHeight } = scoreBoxConfig;

	const lineWidth = 2;
	const dashLength = 10;
	const gapLength = 10;
	const centerX = canvas.width / 2;

	context.beginPath();
	context.setLineDash([dashLength, gapLength]);
	context.lineWidth = lineWidth;
	context.strokeStyle = colorPrimary;
	context.moveTo(centerX, boxHeight);
	context.lineTo(centerX, canvas.height);
	context.stroke();
	context.setLineDash([]);
};

const drawBall = (
	context: CanvasRenderingContext2D,
	ballX: number,
	ballY: number
) => {
	if (!context) return;

	const { colorSecondary } = colors;

	// Draw ball onto the canvas
	context.beginPath();
	context.arc(ballX, ballY, 10, 0, Math.PI * 2); // This draws a circle - x, y, radius, start angle, end angle (2 pie)
	context.fillStyle = colorSecondary;
	context.fill();
	context.closePath();
};

const drawPaddles = (
	context: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement,
	gameInstrumentsConfig: Record<string, number>
) => {
	if (!context) return;

	const { colorGreen, colorRed } = colors;
	const { leftPaddleY, rightPaddleY, paddleWidth, paddleHeight } =
		gameInstrumentsConfig;

	// Left paddle
	context.fillStyle = colorRed;
	context.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);

	// Right paddle
	context.fillStyle = colorGreen;
	context.fillRect(
		canvas.width - paddleWidth,
		rightPaddleY,
		paddleWidth,
		paddleHeight
	);
};

export const drawGameState = (
	canvas: HTMLCanvasElement,
	context: CanvasRenderingContext2D,
	playerScores: PlayerScores,
	gameInstrumentsConfig: Record<string, number>
) => {
	if (!context) return;

	// Clear the canvas so when invoked, it will clear the previous frame and draw the new frame
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Draw center dotted line
	drawCenterDottedLine(context, canvas);

	// Draw paddles onto the canvas
	drawPaddles(context, canvas, gameInstrumentsConfig);

	// Draw ball onto the canvas
	drawBall(context, gameInstrumentsConfig.ballX, gameInstrumentsConfig.ballY);

	// Draw score box and text
	drawScoreText(canvas, context, playerScores);
};
