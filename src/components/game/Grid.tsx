import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux';
import * as T from "../../types";


function Grid() {

  console.log('render Grid')

  const dispatch = useDispatch();
  const difficulties = useSelector<T.State, T.State['difficulties']>(state => state.difficulties);
  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
  const isPlaying = useSelector<T.State, T.State['isPlaying']>(state => state.isPlaying);

  const startColor = 'white';

  const [grid, setGrid] = useState([[startColor]]);

  // !!! До тех пот пока не выбран режим сложности, таймеры нельзя включать !!!
  const { field = 1, delay = null } = difficulties && currentMode
    ? difficulties[currentMode]
    : {};

  useEffect(() => {
    setGrid(new Array(field).fill(new Array(field).fill(startColor)));
  }, [field]);

  const unfilledCells = useRef((() => {
    const array = [];
    for (let row = 0; row < field; ++row) {
      for (let col = 0; col < field; ++col) {
        array.push([row, col]);
      }
    }
    return array;
  })());

  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setTimeout()
  }, [isPlaying])

  useEffect(() => {
    () => clearTimeout(timerId.current)
  }, [click])



  return (
    <div>
      {grid.map(row => (
        <div className='row'>
          {row.map(color => (<div className={color} />))}
        </div>
      ))}
    </div>
  );
}

export default Grid;