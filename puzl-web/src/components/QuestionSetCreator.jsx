import React, { useState } from "react";
import { Box, Button, Heading, List } from "grommet";
import { FormPreviousLink } from "grommet-icons";

import QuestionCreator from "./QuestionCreator";

const QuestionSetCreator = (props) => {
  const [questionSet, setQuestionSet] = useState([]);
  const [isCreationActive, setCreationActive] = useState(false);
  const [editableQuestion, setEditableQuestion] = useState({});
  const [editingQuestion, setEditingQuestion] = useState(false);

  const addQuestion = (newQuestion) => {
    let newQuestionSet = [...questionSet];
    newQuestionSet.push(newQuestion);
    setQuestionSet(newQuestionSet);
    setEditingQuestion(false);
    setEditableQuestion({});
  };

  const updateQuestion = (updatedQuestion) => {
    let sameQuestion = questionSet.find(
      (q) => q.question === updatedQuestion.question
    );
    if (!!sameQuestion) {
      let areOptionsSame = sameQuestion.options.every(
        (q, i) => q === updatedQuestion.options[i]
      );
      if (areOptionsSame) {
        alert("The same question already exists!");
        return false;
      }
    }
    let newQuestionSet = [...questionSet];
    let updatedQuestionInSet = newQuestionSet.find(
      (q) => q.question === editableQuestion.question
    );
    updatedQuestionInSet.question = updatedQuestion.question;
    updatedQuestionInSet.options = updatedQuestion.options;
    updatedQuestionInSet.correctOption = updatedQuestion.correctOption;
    setQuestionSet(newQuestionSet);
    setEditingQuestion(false);
    setEditableQuestion({});
    return true;
  };

  const editQuestion = (questionIndex) => {
    setEditableQuestion(questionSet[questionIndex]);
    setEditingQuestion(true);
  };

  const goToQuestionSet = () => {
    setCreationActive(false);
    setEditingQuestion(false);
    setEditableQuestion({});
  };

  return (
    <Box align="center" flex="grow" margin="small" gap="small" fill="vertical">
      {isCreationActive || editingQuestion ? (
        <div>
          <Button onClick={() => goToQuestionSet()}>
            <FormPreviousLink />
          </Button>
          <QuestionCreator
            addQuestion={addQuestion}
            updateQuestion={updateQuestion}
            question={editableQuestion.question}
            options={editableQuestion.options}
            correctOption={editableQuestion.correctOption}
            isEdit={editingQuestion}
          />
        </div>
      ) : (
        <>
          <Heading level="3">The questions so far</Heading>
          <List
            primaryKey="question"
            data={questionSet}
            onClickItem={({ data, index }) => editQuestion(index)}
          />
          <Button
            secondary
            label="Create question"
            margin="large"
            onClick={() => setCreationActive(true)}
          />
        </>
      )}
    </Box>
  );
};

export default QuestionSetCreator;
