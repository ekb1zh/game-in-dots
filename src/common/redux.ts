import { createStore, applyMiddleware, Reducer, AnyAction, compose } from "redux";
import thunk from 'redux-thunk';
import * as T from "./types";
import { GameStage } from './index'


// Action
export enum Action {
  SET_DIFFICULTIES = 'SET_DIFFICULTIES',
  SET_CURRENT_MODE = 'SET_CURRENT_MODE',
  SET_PLAYER_NAME = 'SET_PLAYER_NAME',
  SET_WINNERS = 'SET_WINNERS',
  SET_SCORE = 'SET_SCORE',
  SET_STAGE = 'SET_STAGE',
  SET_TIMER_ID = 'SET_TIMER_ID',
};

// Create default state
function newState(): T.State {
  return {
    difficulties: null,
    currentMode: null,
    playerName: null,
    winners: null,
    timerId: null,
    score: [0, 0],
    stage: GameStage.SETTING,
  };
}

// Reducer
const reducer: Reducer<T.State, AnyAction & { payload: any }> =
  (state = newState(), action) => {

    switch (action.type) {

      case Action.SET_DIFFICULTIES:
        return {
          ...state,
          difficulties: action.payload
        };

      case Action.SET_CURRENT_MODE:
        return {
          ...state,
          currentMode: action.payload
        };

      case Action.SET_PLAYER_NAME:
        return {
          ...state,
          playerName: action.payload
        };

      case Action.SET_WINNERS:
        return {
          ...state,
          winners: action.payload
        };

      case Action.SET_SCORE:
        return {
          ...state,
          score: action.payload
        };

      case Action.SET_STAGE:
        return {
          ...state,
          stage: action.payload
        };

      case Action.SET_TIMER_ID:
        return {
          ...state,
          timerId: action.payload,
        };

      default:
        return state;
    }
  }


// Store
export default createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);