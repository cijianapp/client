// import Discord from "discord.js";

import WebSocketClient from "./websocket_client.js";

// const client1 = new Discord.Client();

// client1.on("ready", () => {
//   console.log("I am ready!");
// });

// client1.on("message", message => {
//   // If the message is "ping"
//   if (message.content === "ping") {
//     // Send "pong" to the same channel
//     message.channel.send("pong");
//   }
// });

// Log our bot in using the token from https://discordapp.com/developers/applications/me
// client1.login("NjY1NjEwNDc0NDkwMTY3Mjk3.XhoI7w.6Ke7oBfl5UVHbDDRQa6YNNPVlHs");

// export default client1;

var WebClient = new WebSocketClient();

export default WebClient;

WebClient.initialize("ws://cijian.net:8080/ws");
