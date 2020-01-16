import WebClient from "../../client";

const middleware = store => next => action => {
  WebClient.onmessage = event =>
    store.dispatch({ type: "WEBSOCKET:MESSAGE", payload: event });

  switch (action.type) {
    // User request to connect
    case "WEBSOCKET:CONNECT":
      // Configure the object
      WebClient.initialize("ws://cijian.net:8080/ws");

      // Attach the callbacks
      WebClient.onopen = () => store.dispatch({ type: "WEBSOCKET:OPEN" });
      WebClient.onclose = event =>
        store.dispatch({ type: "WEBSOCKET:CLOSE", payload: event });
      WebClient.onmessage = event =>
        store.dispatch({ type: "WEBSOCKET:MESSAGE", payload: event });

      break;

    // User request to send a message
    case "WEBSOCKET:SEND":
      WebClient.send(JSON.stringify(action.payload));
      break;

    // User request to disconnect
    case "WEBSOCKET:DISCONNECT":
      WebClient.close();
      break;

    default:
      // We don't really need the default but ...
      break;
  }

  return next(action);
};

export default middleware;
