import {
	LEVEL,
	GRID_SIZE,
	CELL_SIZE,
	OBJECT_CLASSES,
	OBJECT_TYPE,
} from "./preload/setup";

const DOMGrid = document.querySelector("#game-board");

function createSquare(classNames) {
	const DOMSquare = document.createElement("div");
	DOMSquare.classList.add("square");
	for (let className of classNames) {
		DOMSquare.classList.add(className);
	}
	return DOMSquare;
}

function createGrid(DOMGrid, board) {
	board.forEach((row) => {
		row.forEach((square) => {
			DOMGrid.appendChild(createSquare(OBJECT_CLASSES[OBJECT_TYPE[square]]));
		});
	});
}

DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px)`;
createGrid(DOMGrid, LEVEL);
