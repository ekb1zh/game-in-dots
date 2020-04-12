import React from 'react';
import { useSelector } from 'react-redux';
import * as T from "../types";
import { GameStage } from '../index';



function Message() {

  // console.log('render Message')

  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
  const playerName = useSelector<T.State, T.State['playerName']>(state => state.playerName);
  const stage = useSelector<T.State, T.State['stage']>(state => state.stage);
  const score = useSelector<T.State, T.State['score']>(state => state.score);

  let message = '';
  switch (stage) {

    case GameStage.SETTING: {
      const isStartGameMode = !currentMode;
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

      break;
    }

    case GameStage.PLAYING: {
      const [player, computer] = score;
      message = `Score: "${playerName}" ${player} / ${computer} "computer"`
      break;
    }

    case GameStage.WIN: {
      const [player, computer] = score;
      message = `Game over. Score: ${player} / ${computer}. "${player > computer ? playerName : "Computer"}" win. Please, play again :-)`
      break;
    }

    default:
      throw new Error();
  }

  return message ? (<p>{message}</p>) : null;
}

export default Message;