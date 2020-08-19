import React, { useEffect } from 'react';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action } from './redux';
import SelectMode from "./components/SelectMode";
import Button from './components/Button';
import TextField from './components/TextField';
import Message from './components/Message';
import Grid from './components/Grid';
import Winners from './components/Winners'
import { fetchWrapper } from './helpers';
import * as T from './types';
import { GAME_SETTINGS_URL, GAME_WINNERS_URL } from './common-info';



function App() {

  const difficulties = useSelector((state: T.State) => state.difficulties);
  const currentMode = useSelector((state: T.State) => state.currentMode);
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
      <div className='container game'>
        <div className='container controls'>
          <SelectMode />
          <TextField />
          <Button />
        </div>
        <Message />
        {difficulties && currentMode && <Grid />}
      </div>
      <div className='container results'>
        <Winners />
      </div>
    </>
  );
}

export default App;
