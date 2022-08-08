import { isEqual } from "lodash-es";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { WritableDraft } from "immer";

import { Coords, TileState } from "../../types";
import buildBoard from "./buildBoard";
import type { BoardState } from "./model";

const initialState = buildBoard();

function getTile(state: BoardState, { row, col }: Coords): Tile {
  return state.tiles[row][col];
}

function _checkAndRemove(state: WritableDraft<BoardState>) {
  if (state.flipped.length < 2) return state;
  const firstTile = getTile(state, state.flipped[0]!);
  const secondTile = getTile(state, state.flipped[1]!);
  state.flipped = [];
  state.turns++;
  if (firstTile.symbol === secondTile.symbol) {
    firstTile.state = secondTile.state = TileState.Removed;
  } else {
    firstTile.state = secondTile.state = TileState.FaceDown;
  }
  return state;
}

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    flip: (state, action: PayloadAction<Coords>) => {
      if (state.timerId && state.flipped.length === 2) {
        clearTimeout(state.timerId);
        state = _checkAndRemove(state);
        delete state.timerId;
      }
      if (
        state.flipped.length === 2 ||
        (state.flipped.length === 1 &&
          isEqual(state.flipped[0], action.payload))
      ) {
        return state;
      }
      const { row, col } = action.payload;

      state.flipped.push({ row, col });
      const tile = getTile(state, action.payload);
      if (tile.state === TileState.Removed) return state;
      if (tile.state === TileState.FaceDown) {
        tile.state = TileState.FaceUp;
      } else {
        tile.state = TileState.FaceDown;
      }
      return state;
    },
    checkAndRemove: _checkAndRemove,
    reset: () => buildBoard(),
    setTimerId: (state, action: PayloadAction<number>) => {
      state.timerId = action.payload;
      return state;
    }
  }
});

export const {
  flip,
  checkAndRemove,
  reset: resetBoard,
  setTimerId
} = boardSlice.actions;

export default boardSlice.reducer;
