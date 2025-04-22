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

const menu = document.querySelector(".menu") as HTMLDivElement;

const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

export const elements = {
	winningScoreInput,
	ballSpeedInput,
	paddleSpeedInput,
	startGameButton,
	winningScoreValue,
	ballSpeedValue,
	paddleSpeedValue,
	menu,
	canvas,
	context,
};
