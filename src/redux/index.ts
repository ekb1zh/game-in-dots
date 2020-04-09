import { createStore, applyMiddleware, Reducer, AnyAction } from "redux";
import thunk from 'redux-thunk';
import * as T from "../types";


// Action
export enum Action {
  SET_DIFFICULTIES  = 'SET_DIFFICULTIES',
  SET_CURRENT_MODE  = 'SET_CURRENT_MODE',
  SET_PLAYER_NAME   = 'SET_PLAYER_NAME',
  SET_IS_PLAYING    = 'SET_IS_PLAYING',
  SET_WINNERS       = 'SET_WINNERS',
};


// Reducer
const reducer: Reducer<T.State, AnyAction & { payload: any }> = 
  (state = {}, action) => {

    console.log('reducer', { state, action })

    switch (action.type) {

      case Action.SET_DIFFICULTIES:
        return {
          ...state,
          difficulties: action.payload
        };

      case Action.SET_IS_PLAYING:
        return {
          ...state,
          isPlaying: action.payload
        }

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

      default:
        return state;
    }
  }


// Store
export default createStore(
  reducer,
  applyMiddleware(thunk)
);