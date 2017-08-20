import GameBoard from "./game";
import UI from "./graphics/ui";

const DOMGrid = document.querySelector("#game-board");

const game = new GameBoard();
UI.render(DOMGrid, game.board);

let refreshID;
let isPaused = true;

document.querySelector("#start-btn").addEventListener("click", () => {
	if (!refreshID) {
		isPaused = !isPaused;
		game.start();
		UI.render(DOMGrid, game.board);
		refreshID = setInterval(refreshUI, 250);
	}
});

window.addEventListener("keydown", ({ key }) => {
	if (key === " ") {
		isPaused = !isPaused;
		if (isPaused) clearInterval(refreshID);
		else refreshID = setInterval(refreshUI, 250);
	}
});

function refreshUI() {
	game.nextFrame();
	UI.render(DOMGrid, game.board);
}
