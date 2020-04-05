import React, { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../types";

function Select() {

  const startGameMode = 'Pick game mode';

  const [currentValue, setCurrentValue] = useState(startGameMode);
  const state = useSelector<State, State>(state => state);

  const gameModes = [startGameMode];
  if(state.difficulty) {
    gameModes.push(...Object.keys(state.difficulty));
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentValue(event.target.value);
  }

  return (
    <select value={currentValue} onChange={onChange}>
      {gameModes.map(key => (
        <option key={key} value={key}>
          {key}
        </option>)
      )}
    </select>
  );
}

export default Select;