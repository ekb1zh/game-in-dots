import React from 'react';
import { useSelector } from 'react-redux';
import * as T from "../types";
import { Stage } from '../index';



function Message() {

  const currentMode = useSelector((state: T.State) => state.currentMode);
  const playerName = useSelector((state: T.State) => state.playerName);
  const stage = useSelector((state: T.State) => state.stage);
  const score = useSelector((state: T.State) => state.score);

  let message = '';
  let colorClass;
  switch (stage) {

    case Stage.SETTING: {
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

      if(!message) {
        message += 'push PLAY button, and good luck :-)'
      }

      if (message) {
        message = `Please, ${message}`
      }

      colorClass = ' message--setting';

      break;
    }

    case Stage.PLAYING: {
      const [player, computer] = score;
      message = `Score: You ${player} : ${computer} "computer"`
      break;
    }

    case Stage.WIN: {
      const [player, computer] = score;
      message = `Game over. \nScore: ${player} : ${computer}. ${player > computer ? 'You are win!' : 'Computer win.'} \nPlease, play again :-)`
      break;
    }

    default:
      throw new Error();
  }

  return message ? (
    <p className={`message${colorClass ? colorClass : ''}`}>
      {message}
    </p>
  ) : null;
}

export default Message;