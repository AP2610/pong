import { ballConfig, gameSettings } from "../config";
import { elements } from "../helpers/elements";

const updateGameSetting = (
	setting: "ballSpeed" | "paddleSpeed" | "winningScore"
) => {
	return (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		if (setting === "winningScore") {
			gameSettings.winningScore = parseInt(value);
			winningScoreValue.innerHTML = value;
		} else if (setting === "ballSpeed") {
			gameSettings.ballSpeed = parseInt(value);
			ballSpeedValue.innerHTML = value;

			ballConfig.ballSpeedX = gameSettings.ballSpeed;
			ballConfig.ballSpeedY = gameSettings.ballSpeed;
		} else if (setting === "paddleSpeed") {
			gameSettings.paddleSpeed = parseInt(value);
			paddleSpeedValue.innerHTML = value;
		}
	};
};

const {
	winningScoreInput,
	ballSpeedInput,
	paddleSpeedInput,
	winningScoreValue,
	ballSpeedValue,
	paddleSpeedValue,
} = elements;

winningScoreInput.addEventListener("input", updateGameSetting("winningScore"));
ballSpeedInput.addEventListener("input", updateGameSetting("ballSpeed"));
paddleSpeedInput.addEventListener("input", updateGameSetting("paddleSpeed"));
