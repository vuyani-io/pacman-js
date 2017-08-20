import Character from "./character";

export default class Ghost extends Character {
	constructor(type, coord, velocity, startCoord) {
		super(type, coord, velocity);
		this.startCoord = startCoord;
		this.isScared = false;
	}
}
