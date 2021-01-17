import React from 'react'
import { connect } from 'react-redux'
import * as T from '../types'
import './Winners.scss'

type Props = Readonly<{
  winners: T.State['winners']
}>

const Winners: React.FC<Props> = React.memo((props) => {
  const { winners } = props

  return (
    <div className='winners'>
      <h3>{winners ? 'Leader Board' : 'Loading...'}</h3>
      {winners && (
        <ul>
          {winners
            .map(({ winner, date, id }) => (
              <li key={id}>
                <span>{winner}</span>
                <span>{date}</span>
              </li>
            ))
            .reverse()}
        </ul>
      )}
    </div>
  )
})

export default connect(({ winners }: T.State) => ({ winners }))(Winners)
