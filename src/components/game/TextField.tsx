import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../redux';
import * as T from "../../types";


function TextField() {
  
  console.log('render TextField')

  const dispatch = useDispatch();
  const isPlaying = useSelector<T.State, T.State['isPlaying']>(state => state.isPlaying);
  const playerName = useSelector<T.State, T.State['playerName']>(state => state.playerName);
  
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: actions.SET_PLAYER_NAME,
      payload: event.target.value
    });
  }

  return (
    <input
      type='text'
      placeholder='Enter your name'
      disabled={isPlaying}
      onChange={onChange}
      value={playerName || ''}
    />
  );
}


export default TextField;