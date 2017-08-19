import { LEVEL, CHARACTER_DEFAULTS } from "./preload/setup";
import Pacman from "./characters/pacman";
import Ghost from "./characters/ghost";

export default class Game {
	constructor() {
		this.board;
		this.pacman;
		this.ghosts = [];
		this.dotsCount = 176;
	}

	start() {
		this.board = LEVEL;

		this.instantiatePacman();
		this.instantiateGhosts();
	}

	instantiatePacman() {
		const { value, coord, velocity } = CHARACTER_DEFAULTS["PACMAN"];
		this.pacman = new Pacman(value, coord, velocity);

		const { row, col } = coord;

		this.board[row][col] = value;
	}

	instantiateGhosts() {
		let type = 5;
		for (let col = 8; col < 12; col++) {
			const { value, coord, velocity, startCoord } = CHARACTER_DEFAULTS[
				"GHOST"
			](12, col, type++);
			const ghost = new Ghost(value, coord, velocity, startCoord);
			this.ghosts.push(ghost);
			const { row } = coord;
			this.board[row][col] = value;
		}
	}
}
