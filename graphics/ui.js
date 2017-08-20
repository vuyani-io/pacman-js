import {
	OBJECT_CLASSES,
	OBJECT_TYPE,
	GRID_SIZE,
	CELL_SIZE,
} from "../preload/setup";

export function render(DOMGrid, board) {
	if (DOMGrid.children.length) patchGrid(DOMGrid, board);
	else createGrid(DOMGrid, board);
}

function createSquare(classNames, type) {
	const DOMSquare = document.createElement("div");
	DOMSquare.classList.add("square");
	for (let className of classNames) {
		DOMSquare.classList.add(className);
		DOMSquare.setAttribute("data-type", type);
	}
	return DOMSquare;
}

function patchSquare(DOMSquare, classNames, type) {
	const oldClassNames = DOMSquare.classList.value.split(" ");

	for (let oldClass of oldClassNames) {
		if (oldClass === "square") continue;
		DOMSquare.classList.remove(oldClass);
	}

	for (let className of classNames) {
		DOMSquare.classList.add(className);
	}
	DOMSquare.setAttribute("data-type", type);
}

function removeClasses(DOMElement, exception) {
	const classNames = DOMElement.classList.value.split(" ");
	for (let className of classNames) {
		if (className === exception) continue;
		DOMElement.classList.remove(className);
	}
}

function createGrid(DOMGrid, board) {
	DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px)`;
	board.forEach((row) => {
		row.forEach((square) => {
			DOMGrid.appendChild(
				createSquare(OBJECT_CLASSES[OBJECT_TYPE[square]], square)
			);
		});
	});
}

function patchGrid(DOMGrid, board) {
	let count = 0;
	board.forEach((row) => {
		row.forEach((square) => {
			const DOMSquare = DOMGrid.children.item(count++);
			const type = Number(DOMSquare.getAttribute("data-type"));
			if (type !== square) {
				patchSquare(DOMSquare, OBJECT_CLASSES[OBJECT_TYPE[square]], square);
			}
		});
	});
}

export default { render };
