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

//const socketHandler = require("./sockets/handler.socket");

let sockets = [];

const main = () => {
  server.listen(app.get("port"));

  // Levantar el servidor de Socket.IO
  io.on("connection", (socket /* La conexión del usuario */) => {
    console.log(`Usuario conectado: ${socket.id}`);

    sockets.push({
      id: socket.id,
      nombre: socket.handshake.headers
        ? socket.handshake.headers.nombre
        : "No tiene nombre de usuario",
    });

    // socketHandler.socketHandler(socket);

    io.emit("usuario", JSON.stringify(sockets));

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
      sockets = sockets.filter((i) => i.id !== socket.id);
      console.log(sockets);
    });
  });

  console.log(`Server on port ${envs.port}`);
};
main();
