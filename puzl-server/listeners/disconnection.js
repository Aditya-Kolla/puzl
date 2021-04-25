module.exports = function (io) {
    io.on('disconnect', function (socket) {
        console.log('Socket disconnected with id: ' + socket.id);
    })
  }