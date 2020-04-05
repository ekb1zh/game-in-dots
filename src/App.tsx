import React from 'react';
import 'normalize.css';
import './App.scss';
import Controls from './components/game/controls';
import { useDispatch } from "react-redux";
import { SET_SELECT } from "./redux/store";
import { ThunkAction } from 'redux-thunk';

const URL_GAME_SETTINGS = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';

function fetchWrapper(url, options) {
  return fetch.call(null, arguments)
    .then(res => {
      if(res.ok) return res.json()
      else throw new Error(`Fetch error: ${res.status}`)
    })
    .catch(err => console.error(err));
}

function App() {
  
  const action: ThunkAction = (dispatch, getState) => {
    fetchWrapper(URL_GAME_SETTINGS)
      .then(res => dispatch({
          type: SET_SELECT,
          payload: {
            response: res,
            currentValue: getState().select.currentValue,
          },
        })
      );
  };

  useDispatch()(action);
  
  return (
    <>
      <Controls/>
      <div className="container">
        Content 2
      </div>
    </>
  );
}

export default App;
