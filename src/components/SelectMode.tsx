import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionType } from "../redux";
import * as T from "../types";
import { Stage } from "../constants";
import "./SelectMode.scss";

const START_GAME_MODE = "Pick game mode";

function SelectMode() {
  const { difficulties, currentMode, stage } = useSelector(
    ({ difficulties, currentMode, stage }: T.State) => ({
      difficulties,
      currentMode,
      stage,
    })
  );
  const dispatch = useDispatch();

  const gameModes = [START_GAME_MODE];
  if (difficulties) {
    gameModes.push(...Object.keys(difficulties));
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    dispatch({
      type: ActionType.SET_CURRENT_MODE,
      payload: value === START_GAME_MODE ? null : value,
    });
  }

  return (
    <select
      className="select-mode"
      value={currentMode || START_GAME_MODE}
      onChange={onChange}
      disabled={stage !== Stage.SETTING}
    >
      {gameModes.map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
}

export default SelectMode;
