const express = require('express');
const router = express.Router();

const controllers = require('../controllers');
const questionSetRoutes = require('../questionSet/route');

router.get('/player/:gameid', controllers.getPlayers);
router.post('/join/:gameid', controllers.joinGame);

router.get('/questionSets', questionSetRoutes.getQuestionSets);
router.get('/questionSets/:id', questionSetRoutes.getQuestionSet);
router.post('/questionSets', questionSetRoutes.createQuestionSet);

module.exports = router;