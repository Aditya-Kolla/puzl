const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

router.post('/join/:gameid', controllers.joinGame);

module.exports = router;