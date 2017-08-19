import GameBoard from "./game";
import UI from "./graphics/ui";

const DOMGrid = document.querySelector("#game-board");

const game = new GameBoard();
game.start();

UI.createGrid(DOMGrid, game.board);
