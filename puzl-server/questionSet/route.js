const { QuestionSet } = require('./schema');

const getQuestionSets = (req, res) => {
  QuestionSet.find((err, data) => {
    if (err) {
      console.error(err);
      return res.status(500);
    } else {
      return res.status(200).json(data);
    }
  })
};

const getQuestionSet = (req, res) => {
  let id = req.params.id;
  QuestionSet.findById(id, (err, doc) => {
    if (err) {
      console.error(err);
      return res.status(500);
    } else {
      return res.status(200).json(doc);
    }
  })
};

const createQuestionSet = (req, res) => {
  let payload = req.body;
  let newQuestion = new QuestionSet({...payload});
  newQuestion.save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Saved new question!');
    }
  })
  console.log(payload);
  res.status(200).json(payload);
};

module.exports = {
  getQuestionSets,
  getQuestionSet,
  createQuestionSet
};