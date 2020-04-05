import React, { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../types";

function Select() {

  const [currentValue, setCurrentValue] = useState('Pick game mode');
  const state = useSelector<State, State>(state => state);

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentValue(event.target.value);
  }

  return (
    <select value={currentValue} onChange={onChange}>
      {state.difficulty
        ? Object.keys(state.difficulty).map(key => (
          <option value={key}>
            {key}
          </option>))
        : null
      }
    </select>
  );
}

export default Select;