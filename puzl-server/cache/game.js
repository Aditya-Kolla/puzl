const { azadd } = require('./index');

const addPlayerToGame = async (gameId, playerId) => {
    const key = getGameKey(gameId);
    const res = await azadd(key, 0, playerId);
    return res;
}

const getGameKey = (gameId) => {
    return `game:${gameId}`;
}

module.exports = {
    addPlayerToGame
}