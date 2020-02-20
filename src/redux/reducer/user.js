import {
  SET_TOKEN,
  ADD_CLOSE,
  ADD_CLOSED,
  USER_INFO,
  VOTE_POST,
  EXPLORE_GUILD
} from "../actions";

const defaultState = {
  token: null,
  addClose: false,
  info: {},
  explore_guild: {}
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

    case EXPLORE_GUILD:
      return { ...state, explore_guild: action.value };

    case ADD_CLOSE:
      return { ...state, addClose: true };

    case ADD_CLOSED:
      return { ...state, addClose: false };

    case VOTE_POST:
      let isVoted = false;
      if (Array.isArray(state.info.vote)) {
        state.info.vote.forEach(element => {
          if (element.post === action.post) {
            element.vote = action.value;
            isVoted = true;
          }
        });
      } else {
        state.info.vote = [];
      }

      if (!isVoted) {
        state.info.vote.push({ post: action.post, vote: action.value });
      }
      return { ...state };

    default:
      return state;
  }
};
