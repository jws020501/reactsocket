const { connect } = require("http2");

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

app.get("/", function (req, res) {
  res.sendfile("index.html");
});

io.sockets.on("connection", function (socket) {
  socket.on("Joinroom", function (data) {
    room_id = data.roomnum;
    socket.join(room_id);
  });
  socket.on("leaveRoom", function (data) {
    room_id = data.roomnum;
    socket.leave(room_id);
  });
  socket.on("send", function (data) {
    name = data.name;
    message = data.message;
    console.log(name + ":" + message);
  });
});

var port = process.env.PORT || 8000;

server.listen(port, function () {
  console.log("localhost:" + port);
});
