import React, { useState } from "react";
import { Box, Button, List } from "grommet";
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

  const editQuestion = (questionIndex) => {
    setEditableQuestion(questionSet[questionIndex]);
    setEditingQuestion(true);
  };

  const goToQuestionSet = () => {
    setCreationActive(false);
    setEditingQuestion(false);
    setEditableQuestion({});
  }

  return (
    <Box align="center" flex="grow" margin="small" gap="small" fill="vertical">
      {isCreationActive || editingQuestion ? (
        <div>
          <Button
            secondary
            label="Question set"
            onClick={() => goToQuestionSet()}
          />
          <QuestionCreator
            addQuestion={addQuestion}
            question={editableQuestion.question}
            options={editableQuestion.options}
            correctOption={editableQuestion.correctOption}
            isUpdate={editingQuestion}
          />
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </Box>
  );
};

export default QuestionSetCreator;
