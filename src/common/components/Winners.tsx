import React from 'react';
import { useSelector } from 'react-redux';
import * as T from "../types";



function Winners() {

  const winners = useSelector<T.State, T.State['winners']>(state => state.winners);

  return (
    <div className='container winners'>
      <h3>Leader Board</h3>
      {winners && (
        <ul className='stretch'>
          {[...winners].reverse().map(({ winner, date }, index, arr) => (
            <li key={index} className='container'>
              <span>{winner}</span>
              <span>{date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Winners;