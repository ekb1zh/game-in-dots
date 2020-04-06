import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { START_GAME_MODE } from '../../App';
import { actions } from '../../redux';
import * as T from "../../types";

function Select() {

  const dispatch = useDispatch();
  const difficulties = useSelector<T.State, T.State['difficulties']>(state => state.difficulties);
  const currentDifficulty = useSelector<T.State, T.State['currentDifficulty']>(state => state.currentDifficulty);
  const isPlaying = useSelector<T.State, T.State['isPlaying']>(state => state.isPlaying);

  const gameModes = [START_GAME_MODE];
  if(difficulties) {
    gameModes.push(...Object.keys(difficulties));
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: actions.SET_CURRENT_DIFFICULTY,
      payload: event.target.value
    });
  }

  return (
    <select
      value={currentDifficulty || START_GAME_MODE}
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

export default Select;