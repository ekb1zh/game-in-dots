import React from 'react';
import 'normalize.css';
import './App.scss';
import Controls from './components/game/controls';

function App() {
  return (
    <>
      <div className="container">
        <Controls />
      </div>
      <div className="container">
        Content 2
      </div>
    </>
  );
}

export default App;
