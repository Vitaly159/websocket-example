const ws = require("ws");

const wss = new ws.Server({ port: 5000 }, () => console.log("server on port 5000"));

wss.on("connection", function connection(ws) {
  ws.on("message", function (message) {
    message = JSON.parse(message);

    if (message.event === "message") {
      broadcastMessage(message);
      return;
    } else if (message.event === "connection") {
      broadcastMessage(message);
      return;
    }
  });
});

function broadcastMessage(message, id) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
