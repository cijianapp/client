import { createStore, combineReducers, applyMiddleware } from "redux";
import auth from "../reducer/auth";
import user from "../reducer/user";
import websocket from "../reducer/websocket";
import thunk from "redux-thunk";
import wsMiddleware from "../middleware/websocket";

import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({ auth, user, websocket });

const middleware = [thunk, wsMiddleware];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
