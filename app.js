import { KEY_DICTIONARY } from "./preload/setup";
import GameBoard from "./game";
import UI from "./graphics/ui";

const DOMGrid = document.querySelector("#game-board");

const game = new GameBoard();
UI.render(DOMGrid, game);

let refreshID;
let isPaused = true;

document.querySelector("#start-btn").addEventListener("click", startGame);

window.addEventListener("keydown", ({ key }) => {
	if (key === " ") {
		if (game.status() !== 0) return;
		if (!refreshID) {
			startGame();
		} else {
			isPaused = !isPaused;
			if (isPaused) clearInterval(refreshID);
			else refreshID = setInterval(refreshUI, 250);
		}
	} else {
		const direction = KEY_DICTIONARY[key];
		if (direction) {
			const { displacement, rotation } = direction;
			game.changePacmanDirection(displacement, rotation);
		}
	}
});

function refreshUI() {
	game.nextFrame();
	if (game.status() === 1) {
		console.log("game won");
		clearInterval(refreshID);
	} else if (game.status() === -1) {
		clearInterval(refreshID);
		console.log("game over");
	}
	UI.render(DOMGrid, game);
}

function startGame() {
	if (!refreshID) {
		isPaused = !isPaused;
		game.start();
		UI.render(DOMGrid, game);
		refreshID = setInterval(refreshUI, 250);
	}
}
