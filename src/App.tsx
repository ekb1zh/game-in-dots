import React from 'react';
import { AnyAction } from 'redux';
import { useSelector, useDispatch } from "react-redux";
import { ThunkAction } from 'redux-thunk';
import 'normalize.css';
import './App.scss';
import { actions } from './redux';
import Select from "./components/game/Select";
import PlayButton from './components/game/PlayButton';
import TextField from './components/game/TextField';
import Message from './components/game/Message';
import { fetchWrapper } from './helpers';
import * as T from './types';


export const START_GAME_MODE = 'Pick game mode';
const GAME_SETTINGS_URL = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';


function App() {

  console.log('render App')

  const state = useSelector<T.State, T.State>(state => state);

  if (!state || !state.difficulties) {
    type AsyncAction = ThunkAction<void, T.State, undefined, AnyAction>;
    const asyncAction: AsyncAction =
      (dispatch, getState) => fetchWrapper(GAME_SETTINGS_URL)
        .then(res => dispatch({
          type: actions.SET_DIFFICULTIES,
          payload: res as any as T.Difficulties,
        }));

    useDispatch()(asyncAction);
  }

  return (
    <>
      <div className='container'>
        <Select />
        <TextField />
        <PlayButton />
        <Message />
        Squares
      </div>
      <div className='container'>
        Results
      </div>
    </>
  );
}

export default App;
