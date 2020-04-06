import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { START_GAME_MODE } from '../../App';
import { actions } from '../../redux';
import * as T from "../../types";


function PlayButton() {

  const dispatch = useDispatch();
  const isPlaying = useSelector<T.State, T.State['isPlaying']>(state => state.isPlaying);
  const currentDifficulty = useSelector<T.State, T.State['currentDifficulty']>(state => state.currentDifficulty);
  const playerName = useSelector<T.State, T.State['playerName']>(state => state.playerName);
  

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

    if (isPlaying) {
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
      payload: !isPlaying
    });

  }

  const isDisabled = !playerName || currentDifficulty === START_GAME_MODE;

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