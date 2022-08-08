import { shuffle } from "lodash-es";

import { Tile, TileState } from "../../types";
import { BoardState } from "./model";

const TILE_SYMBOLS = ["😀", "😁", "😍", "😎", "😡", "😭", "🤡", "💩"];

export default function buildBoard(): BoardState {
  const availableTiles = TILE_SYMBOLS.length;
  const boardSize = availableTiles * 2;
  const rows = Math.floor(Math.sqrt(boardSize));
  const cols = Math.floor(boardSize / rows);
  const tileSequence = shuffle(TILE_SYMBOLS).concat(shuffle(TILE_SYMBOLS));
  if (rows * cols !== boardSize)
    throw new Error(
      `Unable to construct a rectangular board with ${availableTiles} tiles.`
    );
  const tiles: Tile[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: Tile[] = [];
    for (let j = 0; j < cols; j++) {
      row.push({
        symbol: tileSequence[i * cols + j],
        state: TileState.FaceDown
      });
    }
    tiles.push(row);
  }
  return {
    tiles,
    flipped: [],
    turns: 0
  };
}
