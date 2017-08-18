const BOARD = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
	[1, 3, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 3, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
	[1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
	[1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1],
	[0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0],
	[0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0],
	[1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1],
	[1, 0, 0, 0, 2, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 2, 0, 0, 0, 1],
	[1, 1, 1, 1, 2, 1, 2, 1, 5, 6, 7, 8, 1, 2, 1, 2, 1, 1, 1, 1],
	[0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0],
	[0, 0, 0, 1, 2, 1, 2, 0, 0, 4, 0, 0, 0, 2, 1, 2, 1, 0, 0, 0],
	[1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1],
	[1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 3, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 3, 1],
	[1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
// units are in pixels
const grid_size = BOARD[0].length;
const cell_size = 20;
const object_type = [
	"blank",
	"wall",
	"pill",
	"power-pill",
	"pacman",
	"blinky",
	"pinky",
	"inky",
	"clyde",
];
// prettier-ignore
const object_classes = {
	"blank": [],
	"wall": ["wall"],
	"pill": ["pill"],
	"power-pill": ["power-pill"],
	"pacman": ["pacman"],
	"blinky": ["ghost", "blinky"],
	"pinky": ["ghost", "pinky"],
	"inky": ["ghost", "inky"],
	"clyde": ["ghost", "clyde"],
};

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
			DOMGrid.appendChild(createSquare(object_classes[object_type[square]]));
		});
	});
}

DOMGrid.style.cssText = `grid-template-columns: repeat(${grid_size}, ${cell_size}px)`;
createGrid(DOMGrid, BOARD);
