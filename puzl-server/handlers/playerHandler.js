const { addPlayerToGame } = require('../cache/game');

module.exports = (io, socket) => {
    const playerDisconnect = () => {
        console.log(`Disconnected ${socket.id}`);
    }
 
    const playerJoin = (data) => {
        const { playerId, gameId, nickname } = data;
        console.log(data);
        if(!gameId) return;
        socket.join(gameId);
        addPlayerToGame(gameId, playerId);
        io.to(gameId).emit('player-add', nickname);
    }

    socket.on('disconnect', playerDisconnect);
    socket.on('player-join', playerJoin);
  }