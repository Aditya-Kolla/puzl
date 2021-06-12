const crypto = require("crypto");

const joinGame = (req, res) => {
    const gameId = req.params.gameid; 
    const { nickname } = req.body;
    if (!!!nickname) {
        res.status(500).json({'error': 'Missing required argument: nickname'});
        return;
    }
    // Check if gameId is valid
    // Add nickname to DB along with a generated socket id and return it to frontend
    const id = crypto.randomBytes(11).toString('hex');
    res.status(200).json({'id': id});
}

module.exports = {
    joinGame
}