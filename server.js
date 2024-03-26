const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 443;
const ip = "https://localhost";
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/app.js", (req, res) => {
  res.sendFile(__dirname + "/app.js");
});

server.listen(port, () => {
  console.log(ip + ":" + port);
});

const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  io.emit("chat message", "A user connected !");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    io.emit("chat message", "A user disconnected !");
  });
});
