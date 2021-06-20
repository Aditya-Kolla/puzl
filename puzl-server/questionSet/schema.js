const mongoose = require('mongoose');
const { Schema } = mongoose;

const optionSchema = new Schema({
  value: String
});

const questionSchema = new Schema({
  text: String,
  options: [optionSchema],
  correctOption: [optionSchema]
});

const questionSetSchema = new Schema({
  name: String,
  questions: [questionSchema]
})

const QuestionSet = mongoose.model('QuestionSet', questionSetSchema);

module.exports = {
  QuestionSet
};