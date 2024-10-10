let sockets = [];
let socketsInfo = [];

const socketHandler = (socket, io) => {
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
};

module.exports = { socketHandler };
