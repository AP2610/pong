import { elements } from "../helpers/dom";
import { GameSettings } from "../types/types";
import { gameStateManager } from "../models/game-model";

export class SettingsView {
	private readonly inputs: Record<string, HTMLInputElement> = {
		winningScore: elements.winningScoreInput,
		ballSpeed: elements.ballSpeedInput,
		paddleSpeed: elements.paddleSpeedInput,
	};

	constructor() {
		this.setUpEventListeners();
	}

	private setUpEventListeners(): void {
		Object.keys(this.inputs).forEach((input) => {
			this.inputs[input].addEventListener("input", (event: Event) => gameStateManager.updateGameSetting(event, input as keyof GameSettings));
		});
	}
}
