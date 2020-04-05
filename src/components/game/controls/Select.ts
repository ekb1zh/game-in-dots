import React from "react";
import ArrowDown from "../../../images/keyboard_arrow_down-black-18dp.svg";
import {useDispatch, useSelector} from "react-redux";
import {SET_SELECT} from "../../../redux/store";


function Select() {
  
  const state = useSelector(state => state.select);
  const dispatch = useDispatch();
  
  function onChange(event) {
    dispatch({
      type: SET_SELECT,
      payload: {
        ...this.state,
        currentValue: event.target.value
      }
    })
  }
  
  return (
    <select value={state.currentValue} onChange={onChange}>
      {Object.values(state.response).map(([key]) => {
        return (<option value={key}>{key}</option>);
      })}
    </select>
  );
}

export default Select;