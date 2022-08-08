import { Coords, Tile } from "../../types";

export interface BoardState {
  tiles: Tile[][];
  flipped: Coords[];
  turns: number;
  timerId?: number;
}
