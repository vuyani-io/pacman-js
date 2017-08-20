export default class Character {
	constructor(type, coord, velocity) {
		this.type = type;
		this.coord = coord;
		this.velocity = velocity;
	}

	move(coord) {
		const { row, col } = coord;
		this.coord = { row, col };
	}
}
