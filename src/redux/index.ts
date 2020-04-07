import { createStore, applyMiddleware, Reducer, AnyAction } from "redux";
import thunk from 'redux-thunk';
import * as T from "../types";


// Actions
export const enum Actions {
  SET_DIFFICULTIES        = 'SET_DIFFICULTIES',
  SET_CURRENT_DIFFICULTY  = 'SET_CURRENT_DIFFICULTY',
  SET_PLAYER_NAME         = 'SET_PLAYER_NAME',
  SET_IS_PLAYING          = 'SET_IS_PLAYING',
  SET_WINNERS             = 'SET_WINNERS',
};


// Reducer
const reducer: Reducer<T.State, AnyAction & { payload: any }> = 
  (state = {}, action) => {

    console.log('reducer', { state, action })

    switch (action.type) {

      case Actions.SET_DIFFICULTIES:
        return {
          ...state,
          difficulties: action.payload
        };

      case Actions.SET_IS_PLAYING:
        return {
          ...state,
          isPlaying: action.payload
        }

      case Actions.SET_CURRENT_DIFFICULTY:
        return {
          ...state,
          currentMode: action.payload
        };

      case Actions.SET_PLAYER_NAME:
        return {
          ...state,
          playerName: action.payload
        };

      case Actions.SET_WINNERS:
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