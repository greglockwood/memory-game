import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import type { RootState } from "./app/store";
import {
  flip,
  checkAndRemove,
  resetBoard,
  setTimerId
} from "./features/board/boardSlice";
import BoardComponent from "./features/board/Board";
import "./styles.css";
import { Coords, Tile, TileState } from "./types";

function calculateRemainingPairs(tiles: Tile[][]): number {
  let nonRemovedCount = 0;
  for (let i = 0, rows = tiles.length; i < rows; i++) {
    for (let j = 0, cols = tiles[i].length; j < cols; j++) {
      if (tiles[i][j].state !== TileState.Removed) {
        nonRemovedCount++;
      }
    }
  }
  return Math.ceil(nonRemovedCount / 2);
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr 80px;
  min-height: 100%;

  header {
    --color: gray;
    font-size: 200%;
    color: var(--color);
    padding: 5px 0;
    margin-bottom: 10px;
    text-align: center;
    display: grid;
    place-items: center;
    border: 1px solid var(--color);
    border-width: 2px 0;
    text-transform: uppercase;
  }

  footer {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 1fr;
    align-items: stretch;

    > * {
      padding: 0 10px;
      display: grid;
      place-items: center;
    }
    button {
      grid-row: 1 / -1;
    }
    span {
      grid-row: 1 / -1;
      text-align: center;
    }
  }
`;

export default function App() {
  const board = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const { tiles, flipped, turns } = board;
  const remainingPairs = calculateRemainingPairs(tiles);

  const onTileClick = useCallback(
    (coords: Coords) => {
      dispatch(flip(coords));
      const reset = setTimeout(() => {
        if (flipped.length === 1) {
          dispatch(checkAndRemove());
        }
      }, 1000);
      dispatch(setTimerId(reset));
      return () => clearTimeout(reset);
    },
    [flipped, dispatch]
  );
  return (
    <Wrapper>
      <header>Memory</header>
      <BoardComponent tiles={tiles} onTileClick={onTileClick} />
      <footer>
        <button onClick={() => dispatch(resetBoard())}>Reset</button>
        <span>Turns: {turns}</span>
        <span>Remaining Pairs: {remainingPairs}</span>
      </footer>
    </Wrapper>
  );
}
