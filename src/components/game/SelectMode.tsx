import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { START_GAME_MODE } from '../../App';
import { Action } from '../../redux';
import * as T from "../../types";

function SelectMode() {

  console.log('render Select')

  const difficulties = useSelector<T.State, T.State['difficulties']>(state => state.difficulties);
  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
  const isPlaying = useSelector<T.State, T.State['isPlaying']>(state => state.isPlaying);
  const dispatch = useDispatch();
  

  const gameModes = [START_GAME_MODE];
  if(difficulties) {
    gameModes.push(...Object.keys(difficulties));
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: Action.SET_CURRENT_DIFFICULTY,
      payload: event.target.value
    });
  }

  return (
    <select
      value={currentMode || START_GAME_MODE}
      onChange={onChange}
      disabled={isPlaying}
    >
      {gameModes.map(key => (
        <option key={key} value={key}>
          {key}
        </option>)
      )}
    </select>
  );
}

export default SelectMode;