import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ActionType } from '../redux'
import * as T from '../types'
import { Stage } from '../constants'
import './TextField.scss'

function TextField() {
  const {
    playerName,
    stage,
  } = useSelector(({ playerName, stage }: T.State) => ({ playerName, stage }))

  const dispatch = useDispatch()

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: ActionType.SET_PLAYER_NAME,
      payload: event.target.value,
    })
  }

  return (
    <input
      className='text-field'
      type='text'
      value={playerName || ''}
      placeholder='Enter your name'
      onChange={onChange}
      disabled={stage !== Stage.SETTING}
    />
  )
}

export default TextField
