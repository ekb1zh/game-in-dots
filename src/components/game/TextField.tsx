import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Actions } from '../../redux/store';
import * as T from "../../types";


function TextField() {

  const state = useSelector<T.State, T.State>(state => state);
  const dispatch = useDispatch();

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: Actions.SET_PLAYER_NAME,
      payload: event.target.value
    });
  }

  return (
    <input
      type={'text'}
      placeholder={'Enter your name'}
      disabled={state.isPlaying}
      onChange={onChange}
      value={state.playerName}
    />
  );
}


export default TextField;