import React from 'react';
import './App.css';
import { TicTac } from './components/TicTac/TicTac';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Tic tac toe
        </p>
        <span>game example</span>
      </header>
      <div className="appContent">
      <TicTac />
      </div>
    </div>
  );
}

export default App;
