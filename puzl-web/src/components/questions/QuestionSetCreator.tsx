import React, { useState } from "react";
import { Box, Button, Heading, List } from "grommet";
import { FormPreviousLink } from "grommet-icons";

import { ulid } from "ulid";
import QuestionCreator from "./QuestionCreator";
import { PuzlQuestion } from "./question";

const QuestionSetCreator = () => {
  const [questionSet, setQuestionSet] = useState<PuzlQuestion[]>([]);
  const [isCreationActive, setCreationActive] = useState(false);
  const [activeQuestion, setActiveQuestion] =
    useState<PuzlQuestion | undefined>();

  const addQuestion = (newQuestion: PuzlQuestion) => {
    let newQuestionSet = [...questionSet];
    if (
      newQuestionSet.find(
        (question) => question.question === newQuestion.question
      )
    )
      return;
    newQuestion.options = newQuestion.options.map((option) => {
      return {
        id: ulid(),
        value: option.value,
      };
    });
    newQuestionSet.push(newQuestion);
    setQuestionSet(newQuestionSet);
    return newQuestion;
  };

  const goToQuestionSet = () => {
    setCreationActive(false);
  };

  return (
    <Box align="center" flex="grow" margin="small" gap="small" fill="vertical">
      {isCreationActive ? (
        <div>
          <Button onClick={() => goToQuestionSet()}>
            <FormPreviousLink />
          </Button>
          <QuestionCreator addQuestion={addQuestion} />
        </div>
      ) : (
        <>
          <Heading level="3">The questions so far</Heading>
          <List
            primaryKey="question"
            data={questionSet}
            onClickItem={(item: any) => {
              setActiveQuestion(item);
              console.log(item);
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
