export const LEVEL = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
	[1, 3, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 3, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
	[1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
	[1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1],
	[0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0],
	[0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 0],
	[1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1],
	[1, 0, 0, 0, 2, 2, 2, 1, 0, 0, 0, 0, 1, 2, 2, 2, 0, 0, 0, 1],
	[1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1],
	[0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0],
	[0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 0, 0, 0],
	[1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1],
	[1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 3, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 3, 1],
	[1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const GRID_SIZE = LEVEL[0].length;
export const CELL_SIZE = 20;

// prettier-ignore
export const OBJECT_CLASSES = {
	"blank": [],
	"wall": ["wall"],
	"pill": ["pill"],
	"power-pill": ["power-pill"],
	"pacman": ["pacman"],
	"blinky": ["ghost", "blinky"],
	"pinky": ["ghost", "pinky"],
	"inky": ["ghost", "inky"],
	"clyde": ["ghost", "clyde"],
};
export const OBJECT_TYPE = [
	"blank",
	"wall",
	"pill",
	"power-pill",
	"pacman",
	"blinky",
	"pinky",
	"inky",
	"clyde",
];

export const CHARACTER_DEFAULTS = {
	PACMAN: {
		type: 4,
		rotation: 0,
		coord: {
			row: 14,
			col: 9,
		},
		velocity: {
			speed: 2,
			displacement: {
				row: 0,
				col: 1,
			},
		},
	},
	GHOST: (row, col, type) => ({
		type,
		isScared: false,
		startCoord: {
			row,
			col,
		},
		coord: {
			row,
			col,
		},
		velocity: {
			speed: 3,
			displacement: {
				row: 0,
				col: 0,
			},
		},
	}),
};

export const KEY_DICTIONARY = {
	ArrowUp: {
		displacement: { row: -1, col: 0 },
		rotation: 270,
	},
	w: {
		displacement: { row: -1, col: 0 },
		rotation: 270,
	},
	ArrowLeft: {
		displacement: { row: 0, col: -1 },
		rotation: 180,
	},
	a: {
		displacement: { row: 0, col: -1 },
		rotation: 180,
	},
	ArrowDown: {
		displacement: { row: 1, col: 0 },
		rotation: 90,
	},
	s: {
		displacement: { row: 1, col: 0 },
		rotation: 90,
	},
	ArrowRight: {
		displacement: { row: 0, col: 1 },
		rotation: 0,
	},
	d: {
		displacement: { row: 0, col: 1 },
		rotation: 0,
	},
};
