import React, { useEffect } from 'react'
import { AnyAction } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import { ActionType } from './redux'
import Game from './components/Game'
import Winners from './components/Winners'
import { fetchWrapper } from './helpers'
import * as T from './types'
import { GAME_SETTINGS_URL, GAME_WINNERS_URL } from './constants'

type AsyncAction = ThunkAction<void, T.State, undefined, AnyAction>
const initialAction: AsyncAction = (dispatch, getState) => {
  fetchWrapper(GAME_SETTINGS_URL).then((res) =>
    dispatch({
      type: ActionType.SET_DIFFICULTIES,
      payload: res,
    }),
  )

  fetchWrapper(GAME_WINNERS_URL).then((res) =>
    dispatch({
      type: ActionType.SET_WINNERS,
      payload: res,
    }),
  )
}

function App() {
  const { difficulties, currentMode } = useSelector(
    ({ difficulties, currentMode }: T.State) => ({
      difficulties,
      currentMode,
    }),
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialAction)
  }, [])

  return (
    <>
      <Game />
      <div
        className={`separator${difficulties && currentMode ? ' hidden' : ''}`}
      />
      <Winners />
    </>
  )
}

export default App
