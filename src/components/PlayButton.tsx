import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionType } from "../redux";
import * as T from "../types";
import { Stage } from "../constants";
import "./PlayButton.scss";

function Button() {
  const { currentMode, playerName, stage } = useSelector(
    ({ currentMode, playerName, stage }: T.State) => ({
      currentMode,
      playerName,
      stage,
    })
  );
  const dispatch = useDispatch();

  function onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    switch (stage) {
      case Stage.SETTING:
        dispatch({
          type: ActionType.SET_STAGE,
          payload: Stage.PLAYING,
        });
        break;

      case Stage.PLAYING:
      case Stage.WIN:
        dispatch({
          type: ActionType.SET_CURRENT_MODE,
          payload: null,
        });
        dispatch({
          type: ActionType.SET_SCORE,
          payload: [0, 0],
        });
        dispatch({
          type: ActionType.SET_STAGE,
          payload: Stage.SETTING,
        });
        break;

      default:
        throw new Error();
    }
  }

  const isDisabled = !playerName || !currentMode;

  let label;
  switch (stage) {
    case Stage.SETTING:
      label = "PLAY";
      break;
    case Stage.PLAYING:
    case Stage.WIN:
      label = "PLAY AGAIN";
      break;
    default:
      throw new Error();
  }

  return (
    <button
      className="play-button"
      onClick={onClick}
      disabled={isDisabled}
      style={{ opacity: isDisabled ? 0.1 : 1 }}
    >
      {label}
    </button>
  );
}

export default Button;
