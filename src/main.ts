import { elements } from "./helpers/dom";
import { countdownTimer } from "./utils/countdown";
import { drawGameState } from "./views/game-view";
import { GameController } from "./controllers/game-controller";
import { SettingsView } from "./views/settings-view";

class Game {
	private readonly startGameButton = elements.startGameButton;
	private readonly menu = elements.menu;
	private readonly canvas = elements.canvas;
	private readonly backToMenuButton = elements.backToMenuButton;
	private readonly mainTitle = elements.mainTitle;
	private readonly warning = elements.warning;
	private readonly app = elements.app;

	constructor() {
		if (this.isTouchDevice()) {
			this.showTouchWarning();
			return;
		}

		this.initialise();
	}

	private isTouchDevice(): boolean {
		return "ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0;
	}

	private showTouchWarning(): void {
		this.warning.style.display = "block";
		this.app!.style.display = "none";
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
		this.backToMenuButton.style.display = "block";
		this.mainTitle.style.display = "none";

		countdownTimer().then(() => {
			this.startGameButton.disabled = true;

			// Start a new game on every click
			const game = new GameController();
			game.start();
		});
	};
}

new Game();
