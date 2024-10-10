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
let socketsInfo = [];

const main = () => {
  server.listen(app.get("port"));

  // Levantar el servidor de Socket.IO
  io.on("connection", (socket /* La conexión del usuario */) => {
    console.log(`Usuario conectado: ${socket.id}`);

    sockets.push(socket);
    socketsInfo.push({
      socket: socket.id,
      nombre: socket.handshake.headers
        ? socket.handshake.headers.nombre
        : "No tiene nombre de usuario",
      otro: socket.handshake.headers
        ? socket.handshake.headers.otro
        : "No tiene nombre de usuario",
    });

    // socketHandler.socketHandler(socket);
    socket.on("nuevo-recibo", (data) => {
      io.emit("nuevo-recibo-carga", JSON.stringify(data));
      // sockets.forEach((s) => {
      //   s.emit("nuevo-recibo-carga", JSON.stringify(data));
      // });
    });
    //sockets[0].emit("usuario", JSON.stringify(socketsInfo));

    sockets[0].on("hola", (data) => {
      const nombre = socketsInfo.find(
        (i) => i.nombre == socket.handshake.headers.otro
      );
      if (nombre) {
        const otro = sockets.find((i) => i.id == nombre.socket);
        otro.emit("recibe-hola", data);
      }
    });

    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
      sockets = sockets.filter((i) => i.id !== socket.id);
      console.log(sockets);
    });
  });

  console.log(`Server on port ${envs.port}`);
};
main();
