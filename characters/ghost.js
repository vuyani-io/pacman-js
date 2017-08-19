import Character from "./character";

export default class Ghost extends Character {
	constructor(value, coord, velocity, startCoord) {
		super(value, coord, velocity);
		this.startCoord = startCoord;
		this.isScared = false;
	}

	move(coord) {}
}
