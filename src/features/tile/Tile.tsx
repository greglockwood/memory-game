import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import React from "react";
import styled from "styled-components";

import { Tile as TileModel, TileState } from "../../types";

interface _TileProps extends TileModel {
  onClick: VoidFunction;
}

type TileProps = React.PropsWithChildren<_TileProps>;

const BaseTile = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  border-width: 2px;
  height: 100%;
  width: 100%;
`;
const FaceDownTile = styled(BaseTile)`
  background-color: red;
  border-color: red;
`;
const FaceUpTile = styled(BaseTile)`
  background-color: yellow;
  border-color: yellow;
`;
const RemovedTile = styled(BaseTile)`
  visibility: hidden;
`;

function Tile(props: TileProps & MotionProps) {
  const { children, ...otherProps } = props;
  switch (props.state) {
    case TileState.Removed:
      return <RemovedTile {...otherProps}>{children}</RemovedTile>;
    case TileState.FaceUp:
      return <FaceUpTile {...otherProps}>{children}</FaceUpTile>;
  }
  return <FaceDownTile {...otherProps}>{children}</FaceDownTile>;
}

const Symbol = styled.span`
  visibility: ${({ state }: TileProps) =>
    state === TileState.FaceUp ? "visible" : "hidden"};
  font-size: 2rem;
`;

export default function TileComponent(props: TileProps) {
  const { symbol, onClick } = props;
  return (
    <Tile {...props} onClick={onClick} animate={{rotateZ: 180}} transition={{
        repeat: 1,
        repeatType: 'reverse',
        duration: 2
    }}>
      <Symbol {...props}>{symbol}</Symbol>
    </Tile>
  );
}
