import React from "react";
import { produce } from "immer";
import {
  TicTacBoard,
  TicTacBoardData,
  FieldType,
  PositionWithCost,
  WinnerType,
  PositionInfo,
  Player
} from "./TicTacBoard";
import { TicTacToeBoard } from "../TicTacToeBoard/TicTacToeBoard";
import {
  Container,
  MainView,
  Possibilities,
  PossibilityContainer,
  Value
} from "./styled";

interface TicTacState {
  isYourTurn: boolean;
  values: TicTacBoardData;
  gameState: WinnerType;
  possibilitiesValue: TicTacBoardData;
  rowsOfPossibilities: Array<PositionInfo>;
}

export class TicTac extends React.Component<any, TicTacState> {
  state: TicTacState = {
    isYourTurn: true,
    gameState: WinnerType.NONE,
    values: [
      [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
      [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
      [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY]
    ],
    possibilitiesValue: [
      [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
      [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
      [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY]
    ],
    rowsOfPossibilities: []
  };

  resetGame = () => {
    this.setState({
      isYourTurn: true,
      values: [
        [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
        [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
        [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY]
      ]
    });
  };

  generatePosibilitiesWithCosts = (positions: Array<PositionInfo>) => {
    this.setState({
      rowsOfPossibilities: positions,
      possibilitiesValue: JSON.parse(JSON.stringify(this.state.values))
    });
    console.log("callback", positions);
  };

  checkIfGameEnded = (value: TicTacBoardData): WinnerType =>
    new TicTacBoard(value).isEnd();

  handleEnemyTurn = () => {
    const { values } = this.state;
    const tb = new TicTacBoard(this.state.values);
    const isEnd = tb.isEnd();
    console.log("isEnd", isEnd);
    const bestMove: PositionWithCost = tb.getBestMove({
      positionsWithCostsCallback: this.generatePosibilitiesWithCosts
    });
    console.log("getBestMove", bestMove);
    if (bestMove.column === -1) return console.log("Game end");
    values[bestMove.row][bestMove.column] = FieldType.O;
    this.setState({
      values,
      gameState: this.checkIfGameEnded(values),
      isYourTurn: true
    });
  };

  handleBoxPress = (row: number, column: number) => () => {
    const { isYourTurn, values } = this.state;
    if (!isYourTurn) return console.log("is not your turn");
    if (values[row][column] !== FieldType.EMPTY)
      return console.warn("this field have been already taken");
    const tb = new TicTacBoard(this.state.values);
    if (tb.isEnd() !== WinnerType.NONE) return console.warn("Game end");

    values[row][column] = FieldType.X;
    this.setState(
      {
        values: values,
        gameState: this.checkIfGameEnded(values),
        isYourTurn: false
      },
      this.handleEnemyTurn
    );
  };

  renderPosibilites = () => {
    return (
      <Possibilities>
        {this.state.rowsOfPossibilities.map(
          ({ cost, column, row, typeOfPlayer, seleced }) => (
            <PossibilityContainer selected={seleced}>
              <TicTacToeBoard
                size={100}
                key={`${column}-${row}-${typeOfPlayer}`}
                values={produce(this.state.possibilitiesValue, draft => {
                  draft[row][column] =
                    typeOfPlayer === Player.X ? FieldType.X : FieldType.O;
                })}
              />
              <Value>cost: {cost}</Value>
            </PossibilityContainer>
          )
        )}
      </Possibilities>
    );
  };

  render() {
    return (
      <Container>
        <MainView>
          <TicTacToeBoard
            values={this.state.values}
            handleBoxPress={this.handleBoxPress}
          />
        </MainView>
        {this.renderPosibilites()}
      </Container>
    );
  }
}
