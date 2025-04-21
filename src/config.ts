import { elements } from "./helpers/elements";
import {
	BallConfig,
	GameSettings,
	PaddleConfig,
	PlayerScores,
} from "./scripts/types";

const { canvas } = elements;

// Initial game settings
export const gameSettings: GameSettings = {
	winningScore: 1,
	ballSpeed: 3,
	paddleSpeed: 5,
};

// Initial Scores
export const playerScores: PlayerScores = {
	left: 0,
	right: 0,
};

// Game instruments
export const paddleConfig: PaddleConfig = {
	paddleWidth: 10,
	paddleHeight: 80,

	// Vertical position of paddles
	leftPaddleY: 160,
	rightPaddleY: 160,

	// Velocity of paddles
	leftPaddleVelocity: 0,
	rightPaddleVelocity: 0,
};

export const ballConfig: BallConfig = {
	// Initial ball position
	ballX: canvas.width / 2,
	ballY: canvas.height / 2,

	//Speed of ball movement on x and y axis
	ballSpeedX: gameSettings.ballSpeed,
	ballSpeedY: gameSettings.ballSpeed,
};
