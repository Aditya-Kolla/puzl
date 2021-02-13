const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSetSchema = new Schema({
    createdBy: {
        type: String,
        required: true
    },
    questions: [{
        content: {
            type: String,
            required: true
        },
        possibleOptions: [{
            type: String,
            required: true
        }],
        correctOption: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('QuestionSet', QuestionSetSchema);