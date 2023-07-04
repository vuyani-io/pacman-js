import { KEY_DICTIONARY } from "./preload/setup.js";
import GameBoard from "./game.js";
import UI from "./graphics/ui.js";

const DOMGrid = document.querySelector("#game-board");
const DOMOverlay = document.querySelector("#overlay");
const DOMScore = document.querySelector("#score");

const game = new GameBoard();
UI.render(DOMGrid, game, DOMScore, game.score);

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
		UI.renderGameStatus(DOMOverlay, "Congratulations, You've Won");
		clearInterval(refreshID);
	} else if (game.status() === -1) {
		UI.renderGameStatus(DOMOverlay, "Game Over!");
		clearInterval(refreshID);
	}
	UI.render(DOMGrid, game, DOMScore, game.score);
}

function startGame() {
	if (!refreshID) {
		isPaused = !isPaused;
		game.start();
		UI.render(DOMGrid, game, DOMScore, game.score);
		refreshID = setInterval(refreshUI, 250);
	}
}

