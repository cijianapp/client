import { SET_TOKEN, ADD_CLOSE, ADD_CLOSED, USER_INFO } from "../actions";

const defaultState = {
  token: null,
  addClose: false,
  info: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.value,
        headerConfig: { headers: { Authorization: "Bearer " + action.value } }
      };

    case USER_INFO:
      return { ...state, info: action.value };

    case ADD_CLOSE:
      return { ...state, addClose: true };

    case ADD_CLOSED:
      return { ...state, addClose: false };

    default:
      return state;
  }
};
