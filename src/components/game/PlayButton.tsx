import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { START_GAME_MODE } from '../../App';
import { Action } from '../../redux';
import * as T from "../../types";


function PlayButton() {

  console.log('render PlayButton')

  const isPlaying = useSelector<T.State, T.State['isPlaying']>(state => state.isPlaying);
  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
  const playerName = useSelector<T.State, T.State['playerName']>(state => state.playerName);
  const dispatch = useDispatch();
  

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

    if (isPlaying) {
      dispatch({
        type: Action.SET_CURRENT_DIFFICULTY,
        payload: START_GAME_MODE
      });

      dispatch({
        type: Action.SET_PLAYER_NAME,
        payload: ''
      });
    }

    dispatch({
      type: Action.SET_IS_PLAYING,
      payload: !isPlaying
    });

  }

  const isDisabled = !playerName || currentMode === START_GAME_MODE;

  return (
    <button 
      onClick={onClick}
      disabled={isDisabled}
    >
      {isPlaying ? 'PLAY AGAIN' : 'PLAY'}
    </button>
  );
}

export default PlayButton;