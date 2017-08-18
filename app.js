const DOMGameBoard = document.querySelector("#game-board");

function createSquare(classNames) {
	const DOMSquare = document.createElement("div");
	for (let className of classNames) {
		DOMSquare.classList.add(className);
	}
	return DOMSquare;
}

const squares = [
	["square", "wall"],
	["square", "pill"],
	["square", "power-pill"],
	["square", "pacman"],
	["square", "ghost", "blinky"],
	["square", "ghost", "pinky"],
	["square", "ghost", "inky"],
	["square", "ghost", "clyde"],
	["square", "ghost", "clyde", "scared"],
];

for (let squareClasses of squares) {
	DOMGameBoard.appendChild(createSquare(squareClasses));
}
