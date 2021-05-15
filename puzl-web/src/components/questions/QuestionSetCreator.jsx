import React, { useState } from "react";
import { Box, Button, Heading, List } from "grommet";
import { FormPreviousLink } from "grommet-icons";

import QuestionCreator from "./QuestionCreatorView.jsx";
import { QuestionView } from "./QuestionView.jsx";

import { doesSameQuestionExists } from "./QuestionCreator.js";

const QuestionSetCreator = (props) => {
  const [questionSet, setQuestionSet] = useState([]);
  const [isCreationActive, setCreationActive] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(undefined);
  const [isEditingActive, setEditingActive] = useState(false);

  const goToViewMode = (questionInView) => {
    setCreationActive(false);
    setActiveQuestion(questionInView);
    setEditingActive(false);
  }
  const addQuestion = (newQuestion) => {
    if (doesSameQuestionExists(newQuestion.question, questionSet.map(question => question.question))) {
      alert("The question already exists");
      return;
    }
    let newQuestionSet = [...questionSet];
    newQuestionSet.push(newQuestion);
    setQuestionSet(newQuestionSet);
    goToViewMode();
  };

  const updateQuestion = (oldQuestion, updatedQuestion) => {
    let newQuestionSet = [...questionSet];
    let oldQuestionIndex = newQuestionSet.findIndex(
      (question) => question.question === oldQuestion.question
    );
    let updatedQuestionIndex = newQuestionSet.findIndex(question => question.question === updatedQuestion.question);
    if (updatedQuestionIndex != -1) {
      alert("The question already exists");
      return;
    }
    newQuestionSet[oldQuestionIndex] = updatedQuestion;
    setQuestionSet(newQuestionSet);
    goToViewMode(updatedQuestion);
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
