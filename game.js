import { LEVEL } from "./preload/setup";

export default class Game {
	constructor() {
		this.board;
		this.pacman;
		this.ghosts;
		this.dotsCount;
	}

	start() {
		this.board = LEVEL;
	}
}
