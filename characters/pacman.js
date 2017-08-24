import Character from "./character";

export default class Pacman extends Character {
	constructor(type, coord, velocity, rotation) {
		super(type, coord, velocity, 0);
		this.rotation = rotation;
	}

	move(coord, nextItem) {
		this.coord = coord;
		this.consumedItem = nextItem;
		return 0;
	}

	changeDirection(displacement, rotation) {
		this.velocity.displacement = displacement;
		this.rotation = rotation;
	}
}
