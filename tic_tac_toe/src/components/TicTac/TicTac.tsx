import React from "react";
import "./style.css";
import { TicTacBoard, TicTacBoardData, FieldType } from "./TicTacBoard";

interface TicTacState {
  isYourTurn: boolean;
  values: TicTacBoardData
}

export class TicTac extends React.Component<any, TicTacState> {
  state: TicTacState = {
    isYourTurn: true,
    values: [
      [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
      [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
      [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
    ]
  };

  resetGame = () => {
    this.setState({
      isYourTurn: true,
      values: [
        [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
        [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
        [FieldType.EMPTY, FieldType.EMPTY, FieldType.EMPTY],
      ]
    })
  }

  handleEnemyTurn = () => {
    const tb =  new TicTacBoard(this.state.values)
    console.log('isEnd', tb.isEnd())
    this.setState({
      isYourTurn: true
    })
  }

  handleBoxPress = (row: number, column: number) => () => {
    const { isYourTurn,values } = this.state;
    if (!isYourTurn) return console.log("is not your turn");
    if(values[row][column] !== FieldType.EMPTY) return console.warn('this field have been already taken')
    values[row][column] = FieldType.X;
    this.setState({
      values: values,
      isYourTurn: false
    }, this.handleEnemyTurn)
  };

  getCircleOrCross = (row: number, column: number): string => {
    const value = this.state.values[row][column]
    switch(value){
      case FieldType.X: return "X"
      case FieldType.O: return "O"
      default: return ""
    }
  }

  render() {
    return (
      <div className="tictac-container">
        <div className="tictac-row">
          <div className="tictac-box" onClick={this.handleBoxPress(0, 0)}>{ this.getCircleOrCross(0,0) }</div>
          <div className="tictac-vert-line" />
          <div className="tictac-box" onClick={this.handleBoxPress(0, 1)} >{ this.getCircleOrCross(0,1) }</div>
          <div className="tictac-vert-line" />
          <div className="tictac-box" onClick={this.handleBoxPress(0, 2)} >{ this.getCircleOrCross(0,2) }</div>
        </div>
        <div className="tictac-line" />
        <div className="tictac-row">
          <div className="tictac-box" onClick={this.handleBoxPress(1, 0)} >{ this.getCircleOrCross(1,0) }</div>
          <div className="tictac-vert-line" />
          <div className="tictac-box" onClick={this.handleBoxPress(1, 1)} >{ this.getCircleOrCross(1,1) }</div>
          <div className="tictac-vert-line" />
          <div className="tictac-box" onClick={this.handleBoxPress(1, 2)} >{ this.getCircleOrCross(1,2) }</div>
        </div>
        <div className="tictac-line" />
        <div className="tictac-row">
          <div className="tictac-box" onClick={this.handleBoxPress(2, 0)} >{ this.getCircleOrCross(2,0) }</div>
          <div className="tictac-vert-line" />
          <div className="tictac-box" onClick={this.handleBoxPress(2, 1)} >{ this.getCircleOrCross(2,1) }</div>
          <div className="tictac-vert-line" />
          <div className="tictac-box" onClick={this.handleBoxPress(2, 2)} >{ this.getCircleOrCross(2,2) }</div>
        </div>
      </div>
    );
  }

}
