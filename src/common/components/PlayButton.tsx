import React from 'react';
import { AnyAction } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action } from '../redux';
import * as T from "../types";
import { GameStage } from '../index';




function PlayButton() {

  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
  const playerName = useSelector<T.State, T.State['playerName']>(state => state.playerName);
  const stage = useSelector<T.State, T.State['stage']>(state => state.stage);
  const dispatch = useDispatch();

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

    switch (stage) {

      case GameStage.SETTING:
        dispatch({
          type: Action.SET_STAGE,
          payload: GameStage.PLAYING,
        });
        break;

      case GameStage.PLAYING:
      case GameStage.WIN:
        
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
          payload: GameStage.SETTING,
        });
        
        clearTimer();

        break;

      default:
        throw new Error();
    }

  }

  function clearTimer() {

    type SyncAction = ThunkAction<void, T.State, undefined, AnyAction>;
    const syncAction: SyncAction = (dispatch, getState) => {

      const { timerId } = getState();
      if (typeof timerId !== 'number') {
        console.error(new Error());
        return;
      }

      window.clearTimeout(timerId);

      dispatch({
        type: Action.SET_TIMER_ID,
        payload: null,
      });
    }

    dispatch(syncAction);    
  }

  const isDisabled = !playerName || !currentMode;

  let label;
  switch (stage) {
    case GameStage.SETTING:
      label = 'PLAY';
      break;
    case GameStage.PLAYING:
    case GameStage.WIN:
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

export default PlayButton;