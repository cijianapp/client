import { createStore, combineReducers, applyMiddleware } from "redux";
import auth from "../reducer/auth";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({ auth });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
