import { LOGIN, NO_LOGIN, TO_LOGIN } from "../actions";

const defaultState = { login: false, openLoginControl: false };

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, login: true };

    case NO_LOGIN:
      return { ...state, login: false };

    case TO_LOGIN:
      return { ...state, openLoginControl: action.value };

    default:
      return { ...state };
  }
};
