import React from 'react';
import { useSelector } from 'react-redux';
import * as T from "../../types";
import { START_GAME_MODE } from '../../App';



function Message() {

  const state = useSelector<T.State, T.State>(state => state);

  let message = '';
  if(state.isPlaying) {
    // текущие результаты игры
  } else {

    const isStartGameMode = !state.currentDifficulty || 
      state.currentDifficulty === START_GAME_MODE;
    const isAbsentPlayerName = !state.playerName;

    if(isStartGameMode) {
      message += 'pick game mode'
    }

    if(isStartGameMode && isAbsentPlayerName) {
      message += ' and ';
    }

    if(isAbsentPlayerName) {
      message += 'enter your name'
    }

    if(message) {
      message = `Please, ${message}.`
    }
    
  }

  return (
    <p>
      {message}
    </p>
  );
}

export default Message;