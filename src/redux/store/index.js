import { createStore, combineReducers, applyMiddleware } from "redux";
import auth from "../reducer/auth";
import user from "../reducer/user";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({ auth, user });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
