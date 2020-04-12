import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Action } from '../redux';
import * as T from "../types";
import { Stage } from '../index';


function Button() {

  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
  const playerName = useSelector<T.State, T.State['playerName']>(state => state.playerName);
  const stage = useSelector<T.State, T.State['stage']>(state => state.stage);
  const dispatch = useDispatch();

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

    switch (stage) {

      case Stage.SETTING:
        dispatch({
          type: Action.SET_STAGE,
          payload: Stage.PLAYING,
        });
        break;

      case Stage.PLAYING:
      case Stage.WIN:
        dispatch({
          type: Action.SET_CURRENT_MODE,
          payload: null,
        });
        dispatch({
          type: Action.SET_SCORE,
          payload: [0, 0],
        });
        dispatch({
          type: Action.SET_STAGE,
          payload: Stage.SETTING,
        });
        break;

      default:
        throw new Error();
    }

  }

  const isDisabled = !playerName || !currentMode;

  let label;
  switch (stage) {
    case Stage.SETTING:
      label = 'PLAY';
      break;
    case Stage.PLAYING:
    case Stage.WIN:
      label = 'PLAY AGAIN';
      break;
    default:
      throw new Error();
  }

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}

export default Button;