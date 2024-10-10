// Unimos todo

// Servidor con express
const app = require("./app");
const envs = require("./configuration/envs");

// Servidor con http
const http = require("http");
const server = http.createServer(app);

//* Servidor con Socket.io
const { Server } = require("socket.io");
const io = new Server(server);

// Llamada a la fx del socket
const socketHandler = require("./sockets/recibos.socket");

//const socketHandler = require("./sockets/handler.socket");

const main = () => {
  server.listen(app.get("port"));

  // Levantar el servidor de Socket.IO
  io.on("connection", (socket /* La conexión del usuario */) => {
    socketHandler.socketConnections(socket, io);
  });

  console.log(`Server on port ${envs.port}`);
};
main();
