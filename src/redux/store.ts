import { createStore, applyMiddleware, Reducer } from "redux";
import thunk from 'redux-thunk';
import { State, Action } from "../types";


// Actions
export const SET_DIFFICULTY = 'SET_DIFFICULTY';
export type SET_DIFFICULTY = typeof SET_DIFFICULTY;


// Reducers
const reducer: Reducer<State, Action> = (state = {}, action) => {
  switch (action.type) {
    case SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload
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