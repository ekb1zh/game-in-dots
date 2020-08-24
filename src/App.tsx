import React, { useEffect } from 'react';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action } from './redux';
import Game from './components/Game';
import Winners from './components/Winners'
import { fetchWrapper } from './helpers';
import * as T from './types';
import { GAME_SETTINGS_URL, GAME_WINNERS_URL } from './common-info';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    type AsyncAction = ThunkAction<void, T.State, undefined, AnyAction>;
    const asyncAction: AsyncAction = (dispatch, getState) => {

      fetchWrapper(GAME_SETTINGS_URL)
        .then(res => dispatch({
          type: Action.SET_DIFFICULTIES,
          payload: res,
        }));

      fetchWrapper(GAME_WINNERS_URL)
        .then(res => dispatch({
          type: Action.SET_WINNERS,
          payload: res,
        }));
    }

    dispatch(asyncAction);
  }, []);

  return (
    <>
      <Game />
      <div className="separator" />
      <Winners />
    </>
  );
}

export default App;
