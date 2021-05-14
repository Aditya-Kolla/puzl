import React, { useState } from "react";

import { Box, Button, RadioButton, TextArea, TextInput } from "grommet";

import {
  doesCorrectOptionExists,
  isOptionValid,
  isQuestionValid,
} from "./QuestionCreator";

const QuestionCreator = (props) => {
  const [question, setQuestion] = useState(props.question);
  const [options, setOptions] = useState(props.options);
  const [correctOption, setCorrectOption] = useState(props.correctOption);

  const updateOption = (optionIndex, newValue) => {
    let oldOptions = [...options];
    oldOptions[optionIndex] = newValue;
    setOptions(oldOptions);
  };

  const checkCanAddQuestion = () =>
    isQuestionValid(question) &&
    options.reduce(
      (optionIsValid, option) => optionIsValid && isOptionValid(option)
    ) &&
    doesCorrectOptionExists(correctOption, options);

  const addNewQuestion = () => {
    if (checkCanAddQuestion()) {
      props.addQuestion({
        question: question,
        options: options,
        correctOption: correctOption,
      });
    }
  };

  return (
    <Box align="center" flex="grow" margin="small" gap="small" fill="vertical">
      <TextArea
        placeholder={question}
        size="large"
        onChange={(event) => setQuestion(event.target.value)}
      />
      <br />
      {options.map((option, index) => (
        <Box direction="row" fill="horizontal" flex="grow" gap="small">
          <Box gap="small" direction="row" fill="horizontal">
            <RadioButton
              name={option}
              checked={option === correctOption}
              onChange={(_) => setCorrectOption(option)}
            />
            <TextInput
              key={index}
              placeholder={options[index]}
              size="medium"
              onChange={(event) => updateOption(index, event.target.value)}
            />
          </Box>
        </Box>
      ))}
      <Button
        primary
        label="Add question"
        disabled={!checkCanAddQuestion()}
        onClick={addNewQuestion}
      />
    </Box>
  );
};

export default QuestionCreator;
