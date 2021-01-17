import React from "react";
import { useSelector } from "react-redux";
import SelectMode from "./SelectMode";
import Button from "./PlayButton";
import TextField from "./TextField";
import Message from "./Message";
import Table from "./Table";
import * as T from "../types";
import "./Game.scss";

function Game() {
  const { difficulties, currentMode } = useSelector(
    ({ difficulties, currentMode }: T.State) => ({
      difficulties,
      currentMode,
    })
  );

  return (
    <div className="game">
      <div className="controls">
        <SelectMode />
        <TextField />
        <Button />
      </div>
      <Message />
      {difficulties && currentMode && <Table />}
    </div>
  );
}

export default Game;
