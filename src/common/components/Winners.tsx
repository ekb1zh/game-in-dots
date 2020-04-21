import React from 'react';
import { connect } from 'react-redux';
import * as T from "../types";


type Props = Readonly<{
  winners: T.State['winners']
}>

const Winners: React.FC<Props> = React.memo((props) => {

  const { winners } = props;

  return (
    <div className='container winners'>
      <h3>Leader Board</h3>
      {winners && (
        <ul className='stretch'>
          {[...winners].reverse().map(({ winner, date, id }) => (
            <li key={id} className='container'>
              <span>{winner}</span>
              <span>{date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default connect(
  (state: T.State) => ({ winners: state.winners }),
)(Winners);