import React, { useEffect } from 'react';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action } from './common/redux';
import SelectMode from "./common/components/SelectMode";
import Button from './common/components/Button';
import TextField from './common/components/TextField';
import Message from './common/components/Message';
import Grid from './common/components/Grid';
import GridClass from './common/components/GridClass';
import Winners from './common/components/Winners'
import { fetchWrapper } from './common/helpers';
import * as T from './common/types';
import { GAME_SETTINGS_URL, GAME_WINNERS_URL } from './common';



function App() {

  const difficulties = useSelector<T.State, T.State['difficulties']>(state => state.difficulties);
  const currentMode = useSelector<T.State, T.State['currentMode']>(state => state.currentMode);
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
        <div className='container'>
          <SelectMode />
          <TextField />
          <Button />
        </div>
        <Message />
        {difficulties && currentMode && <GridClass />}
        {/* {difficulties && currentMode && <Grid />} */}
      </div>
      <div className='container results'>
        <Winners />
      </div>
    </>
  );
}

export default App;
