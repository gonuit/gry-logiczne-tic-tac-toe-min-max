import React from 'react'
import './style.css';

export class TicTac extends React.Component {

  handleBoxPress = (row: number, column: number) => () => {
    console.log('clicked', row, column)
  }

  render() {
    return (
      <div className="tictac-container">
        <div className="tictac-row">
          <div className="tictac-box" onClick={this.handleBoxPress(0,0)}></div>
          <div className="tictac-vert-line"></div>
          <div className="tictac-box" onClick={this.handleBoxPress(0,1)}></div>
          <div className="tictac-vert-line"></div>
          <div className="tictac-box" onClick={this.handleBoxPress(0,2)}></div>
        </div>
        <div className="tictac-line"></div>
        <div className="tictac-row">
          <div className="tictac-box" onClick={this.handleBoxPress(1,0)}></div>
          <div className="tictac-vert-line"></div>
          <div className="tictac-box" onClick={this.handleBoxPress(1,1)}></div>
          <div className="tictac-vert-line"></div>
          <div className="tictac-box" onClick={this.handleBoxPress(1,2)}></div>
        </div>
        <div className="tictac-line"></div>
        <div className="tictac-row">
          <div className="tictac-box" onClick={this.handleBoxPress(2,0)}></div>
          <div className="tictac-vert-line"></div>
          <div className="tictac-box" onClick={this.handleBoxPress(2,1)}></div>
          <div className="tictac-vert-line"></div>
          <div className="tictac-box" onClick={this.handleBoxPress(2,2)}></div>
        </div>
      </div>
    )
  }
}