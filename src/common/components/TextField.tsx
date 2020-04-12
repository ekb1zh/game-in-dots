import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Action } from '../redux';
import * as T from "../types";
import { Stage } from '../index';



function TextField() {

  const playerName = useSelector<T.State, T.State['playerName']>(state => state.playerName);
  const stage = useSelector<T.State, T.State['stage']>(state => state.stage);
  const dispatch = useDispatch();
  
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: Action.SET_PLAYER_NAME,
      payload: event.target.value
    });
  }

  return (
    <input
      className='field'
      type='text'
      value={playerName || ''}
      placeholder='Enter your name'
      onChange={onChange}
      disabled={stage !== Stage.SETTING}
    />
  );
}


export default TextField;