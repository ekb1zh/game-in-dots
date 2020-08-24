import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Action } from '../redux';
import * as T from "../types";
import { Stage } from '../common-info';
import './SelectMode.scss';


const START_GAME_MODE = 'Pick game mode';


function SelectMode() {

  const difficulties = useSelector((state: T.State) => state.difficulties);
  const currentMode = useSelector((state: T.State) => state.currentMode);
  const stage = useSelector((state: T.State) => state.stage);
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
      className='select-mode'
      value={currentMode || START_GAME_MODE}
      onChange={onChange}
      disabled={stage !== Stage.SETTING}
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