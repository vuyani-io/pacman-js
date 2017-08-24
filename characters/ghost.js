import Character from "./character";

const displacementDict = [
	{ row: 0, col: 1 },
	{ row: 0, col: -1 },
	{ row: 1, col: 0 },
	{ row: -1, col: 0 },
];
export default class Ghost extends Character {
	constructor(type, coord, velocity, startCoord) {
		super(type, coord, velocity, 0);
		this.startCoord = startCoord;
		this.isScared = false;
	}

	move(coord, nextItem) {
		const { row, col } = coord;
		this.coord = { row, col };
		const previousItem = this.consumedItem;
		this.consumedItem = nextItem;
		return previousItem;
	}

	changeDirection() {
		const randomIndex = Math.floor(Math.random() * 4);
		const { row, col } = displacementDict[randomIndex];
		this.velocity.displacement = { row, col };
	}

	isStationary() {
		const {
			displacement: { row, col },
		} = this.velocity;
		return row === 0 && col === 0;
	}
}
