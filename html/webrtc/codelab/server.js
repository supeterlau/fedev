"use strict";

const os = require("os"),
  nodeStatic = require("node-static"),
  http = require("http"),
  socketIO = require("socket.io");

let fileServer = new nodeStatic.Server();
let app = http
  .createServer((req, res) => {
    req
      .addListener("end", function () {
        fileServer.serve(req, res, function (e) {
          if (e && e.status === 404) {
            // If the file wasn't found
            fileServer.serveFile("/index.html", 404, {}, req, res);
          }
        });
      })
      .resume();
  })
  .listen(8090, "0.0.0.0");

// let io = socketIO.listen(app);
let io = socketIO(app);

io.on("connection", (socket) => {
  let log = (msg) => {
    let array = ["Message from server:"];
    array.push.apply(array, [msg]);
    console.log(msg);
    socket.emit("log", array);
  };

  socket.on("message", (message) => {
    log("Client said: ", message);
    // 全局广播 (要改为 room 内广播)
    socket.broadcast.emit("message", message);
    // socket.to(anotherSocketId).emit("private message", socket.id, msg);
  });

  socket.on("create or join", (room) => {
    log("Received request to create or join room: " + room);
    console.log(io.sockets.adapter.rooms);
    let clientsInRoom = io.sockets.adapter.rooms.get(room);
    console.log("clientsInRoom:", clientsInRoom);
    let numClients = clientsInRoom ? clientsInRoom.size : 0;
    log("Room " + room + " now has " + numClients + " client(s)");

    if (numClients === 0) {
      socket.join(room);
      log("ClientId " + socket.id + " created room " + room);
      socket.emit("created", room, socket.id);
    } else if (numClients === 1) {
      log("ClientId " + socket.id + " joined room " + room);
      io.in(room).emit("join", room);
      socket.join(room);
      socket.emit("joined", room, socket.id);
      io.in(room).emit("ready");
    } else {
      // 最多支持两个连接
      socket.emit("full", room);
    }

    socket.on("ipaddr", () => {
      let ifaces = os.networkInterfaces();
      for (var dev in iface) {
        ifaces[dev].forEach((details) => {
          if (details.family === "IPv4" && details.address !== "127.0.0.1") {
            socket.emit("ipaddr", details.address);
          }
        });
      }
    });
  });
});
