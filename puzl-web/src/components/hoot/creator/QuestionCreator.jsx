import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider';

const QuestionCreator = ({ question, addQuestion, updateQuestion }) => {

    const MIN_OPTIONS = 2;
    const MAX_OPTIONS = 4;

    let [questionContent, setQuestionContent] = useState(question?.content);
    let [nOptions, setNOptions] = useState(question?.options?.length);
    let [defaultNOptions, _] = useState(nOptions === undefined ? MAX_OPTIONS : nOptions);
    let [options, setOptions] = useState(question?.options);

    const setNumberOfOptions = (n) => {
        if (n > MAX_OPTIONS || n < MIN_OPTIONS) return;
        setNOptions(n);
    }

    const updateOptions = (i, v) => {
        let updatedOptions = [...options];
        updatedOptions[i] = v;
        setOptions(updatedOptions);
    }

    const getOptionValue = (i) => {
        if (options?.length > i) {
            return options[i];
        }
        return "Enter an option here"
    }

    const addNewQuestion = () => {
        let question = {
            content: questionContent,
            options: options
        };
        addQuestion(question);
    }

    return (
        <form>
            <TextField label="Question" placeholder="Enter your question here" onChange={(e) => setQuestionContent(e.target.value)} />
            <Typography variant="caption">Number of options</Typography>
            <Slider defaultValue={defaultNOptions} step={1} marks min={MIN_OPTIONS} max={MAX_OPTIONS} onChange={(_, val) => setNumberOfOptions(val)} valueLabelDisplay="auto" />
            {[...Array(nOptions).keys()].map(i => {
                return <TextField
                    key={i}
                    label={`Option ${i + 1}`}
                    value={getOptionValue(i)}
                    onChange={(e) => updateOptions(i, e.target.value)}></TextField>
            })}
        </form>
    )
}

export default QuestionCreator;