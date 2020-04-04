import React from "react";
import ArrowDown from "../../../images/keyboard_arrow_down-black-18dp.svg";

function Controls(props) {
  
  function onSubmit(event) {
    event.preventDefault();
    console.log('form');
  }
  
  return (
    <form onSubmit={onSubmit} className={'container'} >
      
      <button type={'button'}>
        <span>Pick game mode</span>
        <img src={ArrowDown} alt={'ArrowDown'} />
      </button>
  
      <select>
        <option value=""></option>
      </select>
      
      <input type={'text'} placeholder={'Enter your name'} />
  
      <button type="submit">
        {'PLAY'}
      </button>
      
    </form>
  );
}

export default Controls;