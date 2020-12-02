import {combineReducers, createStore, applyMiddleware} from "redux";

import authReducer from "./reducers/authReducer";
import teamsReducer from "./reducers/teamsReducer";
import thunk from "redux-thunk";

const store = createStore(
    combineReducers({
    authReducer : authReducer,
    teamsReducer : teamsReducer
 }),
 {}, 
 applyMiddleware(thunk)
);

export default store;