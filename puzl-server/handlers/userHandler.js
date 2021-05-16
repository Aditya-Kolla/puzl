module.exports = (io, socket) => {
    const userDisconnect = () => {
        console.log(`Disconnected ${socket.id}`);
    }
  
    socket.on("disconnect", userDisconnect);
  }