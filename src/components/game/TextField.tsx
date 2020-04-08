import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Action } from '../../redux';
import * as T from "../../types";


function TextField() {
  
  console.log('render TextField')

  const isPlaying = useSelector<T.State, T.State['isPlaying']>(state => state.isPlaying);
  const playerName = useSelector<T.State, T.State['playerName']>(state => state.playerName);
  const dispatch = useDispatch();
  
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: Action.SET_PLAYER_NAME,
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