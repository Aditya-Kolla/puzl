const crypto = require("crypto");
const { getAllPlayers } = require('../cache/game');

const joinGame = (req, res) => {
    const gameId = req.params.gameid; 
    const { nickname } = req.body;
    if (!!!nickname) {
        res.status(400).json({'error': 'Missing required argument: nickname'});
        return;
    }
    // Check if gameId is valid
    // Add nickname to DB along with a generated socket id and return it to frontend
    const id = crypto.randomBytes(11).toString('hex');
    res.status(200).json({'id': id});
}

const getPlayers = async (req, res) => {
    const gameId = req.params.gameid;
    if (!gameId) {
        res.status(400).json({'error': 'Missing required argument: gameId'});
        return;
    }
    const players = await getAllPlayers(gameId);
    const playerNames = Object.values(players);
    res.status(200).json({
        players: playerNames,
        count: playerNames.length
    });
}

module.exports = {
    joinGame,
    getPlayers
}