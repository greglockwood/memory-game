export enum TileState {
  FaceDown = "facedown",
  FaceUp = "faceup",
  Removed = "removed"
}

export interface Tile {
  symbol: string;
  state: TileState;
}

export interface Board {
  tiles: Tile[][];
}

export interface Coords {
  row: number;
  col: number;
}
