import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Action } from '../redux';
import * as T from "../types";
import { GameStage } from '../index';


const START_GAME_MODE = 'Pick game mode';


function SelectMode() {

  // console.log('render Select')

  const difficulties = useSelector<T.State, T.State['difficulties']>(state => state.difficulties);
  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
  const stage = useSelector<T.State, T.State['stage']>(state => state.stage);
  const dispatch = useDispatch();

  const gameModes = [START_GAME_MODE];
  if(difficulties) {
    gameModes.push(...Object.keys(difficulties));
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    dispatch({
      type: Action.SET_CURRENT_MODE,
      payload: value === START_GAME_MODE ? null : value,
    });
  }

  return (
    <select
      value={currentMode || START_GAME_MODE}
      onChange={onChange}
      disabled={stage !== GameStage.SETTING}
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