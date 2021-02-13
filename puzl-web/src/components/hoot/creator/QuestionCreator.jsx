import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider';

const QuestionCreator = ({ question, addQuestion }) => {

    const MIN_OPTIONS = 2;
    const MAX_OPTIONS = 4;

    let [questionContent, setQuestionContent] = useState(question?.content === undefined ? '' : question.content);
    let [nOptions, setNOptions] = useState(question?.options?.length);
    let [defaultNOptions, setDefaultNOptions] = useState(nOptions === undefined ? (MAX_OPTIONS + MIN_OPTIONS) / 2 : nOptions);
    let [options, setOptions] = useState(question?.options === undefined ? [] : question.options);
    let [correctOption, setCorrectOption] = useState(MIN_OPTIONS);

    const clear = () => {
        setQuestionContent('');
        setNOptions(question?.options?.length);
        setOptions([]);
        setDefaultNOptions(nOptions === undefined ? (MAX_OPTIONS + MIN_OPTIONS) / 2 : nOptions)
    }

    const setNumberOfOptions = (n) => {
        if (n > MAX_OPTIONS || n < MIN_OPTIONS) return;
        setNOptions(n);
    }

    const updateOptions = (i, v) => {
        let updatedOptions = [...options];
        updatedOptions[i] = v;
        setOptions(updatedOptions);
    }

    const addNewQuestion = () => {
        let question = {
            content: questionContent,
            possibleOptions: options,
            correctOption: options[correctOption - 1]
        };
        addQuestion(question);
        clear();
    }

    const getNOptions = () => {
        if (nOptions === undefined) return defaultNOptions;
        return nOptions;
    }

    const renderOptions = () => {
        let optionInputs = [];
        for (let i = 0; i < getNOptions(); ++i) {
            optionInputs.push(
                <TextField
                    key={i}
                    label={`Option ${i + 1}`}
                    value={options[i] === undefined ? 'Enter option' : options[i]}
                    onChange={(ev) => updateOptions(i, ev.target.value)}
                >
                </TextField>
            );
        }
        return optionInputs;
    }

    return (
        <form>
            <TextField label="Question" value={questionContent} onChange={(e) => setQuestionContent(e.target.value)} />
            <Typography variant="caption">Number of options</Typography>
            <Slider defaultValue={defaultNOptions} step={1} marks min={MIN_OPTIONS} max={MAX_OPTIONS} onChange={(_, val) => setNumberOfOptions(val)} valueLabelDisplay="auto" />
            <Typography variant="caption">The correct option</Typography>
            <Slider defaultValue={defaultNOptions} step={1} marks min={1} max={getNOptions()} onChange={(_, val) => setCorrectOption(val)} valueLabelDisplay="auto" />
            {renderOptions()}
            <Button onClick={addNewQuestion}>Add question</Button>
        </form>
    )
}

export default QuestionCreator;