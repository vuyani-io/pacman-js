import {
	OBJECT_CLASSES,
	OBJECT_TYPE,
	GRID_SIZE,
	CELL_SIZE,
} from "../preload/setup";

function createSquare(classNames) {
	const DOMSquare = document.createElement("div");
	DOMSquare.classList.add("square");
	for (let className of classNames) {
		DOMSquare.classList.add(className);
	}
	return DOMSquare;
}

export function createGrid(DOMGrid, board) {
	DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px)`;
	board.forEach((row) => {
		row.forEach((square) => {
			DOMGrid.appendChild(createSquare(OBJECT_CLASSES[OBJECT_TYPE[square]]));
		});
	});
}

export default { createGrid };
