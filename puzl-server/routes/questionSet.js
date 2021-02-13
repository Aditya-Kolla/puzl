const express = require('express');
const router = express.Router();

const QuestionSet = require('../data/QuestionSetSchema');

const convertToModel = function (questionSetScehma) {
    return {
        id: questionSetScehma.id,
        createdBy: questionSetScehma.createdBy,
        questions: questionSetScehma.questions.map(function (question) {
            return {
                id: question.id,
                content: question.content,
                possibleOptions: question.possibleOptions,
                correctOption: question.correctOption
            };
        })
    }
};

router.post("/", (req, res) => {
    let newQuestionSet = new QuestionSet({ ...req.body });
    console.log(newQuestionSet);
    if (!newQuestionSet.$isValid()) {
        res.status(400);
        return res.send();
    }
    newQuestionSet.save((dbError, dbResult) => {
        if (dbError) {
            console.error(dbError);
            res.status(500);
            return res.send('An error occurred.');
        } else {
            res.status(201);
            let convertedModel = convertToModel(dbResult);
            return res.send(convertedModel);
        }
    })
});

router.get("/:id", (req, res) => {
    let id = req.params.id;
    QuestionSet.findById(id, (dbError, dbResult) => {
        if (dbError) {
            res.status(404);
            return res.send(`Question Set with id ${id} was not found.`);
        } else {
            res.status(200);
            let convertedModel = convertToModel(dbResult);
            return res.send(convertedModel);
        }
    });
});

router.get("/:questionSetId/question/:questionId", (req, res) => {
    return res.send('Not implemented yet.')
})

module.exports = router;