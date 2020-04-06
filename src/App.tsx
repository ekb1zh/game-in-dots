import React, { useEffect } from 'react';
import { AnyAction } from 'redux';
import { useDispatch } from "react-redux";
import { ThunkAction } from 'redux-thunk';
import 'normalize.css';
import './App.scss';
import { actions } from './redux';
import SelectMode from "./components/game/SelectMode";
import PlayButton from './components/game/PlayButton';
import TextField from './components/game/TextField';
import Message from './components/game/Message';
import Grid from './components/game/Grid';
import { fetchWrapper } from './helpers';
import * as T from './types';


export const START_GAME_MODE = 'Pick game mode';
const GAME_SETTINGS_URL = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';


function App() {

  console.log('render App')

  const dispatch = useDispatch();

  useEffect(() => {
    type AsyncAction = ThunkAction<void, T.State, undefined, AnyAction>;
    const asyncAction: AsyncAction =
      (dispatch, getState) => fetchWrapper(GAME_SETTINGS_URL)
        .then(res => dispatch({
          type: actions.SET_DIFFICULTIES,
          payload: res as any as T.Difficulties,
        }));

    dispatch(asyncAction);
  }, []);

  return (
    <>
      <div className='container'>
        <SelectMode />
        <TextField />
        <PlayButton />
        <Message />
        <Grid />
      </div>
      <div className='container'>
        Results
      </div>
    </>
  );
}

export default App;
