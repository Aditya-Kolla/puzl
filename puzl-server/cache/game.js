const { azadd, ahset, ahgetall } = require('./index');

const getAllPlayers = async (gameId) => {
  const key = getPlayerKey(gameId);
  const players = await ahgetall(key);
  return players;
};

const addPlayerToGame = async (gameId, playerId, nickname) => {
    const gameCacheKey = getGameKey(gameId);
    const playerCacheKey = getPlayerKey(gameId); 
    const res = await azadd(gameCacheKey, 0, playerId);
    await ahset(playerCacheKey, playerId, nickname);
    return res;
}

const getGameKey = (gameId) => {
    return `game:${gameId}`;
}

const getPlayerKey = (gameId) => {
    return `player:${gameId}`;
}

module.exports = {
    addPlayerToGame,
    getAllPlayers 
}