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

interface PossibilityData {
  positions: Array<PositionInfo>;
  values: TicTacBoardData;
}

interface TicTacState {
  isYourTurn: boolean;
  values: TicTacBoardData;
  gameState: WinnerType;
  rowsOfPossibilities: Array<PossibilityData>;
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
      rowsOfPossibilities: [
        {
          positions,
          values: JSON.parse(JSON.stringify(this.state.values)) // deep object copy
        }
      ]
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

  addNextPossibilitesRow = (positions: Array<PositionInfo>, prevValues?: TicTacBoardData) => {
    if(!prevValues) return console.error('prevValues undefined')
    this.setState(
      produce<TicTacState>((state: TicTacState) => {
        const tb = new TicTacBoard(prevValues);
        state.rowsOfPossibilities.push({positions, values: prevValues});
      })
    );
  };

  handleAddNextPossibilityRow = (
    currentValues: TicTacBoardData,
    currentTypeOfPlayer: Player,
    index: number
  ) => () => {
    console.log("NEXT");
    this.setState(produce<TicTacState>((state) => {
      state.rowsOfPossibilities.length = index + 1
    }))
    const tb = new TicTacBoard(currentValues);
    tb.getBestMove({ 
      positionsWithCostsCallback: this.addNextPossibilitesRow,
       maximizing: currentTypeOfPlayer === Player.O ? true : false,
       currentValues,
       });
  };

  renderPossibilityRow = (
    positions: Array<PositionInfo>,
    values: TicTacBoardData,
    possibilityRowIndex: number
  ) => {
    return positions.map(({ cost, column, row, typeOfPlayer, seleced }) => {
      const currentValues = produce(values, draft => {
        draft[row][column] =
          typeOfPlayer === Player.X ? FieldType.X : FieldType.O;
      });

      return (
        <PossibilityContainer
          key={`${column}-${row}-${typeOfPlayer}`}
          selected={seleced}
          onClick={this.handleAddNextPossibilityRow(
            currentValues,
            typeOfPlayer,
            possibilityRowIndex,
          )}
        >
          <TicTacToeBoard size={100} values={currentValues} />
          <Value>cost: {cost}</Value>
        </PossibilityContainer>
      );
    });
  };

  renderPosibilites = () => {
    return this.state.rowsOfPossibilities.map(
      ({ positions, values }, possibilityRowIndex) => (
        <Possibilities key={`${possibilityRowIndex}-${positions.length}-${values.length}`}>
          {this.renderPossibilityRow(positions, values, possibilityRowIndex)}
        </Possibilities>
      )
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
