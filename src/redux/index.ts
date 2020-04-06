import { createStore, applyMiddleware, Reducer, AnyAction } from "redux";
import thunk from 'redux-thunk';
import * as T from "../types";


// Actions
export const actions = Object.freeze({
  SET_DIFFICULTIES: 'SET_DIFFICULTIES',
  SET_CURRENT_DIFFICULTY: 'SET_CURRENT_DIFFICULTY',
  SET_PLAYER_NAME: 'SET_PLAYER_NAME',
  SET_IS_PLAYING: 'SET_IS_PLAYING',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_SQUARES: 'SET_SQUARES',
  SET_WINNERS: 'SET_WINNERS',
});


// Reducers
const reducer: Reducer<T.State, AnyAction & { payload: any }> =
  (state = {}, action) => {

    console.log('reducer', { state, action })

    switch (action.type) {

      case actions.SET_DIFFICULTIES:
        return {
          ...state,
          difficulties: action.payload
        };

      case actions.SET_IS_PLAYING:
        return {
          ...state,
          isPlaying: action.payload
        }

      case actions.SET_CURRENT_DIFFICULTY:
        return {
          ...state,
          currentMode: action.payload
        };

      case actions.SET_PLAYER_NAME:
        return {
          ...state,
          playerName: action.payload
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