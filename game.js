import { LEVEL, CHARACTER_DEFAULTS, OBJECT_TYPE } from "./preload/setup";
import Pacman from "./characters/pacman";
import Ghost from "./characters/ghost";

export default class GameBoard {
	constructor() {
		this.board = LEVEL;
		this.pacman;
		this.ghosts = [];
		this.dotsCount = 176;
	}

	start() {
		this.instantiatePacman();
		this.instantiateGhosts();
	}

	instantiatePacman() {
		const { type, coord, velocity } = CHARACTER_DEFAULTS["PACMAN"];
		this.pacman = new Pacman(type, coord, velocity);

		const { row, col } = coord;

		this.board[row][col] = type;
	}

	instantiateGhosts() {
		let ghostType = 5;
		for (let col = 8; col < 12; col++) {
			const { type, coord, velocity, startCoord } = CHARACTER_DEFAULTS["GHOST"](
				12,
				col,
				ghostType++
			);
			const ghost = new Ghost(type, coord, velocity, startCoord);
			this.ghosts.push(ghost);
			const { row } = coord;
			this.board[row][col] = type;
		}
	}

	nextFrame() {
		// Move pacman on game board
		const { type, coord } = this.nextSquare(this.pacman);
		const objectType = OBJECT_TYPE[type];
		// prettier-ignore
		if (objectType === "blank" || objectType === "pill" || objectType === "power-pill") {
			if (objectType === "pill") console.log("eat pill");
			else if (objectType === "power-pill") console.log("eat power pill");
			this.moveCharacter(this.pacman, coord);
		}
	}

	nextSquare(character) {
		const {
			coord,
			velocity: { displacement },
		} = character;
		const nextCoord = {
			row: displacement.row + coord.row,
			col: displacement.col + coord.col,
		};
		const nextType = this.board[nextCoord.row][nextCoord.col];
		return {
			type: nextType,
			coord: {
				row: nextCoord.row,
				col: nextCoord.col,
			},
		};
	}

	moveCharacter(character, coord) {
		this.board[coord.row][coord.col] = character.type;
		this.board[character.coord.row][character.coord.col] = 0;
		character.move(coord);
	}
}