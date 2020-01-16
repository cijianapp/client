const defaultState = { xx: "" };

export default (state = defaultState, action) => {
  switch (action.type) {
    case "WEBSOCKET:MESSAGE":
      return { ...state, xx: action.payload };

    default:
      return { ...state };
  }
};
