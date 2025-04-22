const countdown = document.querySelector(".countdown") as HTMLDivElement;
const countdownOverlay = document.querySelector(
	".countdown-overlay"
) as HTMLDivElement;

export const countdownTimer = () => {
	countdownOverlay.style.display = "flex";

	return new Promise<void>((resolve) => {
		let count = 1;
		countdown.innerHTML = count.toString();

		const interval = setInterval(() => {
			count--;
			countdown.innerHTML = count.toString();

			if (count === 0) {
				countdown.innerHTML = "Pong!";

				setTimeout(() => {
					clearInterval(interval);
					countdown.innerHTML = "";
					countdownOverlay.style.display = "none";
					resolve();
				}, 1000);
			} else {
				countdown.innerHTML = count.toString();
			}
		}, 1000);
	});
};
