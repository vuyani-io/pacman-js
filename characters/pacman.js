import Character from "./character";

export default class Pacman extends Character {
	constructor(type, coord, velocity, rotation) {
		super(type, coord, velocity);
		this.rotation = rotation;
	}

	changeDirection(displacement, rotation) {
		this.velocity.displacement = displacement;
		this.rotation = rotation;
	}
}
