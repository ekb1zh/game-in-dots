import React from "react";
import Select from "./Select";
import { useSelector } from 'react-redux';

function Controls() {
  
  function onSubmit(event) {
    event.preventDefault();
    console.log('form');
  }
  
  return (
    <form onSubmit={onSubmit} className={'container'} >
      
      <Select />
      
      <input type={'text'} placeholder={'Enter your name'} />
  
      <button type="submit">
        {'PLAY'}
      </button>
      
    </form>
  );
}

export default Controls;