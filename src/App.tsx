import React from 'react';
import 'normalize.css';
import { AnyAction } from 'redux';
import { useDispatch } from "react-redux";
import { ThunkAction } from 'redux-thunk';
import './App.scss';
import { Actions } from './redux/store';
import Select from "./components/game/Select";
import PlayButton from './components/game/PlayButton';
import TextField from './components/game/TextField';
import { fetchWrapper } from './helpers';
import { State, Difficulties } from './types';


export const START_GAME_MODE = 'Pick game mode';
const GAME_SETTINGS_URL = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';


function App() {

  type AsyncAction = ThunkAction<void, State, undefined, AnyAction>;
  const asyncAction: AsyncAction = (dispatch, getState) =>
    fetchWrapper(GAME_SETTINGS_URL)
      .then(res => dispatch({
        type: Actions.SET_DIFFICULTIES,
        payload: res as any as Difficulties,
      }));

  useDispatch()(asyncAction);
  console.log('render App')

  return (
    <>
      <div className={'container'}>
        {/* <div className={'controls'}> */}
          <Select />
          <TextField />
          <PlayButton />
        {/* </div> */}
      </div>
      <div className="container">
        Content 2
      </div>
    </>
  );
}

export default App;
