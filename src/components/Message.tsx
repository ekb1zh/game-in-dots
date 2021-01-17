import React from "react";
import { useSelector } from "react-redux";
import * as T from "../types";
import { Stage } from "../common-info";
import "./Message.scss";

function Message() {
  const { currentMode, playerName, stage, score } = useSelector(
    ({ currentMode, playerName, stage, score }: T.State) => ({
      currentMode,
      playerName,
      stage,
      score,
    })
  );

  let message = "";
  let color = "#888888";

  switch (stage) {
    case Stage.SETTING: {
      const isStartGameMode = !currentMode;
      const isAbsentPlayerName = !playerName;

      if (isStartGameMode) {
        message += "pick game mode";
      }

      if (isStartGameMode && isAbsentPlayerName) {
        message += " and ";
      }

      if (isAbsentPlayerName) {
        message += "enter your name";
      }

      if (!message) {
        message += "push PLAY button, and good luck :-)";
      }

      message = `Please, ${message}`;
      color = "sandybrown";

      break;
    }

    case Stage.PLAYING: {
      const [player, computer] = score;
      message = `Score: You ${player} : ${computer} "computer"`;
      break;
    }

    case Stage.WIN: {
      const [player, computer] = score;
      message = `Game over. Score: ${player} : ${computer}. ${
        player > computer ? "You are win!" : "Computer win."
      } \nPlease, play again :-)`;
      break;
    }

    default:
      throw new Error();
  }

  return message ? (
    <p className="message" style={{ color }}>
      {message}
    </p>
  ) : null;
}

export default Message;
