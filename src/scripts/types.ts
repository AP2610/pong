export interface PlayerScores {
	left: number;
	right: number;
}

export interface GameConfig {
	paddle: PaddleConfig;
	ball: BallConfig;
	settings: GameSettings;
	scores: PlayerScores;
}

export interface PaddleConfig {
	paddleWidth: number;
	paddleHeight: number;
	leftPaddleY: number;
	rightPaddleY: number;
	leftPaddleVelocity: number;
	rightPaddleVelocity: number;
}

export interface BallConfig {
	ballX: number;
	ballY: number;
	ballSpeedX: number;
	ballSpeedY: number;
}

export interface GameSettings {
	winningScore: number;
	ballSpeed: number;
	paddleSpeed: number;
}
