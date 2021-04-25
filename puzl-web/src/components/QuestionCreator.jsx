import React, { useState } from "react";
import { Box, Button, Select, TextArea, TextInput } from "grommet";

const QuestionCreator = (props) => {
  const defaultQuestion = "";
  const defaultOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ];
  const [question, setQuestion] = useState(props.question || defaultQuestion);
  const [options, setOptions] = useState(props.options || defaultOptions);
  const [correctOption, setCorrectOption] = useState(props.correctOption || options[0]);

  const updateOption = (optionIndex, newValue) => {
    let oldOptions = [...options];
    oldOptions[optionIndex] = newValue;
    setOptions(oldOptions);
  };

  const checkCanAddQuestion = () => {
    if (question === "") return false;
    let emptyOptions = options.filter((option) => option === "");
    if (emptyOptions.length > 0) return false;
    if (!options.includes(correctOption)) return false;
    return true;
  };

  const addNewQuestion = () => {
    if (checkCanAddQuestion()) {
      props.addQuestion({
        question: question,
        options: options,
        correctOption: correctOption
      });
      setQuestion(defaultQuestion);
      setOptions(defaultOptions);
    }
  }

  return (
    <Box align="center" flex="grow" margin="small" gap="small" fill="vertical">
      <TextArea
        placeholder="Enter your question here"
        value={question}
        size="large"
        onChange={(event) => setQuestion(event.target.value)}
      />
      <br />
      {options.map((option, i) => (
        <TextInput
          key={i}
          placeholder={options[i]}
          size="medium"
          onChange={(event) => updateOption(i, event.target.value)}
        />
      ))}
      <br />
      <Select
        options={options}
        value={correctOption}
        onChange={({ option }) => setCorrectOption(option)}
        placeholder="Select the correct option"
      />
      <Button primary label="Add question" disabled={!checkCanAddQuestion()} onClick={() => addNewQuestion()}/>
    </Box>
  );
};

export default QuestionCreator;
