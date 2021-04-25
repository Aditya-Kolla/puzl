module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('New Connection: ', socket.id);
    })
  }