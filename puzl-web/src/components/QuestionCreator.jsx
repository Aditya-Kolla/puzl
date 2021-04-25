import React, { useState } from "react";
import { Box, Button, RadioButton, TextArea, TextInput } from "grommet";

const QuestionCreator = (props) => {
  const defaultQuestion = "";
  const defaultOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const [question, setQuestion] = useState(props.question || defaultQuestion);
  const [options, setOptions] = useState(props.options || defaultOptions);
  const [correctOption, setCorrectOption] = useState(
    props.correctOption || options[0]
  );
  const [isEdit, _] = useState(props.isEdit || false);

  const updateOption = (optionIndex, newValue) => {
    let oldOptions = [...options];
    oldOptions[optionIndex] = newValue;
    setOptions(oldOptions);
  };

  const checkCanAddQuestion = () => {
    if (question === "") return false;
    let emptyOptions = options.filter((option) => option.trim() === "");
    if (emptyOptions.length > 0) return false;
    if (!options.includes(correctOption)) return false;
    return true;
  };

  const addNewQuestion = () => {
    if (checkCanAddQuestion()) {
      props.addQuestion({
        question: question,
        options: options,
        correctOption: correctOption,
      });
      setQuestion(defaultQuestion);
      setOptions(defaultOptions);
    }
  };

  const updateExistingQuestion = () => {
    if (!checkCanAddQuestion()) return;
    if (
      props.updateQuestion({
        question: question,
        options: options,
        correctOption: correctOption,
      })
    ) {
      alert("Question updated!");
    }
  };

  return (
    <Box align="center" flex="grow" margin="small" gap="small" fill="vertical">
      <TextArea
        placeholder="Enter your question here"
        value={question}
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
        label={isEdit ? "Update question" : "Add question"}
        disabled={!checkCanAddQuestion()}
        onClick={() => (!isEdit ? addNewQuestion() : updateExistingQuestion())}
      />
    </Box>
  );
};

export default QuestionCreator;
