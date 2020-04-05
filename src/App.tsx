import React from 'react';
import { AnyAction } from 'redux';
import { useDispatch } from "react-redux";
import { ThunkAction } from 'redux-thunk';
import 'normalize.css';
import './App.scss';
import { actions } from './redux/store';
import Select from "./components/game/Select";
import PlayButton from './components/game/PlayButton';
import TextField from './components/game/TextField';
import { fetchWrapper } from './helpers';
import * as T from './types';


export const START_GAME_MODE = 'Pick game mode';
const GAME_SETTINGS_URL = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';


function App() {

  type AsyncAction = ThunkAction<void, T.State, undefined, AnyAction>;
  const asyncAction: AsyncAction = (dispatch, getState) =>
    fetchWrapper(GAME_SETTINGS_URL)
      .then(res => dispatch({
        type: actions.SET_DIFFICULTIES,
        payload: res as any as T.Difficulties,
      }));

  useDispatch()(asyncAction);
  console.log('render App')

  return (
    <>
      <div className={'container'}>
        <Select />
        <TextField />
        <PlayButton />
      </div>
      <div className="container">
        Content 2
      </div>
    </>
  );
}

export default App;
