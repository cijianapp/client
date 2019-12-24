import { LOGIN, NO_LOGIN } from "../actions";

const defaultState = { login: false };

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, login: true };

    case NO_LOGIN:
      return { ...state, login: false };

    default:
      return { ...state };
  }
};
