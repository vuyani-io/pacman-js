import { LEVEL, CHARACTER_DEFAULTS, OBJECT_TYPE } from "./preload/setup";
import Pacman from "./characters/pacman";
import Ghost from "./characters/ghost";

export default class GameBoard {
	constructor() {
		this.board = LEVEL;
		this.pacman;
		this.ghosts = [];
		this.gameStatus = 0;
		this.dotsCount = 172;
		this.score = 0;
		this.timer = 0;
		this.powerPill = {
			state: false,
			startInterval: null,
			endInterval: null,
		};
	}

	start() {
		this.instantiatePacman();
		this.instantiateGhosts();
	}

	instantiatePacman() {
		const { type, coord, velocity, rotation } = CHARACTER_DEFAULTS["PACMAN"];
		this.pacman = new Pacman(type, coord, velocity, rotation);

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
		if (this.status() !== 0) return;

		if (this.powerPill.state) {
			if (this.timer > this.powerPill.endInterval) this.deactivatePowerPill();
		}

		// Move ghosts on game board
		this.moveGhosts();

		if (this.status() !== 0) return;

		// Move pacman on game board
		this.movePacman();

		this.timer++;
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
		const nextSquare = this.board[coord.row][coord.col];
		const previousCoord = {
			row: character.coord.row,
			col: character.coord.col,
		};
		const previousSquare = character.move(coord, nextSquare);
		this.board[previousCoord.row][previousCoord.col] = previousSquare;
		this.board[coord.row][coord.col] = character.type;
	}

	movePacman() {
		const { type, coord } = this.nextSquare(this.pacman);
		const objectType = OBJECT_TYPE[type];
		// prettier-ignore
		if (objectType === "blank" || objectType === "pill" || objectType === "power-pill") {
			this.moveCharacter(this.pacman, coord);
			const { consumedItem } = this.pacman;
			if(OBJECT_TYPE[consumedItem] === 'pill') {
				this.dotsCount--;
				this.score += 10;
			}
			else if(OBJECT_TYPE[consumedItem] === 'power-pill') {
				this.activatePowerPill();
			}
		} else if(type >= 5 && type <= 8){
			const ghost = this.findGhost(coord.row, coord.col);
			if(ghost.isScared) {
				// console.log('eat ghost');
				this.resetGhost(ghost);
				this.moveCharacter(this.pacman, coord);
				if(this.pacman.consumedItem === 2) {
					this.dotsCount--;
					this.score += 10;
				}
			} else{
				this.gameStatus = -1;
			}
		}
	}

	moveGhosts() {
		this.ghosts.forEach((ghost) => {
			if (ghost.isStationary()) ghost.changeDirection();
			const { type, coord } = this.nextSquare(ghost);
			const objectType = OBJECT_TYPE[type];
			// prettier-ignore
			if(objectType === 'blank' || objectType === 'pill' || objectType === 'power-pill'){
				this.moveCharacter(ghost, coord);
			}else{
				if(objectType === 'pacman') {
					if(ghost.isScared){
						// console.log('eat ghost');
						this.resetGhost(ghost);
					}else {
						this.gameStatus = -1;
					}
				}
				ghost.velocity.displacement = {row: 0, col: 0};
			}
		});
	}

	activatePowerPill() {
		this.powerPill = {
			state: true,
			startInterval: this.timer,
			endInterval: this.timer + 40,
		};
		this.ghosts.forEach((ghost) => (ghost.isScared = true));
	}

	deactivatePowerPill() {
		this.powerPill = {
			state: false,
			startInterval: null,
			endInterval: null,
		};
		this.ghosts.forEach((ghost) => (ghost.isScared = false));
	}

	changePacmanDirection(displacement, rotation) {
		this.pacman.changeDirection(displacement, rotation);
	}

	findGhost(row, col) {
		return this.ghosts.find(
			(ghost) => ghost.coord.row === row && ghost.coord.col === col
		);
	}

	resetGhost(ghost) {
		const nextSquare = {
			type: ghost.consumedItem,
			coord: {
				row: ghost.coord.row,
				col: ghost.coord.col,
			},
		};
		this.board[nextSquare.coord.row][nextSquare.coord.col] = nextSquare.type;

		ghost.coord = {
			row: ghost.startCoord.row,
			col: ghost.startCoord.col,
		};
		ghost.consumedItem = 0;
		ghost.isScared = false;

		this.board[ghost.coord.row][ghost.coord.col] = ghost.type;
		this.score += 50;
	}

	status() {
		if (this.dotsCount === 0) return 1;
		else return this.gameStatus;
	}
}
