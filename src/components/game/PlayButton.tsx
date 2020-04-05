import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { START_GAME_MODE } from '../../App';
import { actions } from '../../redux/store';
import * as T from "../../types";


function PlayButton() {

  const state = useSelector<T.State, T.State>(state => state);
  const dispatch = useDispatch();

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

    if (state.isPlaying) {
      dispatch({
        type: actions.SET_CURRENT_DIFFICULTY,
        payload: START_GAME_MODE
      });

      dispatch({
        type: actions.SET_PLAYER_NAME,
        payload: ''
      });
    }

    dispatch({
      type: actions.SET_IS_PLAYING,
      payload: !state.isPlaying
    });

  }

  const isDisabled = state.currentDifficulty === START_GAME_MODE ||
    !state.playerName;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
    >
      {state.isPlaying ? 'PLAY AGAIN' : 'PLAY'}
    </button>
  );
}


export default PlayButton;