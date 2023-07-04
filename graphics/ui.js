import {
	OBJECT_CLASSES,
	OBJECT_TYPE,
	GRID_SIZE,
	CELL_SIZE,
} from "../preload/setup.js";

export function renderGameStatus(DOMOverlay, gameStatus) {
	DOMOverlay.style.cssText = "display: grid !important";
	DOMOverlay.innerHTML = gameStatus;
}

function renderScore(DOMScore, score) {
	DOMScore.innerHTML = score;
}

export function render(DOMGrid, game, DOMScore, score) {
	renderScore(DOMScore, score);
	if (DOMGrid.children.length) patchGrid(DOMGrid, game);
	else createGrid(DOMGrid, game);
}

function createGrid(DOMGrid, game) {
	const { board } = game;
	DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px)`;
	board.forEach((row) => {
		row.forEach((square) => {
			DOMGrid.appendChild(
				createSquare(OBJECT_CLASSES[OBJECT_TYPE[square]], square)
			);
		});
	});
}

function patchGrid(DOMGrid, game) {
	const {
		board,
		pacman: { rotation },
	} = game;
	let count = 0;
	board.forEach((row, rowIndex) => {
		row.forEach((square, columnIndex) => {
			const DOMSquare = DOMGrid.children.item(count++);

			if (square === 4)
				DOMSquare.style.cssText = `transform: rotate(${rotation}deg)`;
			else DOMSquare.style.cssText = ``;

			// prettier-ignore
			if (!(square >= 5 && square <= 8) && DOMSquare.classList.contains("scared")) {
				DOMSquare.classList.remove("scared");
			}

			const type = Number(DOMSquare.getAttribute("data-type"));
			if (type !== square) {
				let classNames = [...OBJECT_CLASSES[OBJECT_TYPE[square]]];
				if (square >= 5 && square <= 8) {
					const ghost = game.findGhost(rowIndex, columnIndex);
					if (ghost.isScared) {
						classNames.push("scared");
					}
				}
				patchSquare(DOMSquare, classNames, square);
			}
		});
	});
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

export default { render, renderGameStatus };

