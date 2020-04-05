import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { START_GAME_MODE } from '../../App';
import { actions } from '../../redux';
import * as T from "../../types";

function Select() {

  const state = useSelector<T.State, T.State>(state => state);
  const dispatch = useDispatch();

  const gameModes = [START_GAME_MODE];
  if(state.difficulties) {
    gameModes.push(...Object.keys(state.difficulties));
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: actions.SET_CURRENT_DIFFICULTY,
      payload: event.target.value
    });
  }

  return (
    <select
      value={state.currentDifficulty || START_GAME_MODE}
      onChange={onChange}
      disabled={state.isPlaying}
    >
      {gameModes.map(key => (
        <option key={key} value={key}>
          {key}
        </option>)
      )}
    </select>
  );
}

export default Select;