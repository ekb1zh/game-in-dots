import React from 'react';
import { useSelector } from 'react-redux';
import SelectMode from "./SelectMode";
import Button from './PlayButton';
import TextField from './TextField';
import Message from './Message';
import Grid from './Grid';
import * as T from '../types';
import './Game.scss';


function Game() {

  const difficulties = useSelector((state: T.State) => state.difficulties);
  const currentMode = useSelector((state: T.State) => state.currentMode);

  return (
    <div className='game'>
      <div className='controls'>
        <SelectMode />
        <TextField />
        <Button />
      </div>
      <Message />
      {difficulties && currentMode && <Grid />}
    </div>
  );
}

export default Game;