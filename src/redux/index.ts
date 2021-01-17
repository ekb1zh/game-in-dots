import { createStore, applyMiddleware, Reducer, AnyAction } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as T from "../types";
import { Stage } from '../constants';


// Actions
export enum Action {
  SET_DIFFICULTIES = 'SET_DIFFICULTIES',
  SET_CURRENT_MODE = 'SET_CURRENT_MODE',
  SET_PLAYER_NAME = 'SET_PLAYER_NAME',
  SET_WINNERS = 'SET_WINNERS',
  SET_SCORE = 'SET_SCORE',
  SET_STAGE = 'SET_STAGE',
};

// Create default state
function newState(): T.State {
  return {
    difficulties: null,
    currentMode: null,
    playerName: null,
    winners: null,
    score: [0, 0],
    stage: Stage.SETTING,
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

      default:
        return state;
    }
  }


// Store
export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);