import React, { useState } from "react";
import { Box, Button, Heading, List } from "grommet";
import { FormPreviousLink } from "grommet-icons";

import QuestionCreator from "./QuestionCreatorView.jsx";
import { QuestionView } from "./QuestionView.jsx";

const QuestionSetCreator = (props) => {
  const [questionSet, setQuestionSet] = useState([]);
  const [isCreationActive, setCreationActive] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(undefined);
  const [isEditingActive, setEditingActive] = useState(false);

  const addQuestion = (newQuestion) => {
    let newQuestionSet = [...questionSet];
    newQuestionSet.push(newQuestion);
    setQuestionSet(newQuestionSet);
  };

  const updateQuestion = (oldQuestion, updatedQuestion) => {
    let newQuestionSet = [...questionSet];
    let oldQuestionIndex = newQuestionSet.findIndex(
      (question) => question.question === oldQuestion.question
    );
    newQuestionSet[oldQuestionIndex] = updatedQuestion;
    setQuestionSet(newQuestionSet);
    setActiveQuestion(updatedQuestion);
    setEditingActive(false);
  };

  const goToQuestionSet = () => {
    setCreationActive(false);
    setActiveQuestion(undefined);
    setEditingActive(false);
  };

  const creationPlaceholderProps = {
    question: "Enter your question",
    options: [...Array(4).keys()].map((i) => `Option ${i + 1}`),
    correctOption: "Option 1",
  };

  return (
    <Box>
      {isCreationActive || activeQuestion ? (
        <div>
          <Button onClick={() => goToQuestionSet()}>
            <FormPreviousLink />
          </Button>
          {isCreationActive ? (
            <QuestionCreator
              addQuestion={addQuestion}
              {...creationPlaceholderProps}
            />
          ) : null}
          {activeQuestion ? (
            isEditingActive ? (
              <QuestionCreator
                addQuestion={(updatedQuestion) =>
                  updateQuestion(activeQuestion, updatedQuestion)
                }
                {...activeQuestion}
              />
            ) : (
              <QuestionView
                question={activeQuestion}
                editQuestion={() => setEditingActive(true)}
              />
            )
          ) : null}
        </div>
      ) : (
        <>
          <Heading level="3">The questions so far</Heading>
          <List
            primaryKey="question"
            data={questionSet}
            onClickItem={({ data, index }) => {
              console.log(questionSet[index]);
              setActiveQuestion(questionSet[index]);
            }}
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
