import React from 'react';
import 'normalize.css';
import './App.scss';
import Controls from './components/game/controls';
import { useDispatch } from "react-redux";
import { SET_DIFFICULTY } from "./redux/store";
import { ThunkAction } from 'redux-thunk';
import { fetchWrapper } from './helpers';
import { State, Action, Difficulty } from './types';


const GAME_SETTINGS_URL = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';

function App() {

  type ActionAsync = ThunkAction<void, State, undefined, Action>;
  const actionAsync: ActionAsync = (dispatch, getState) =>
    fetchWrapper(GAME_SETTINGS_URL)
      .then(res => dispatch({
        type: SET_DIFFICULTY,
        payload: res as any as Difficulty,
      }));

  useDispatch()(actionAsync);

  return (
    <>
      <Controls />
      <div className="container">
        Content 2
      </div>
    </>
  );
}

export default App;
