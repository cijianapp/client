const defaultState = { messages: [] };

export default (state = defaultState, action) => {
  switch (action.type) {
    case "WEBSOCKET:MESSAGE1":
      state.messages.push(action.payload);
      return { ...state };

    case "WEBSOCKET:MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };

    default:
      return { ...state };
  }
};
