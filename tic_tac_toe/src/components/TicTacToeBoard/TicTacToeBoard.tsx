import React from "react";
import { FieldType, TicTacBoardData } from "../TicTac/TicTacBoard";
import { Container, Line, VertLine, Row, Box } from "./styled";

interface TicTacToeBoardProps {
  handleBoxPress?: (row: number, column: number) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  values: TicTacBoardData
  highlight?: Position
  size?: number
}

export class TicTacToeBoard extends React.Component<TicTacToeBoardProps> {
  
  getCircleOrCross = (row: number, column: number): string => {
    const value = this.props.values[row][column];
    switch (value) {
      case FieldType.X:
        return "X";
      case FieldType.O:
        return "O";
      default:
        return "";
    }
  };
  
  render () {
    const { handleBoxPress = () => () => {}, size } = this.props
    return (
      <Container size={size}>
        <Row size={size}>
          <Box size={size} onClick={handleBoxPress(0, 0)}>
            {this.getCircleOrCross(0, 0)}
          </Box>
          <VertLine />
          <Box size={size} onClick={handleBoxPress(0, 1)}>
            {this.getCircleOrCross(0, 1)}
          </Box>
          <VertLine />
          <Box size={size} onClick={handleBoxPress(0, 2)}>
            {this.getCircleOrCross(0, 2)}
          </Box>
        </Row>
        <Line />
        <Row size={size}>
          <Box size={size} onClick={handleBoxPress(1, 0)}>
            {this.getCircleOrCross(1, 0)}
          </Box>
          <VertLine />
          <Box size={size} onClick={handleBoxPress(1, 1)}>
            {this.getCircleOrCross(1, 1)}
          </Box>
          <VertLine />
          <Box size={size} onClick={handleBoxPress(1, 2)}>
            {this.getCircleOrCross(1, 2)}
          </Box>
        </Row>
        <Line />
        <Row size={size}>
          <Box size={size} onClick={handleBoxPress(2, 0)}>
            {this.getCircleOrCross(2, 0)}
          </Box>
          <VertLine />
          <Box size={size} onClick={handleBoxPress(2, 1)}>
            {this.getCircleOrCross(2, 1)}
          </Box>
          <VertLine />
          <Box size={size} onClick={handleBoxPress(2, 2)}>
            {this.getCircleOrCross(2, 2)}
          </Box>
        </Row>
      </Container>
    )
  }
}