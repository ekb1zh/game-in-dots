import React from 'react';
import { useSelector } from 'react-redux';
import * as T from "../../types";
import { START_GAME_MODE } from '../../App';


function Message() {

  console.log('render Message')

  const isPlaying = useSelector<T.State, T.State['isPlaying']>(state => state.isPlaying);
  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
  const playerName = useSelector<T.State, T.State['playerName']>(state => state.playerName);

  let message = '';

  if (isPlaying) {
    // текущие результаты игры
  } else {

    const isStartGameMode = !currentMode || currentMode === START_GAME_MODE;
    const isAbsentPlayerName = !playerName;

    if (isStartGameMode) {
      message += 'pick game mode'
    }

    if (isStartGameMode && isAbsentPlayerName) {
      message += ' and ';
    }

    if (isAbsentPlayerName) {
      message += 'enter your name'
    }

    if (message) {
      message = `Please, ${message}.`
    }

  }

  return message ? (<p>{message}</p>) : null;
}

export default Message;