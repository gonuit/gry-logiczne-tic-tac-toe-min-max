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
  Value,
  Button,
  GameState,
  LegendContainer,
  LegendItemContainer,
  LegendBoxSelected,
  LegendBoxClicked,
  LegendBoxDescription
} from "./styled";

interface PossibilityData {
  positions: Array<PositionInfo>;
  values: TicTacBoardData;
}

interface TicTacState {
  isYourTurn: boolean;
  values: TicTacBoardData;
  gameState: WinnerType;
  started: boolean;
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
    rowsOfPossibilities: [],
    started: false
  };

  resetGame = () => {
    this.setState({
      isYourTurn: true,
      values: [
        [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
        [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
        [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY]
      ],
      rowsOfPossibilities: [],
      gameState: WinnerType.NONE,
      started: false
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
  };

  checkIfGameEnded = (value: TicTacBoardData): WinnerType =>
    new TicTacBoard(value).isEnd();

  handleEnemyTurn = () => {
    const { values } = this.state;
    const tb = new TicTacBoard(this.state.values);
    const bestMove: PositionWithCost = tb.getBestMove({
      positionsWithCostsCallback: this.generatePosibilitiesWithCosts
    });
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
      return console.log("this field have been already taken");
    const tb = new TicTacBoard(this.state.values);
    if (tb.isEnd() !== WinnerType.NONE) return console.log("Game end");

    values[row][column] = FieldType.X;
    this.setState(
      {
        started: true,
        values: values,
        gameState: this.checkIfGameEnded(values),
        isYourTurn: false
      },
      this.handleEnemyTurn
    );
  };

  addNextPossibilitesRow = (
    positions: Array<PositionInfo>,
    prevValues?: TicTacBoardData
  ) => {
    if (!prevValues) return console.error("prevValues undefined");
    this.setState(
      produce((state: TicTacState) => {
        state.rowsOfPossibilities.push({ positions, values: prevValues });
      })
    );
  };

  handleAddNextPossibilityRow = (
    currentValues: TicTacBoardData,
    currentTypeOfPlayer: Player,
    possibilityRowIndex: number,
    possibilityPositionIndex: number
  ) => () => {
    this.setState(
      produce((state: TicTacState) => {
        state.rowsOfPossibilities.length = possibilityRowIndex + 1;
        state.rowsOfPossibilities[
          possibilityRowIndex
        ].positions = state.rowsOfPossibilities[
          possibilityRowIndex
        ].positions.map((elem, positionIndex) => {
          return {
            ...elem,
            clicked: positionIndex === possibilityPositionIndex
          };
        });
      })
    );
    const tb = new TicTacBoard(currentValues);
    tb.getBestMove({
      positionsWithCostsCallback: this.addNextPossibilitesRow,
      maximizing: currentTypeOfPlayer === Player.O ? true : false,
    });
  };

  renderPossibilityRow = (
    positions: Array<PositionInfo>,
    values: TicTacBoardData,
    possibilityRowIndex: number
  ) => {
    return positions.map(
      (
        { cost, column, row, typeOfPlayer, seleced, clicked },
        possibilityPositionIndex
      ) => {
        const currentValues = produce(values, draft => {
          draft[row][column] =
            typeOfPlayer === Player.X ? FieldType.X : FieldType.O;
        });

        return (
          <PossibilityContainer
            clicked={clicked}
            key={`${column}-${row}-${typeOfPlayer}`}
            selected={seleced}
            onClick={this.handleAddNextPossibilityRow(
              currentValues,
              typeOfPlayer,
              possibilityRowIndex,
              possibilityPositionIndex
            )}
          >
            <TicTacToeBoard size={100} values={currentValues} />
            <Value>cost: {cost}</Value>
          </PossibilityContainer>
        );
      }
    );
  };

  renderPosibilites = () =>
    this.state.rowsOfPossibilities.length > 0 ? (
      <>
        {this.state.rowsOfPossibilities.map(
          ({ positions, values }, possibilityRowIndex) => (
            <Possibilities
              key={`${possibilityRowIndex}-${positions.length}-${
                values.length
              }`}
            >
              {this.renderPossibilityRow(
                positions,
                values,
                possibilityRowIndex
              )}
            </Possibilities>
          )
        )}
        <LegendContainer>
          <LegendItemContainer>
            <LegendBoxSelected />
            <LegendBoxDescription>
              - path chosen by the algorithm
            </LegendBoxDescription>
          </LegendItemContainer>
          <LegendItemContainer>
            <LegendBoxClicked />
            <LegendBoxDescription>
              - path chosen by the user
            </LegendBoxDescription>
          </LegendItemContainer>
        </LegendContainer>
      </>
    ) : null;

  gameStateToText = (gameState: WinnerType) => {
    switch (gameState) {
      case WinnerType.O:
        return "O wins!";
      case WinnerType.X:
        return "X wins!";
      case WinnerType.REMIS:
        return "DRAW!";
      default:
        return "";
    }
  };

  render() {
    const { gameState, started } = this.state;
    return (
      <Container>
        <MainView>
          <TicTacToeBoard
            values={this.state.values}
            handleBoxPress={this.handleBoxPress}
          />
          <GameState>{this.gameStateToText(gameState)}</GameState>
          <Button
            disabled={!started}
            diableStyle={!started}
            onClick={this.resetGame}
          >
            {gameState !== WinnerType.NONE ? "Play again" : "Restart"}
          </Button>
        </MainView>
        {this.renderPosibilites()}
      </Container>
    );
  }
}
