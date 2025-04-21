import { elements } from "../helpers/elements";
import { gameSettings, paddleConfig, playerScores } from "../config";

export class GameWin {
	private didPlayerWin(player: "left" | "right") {
		return player === "left"
			? playerScores.left === gameSettings.winningScore
			: playerScores.right === gameSettings.winningScore;
	}

	private resetGame() {
		playerScores.left = 0;
		playerScores.right = 0;
		elements.canvas.style.display = "none";
		elements.menu.style.display = "block";
		elements.startGameButton.disabled = false;
		paddleConfig.leftPaddleY = 160;
		paddleConfig.rightPaddleY = 160;
	}

	checkForWin = (): boolean => {
		const didLeftWin = this.didPlayerWin("left");
		const didRightWin = this.didPlayerWin("right");

		if (!(didLeftWin || didRightWin)) return true;

		alert(didLeftWin ? "Player 1 Wins!" : "Player 2 Wins!");

		this.resetGame();
		return false;
	};
}

// const didPlayerWin = (player: "left" | "right") => {
// 	return player === "left"
// 		? playerScores.left === gameSettings.winningScore
// 		: playerScores.right === gameSettings.winningScore;
// };

// const resetGame = () => {
// 	playerScores.left = 0;
// 	playerScores.right = 0;
// 	elements.canvas.style.display = "none";
// 	elements.menu.style.display = "block";
// 	elements.startGameButton.disabled = false;
// 	paddleConfig.leftPaddleY = 160;
// 	paddleConfig.rightPaddleY = 160;
// };

// export const checkForWin = (): boolean => {
// 	const didLeftWin = didPlayerWin("left");
// 	const didRightWin = didPlayerWin("right");

// 	if (!(didLeftWin || didRightWin)) return true;

// 	alert(didLeftWin ? "Player 1 Wins!" : "Player 2 Wins!");

// 	resetGame();
// 	return false;
// };
