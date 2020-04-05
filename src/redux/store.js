import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

// Store
export default createStore(
  combineReducers({
    select
  }),
  applyMiddleware(thunk)
);


// Reducers
export const SET_SELECT = 'SET_SELECT';

function select(state = {
    response: {},
    currentValue: 'Pick game mode',
  },
  action
)
{
  return action.type === SET_SELECT
    ? action.payload
    : state;
}