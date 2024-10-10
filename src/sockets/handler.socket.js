const socketHandler = (socket) => {
  socket.on("message", (data) => {
    console.log("Mensaje recibido", data);

    socket.emit("message", "Su mensaje fue procesado correctamente");
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
};

module.exports = { socketHandler };


