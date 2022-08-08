import React from "react";
import styled, { css } from "styled-components";

import TileComponent from "../tile/Tile";
import { Board, Coords } from "../../types";

interface BoardProps extends Board {
  onTileClick(coords: Coords): void;
}

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: ${(props: { columns: number }) =>
    css`repeat(${props.columns}, 1fr)`};
  gap: 10px;
  justify-content: center;
`;

export default function BoardComponent({ tiles, onTileClick }: BoardProps) {
  return (
    <Wrapper columns={tiles[0].length}>
      {tiles.map((tileRow, rowIdx) => {
        return tileRow.map((tile, colIdx) => {
          return (
            <TileComponent
              key={`${rowIdx}_${colIdx}`}
              {...tile}
              onClick={() => {
                onTileClick({ row: rowIdx, col: colIdx });
              }}
            />
          );
        });
      })}
    </Wrapper>
  );
}
