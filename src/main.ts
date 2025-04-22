import { elements } from "./helpers/dom";
import { countdownTimer } from "./utils/countdown";
import { drawGameState } from "./views/game-view";
import { GameController } from "./controllers/game-controller";
import { SettingsView } from "./views/settings-view";

class Game {
	private startGameButton = elements.startGameButton;
	private menu = elements.menu;
	private canvas = elements.canvas;

	constructor() {
		this.initialise();
	}

	private initialise() {
		new SettingsView();
		this.setupEventListeners();

		// Draw the initial game state
		drawGameState();
	}

	private setupEventListeners() {
		this.startGameButton.addEventListener("click", this.handleStartGameClick);
	}

	// Arrow function to preserve 'this'
	private handleStartGameClick = (): void => {
		this.menu.style.display = "none";
		this.canvas.style.display = "block";

		countdownTimer().then(() => {
			this.startGameButton.disabled = true;

			// Start a new game on every click
			const game = new GameController();
			game.start();
		});
	};
}

new Game();
