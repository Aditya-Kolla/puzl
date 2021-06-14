const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

router.get('/player/:gameid', controllers.getPlayers);
router.post('/join/:gameid', controllers.joinGame);

module.exports = router;