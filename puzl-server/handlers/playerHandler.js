module.exports = (io, socket) => {
    const playerDisconnect = () => {
        console.log(`Disconnected ${socket.id}`);
    }
  
    socket.on("disconnect", playerDisconnect);
  }