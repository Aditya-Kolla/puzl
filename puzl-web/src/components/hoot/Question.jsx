import React from 'react';

import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const Question = ({ question, options, setOption }) => {

    let renderQuestion = (question) => <Typography variant="h3">{question}</Typography>

    let renderOptions = (options) => {
        let actionableOptions = options.map((option, i) =>
            <FormControlLabel value={option} control={<Radio />} label={option} key={i} onClick={() => setOption(i)}/>
        );
        return <FormControl component="fieldset">
            <FormLabel component="legend">Select your answer!</FormLabel>
            <RadioGroup aria-label="option" name="option-radio">
                {actionableOptions}
            </RadioGroup>
        </FormControl>
    }

    return (
        <div>
            {renderQuestion(question)}
            {renderOptions(options)}
        </div>
    )
}

export default Question;