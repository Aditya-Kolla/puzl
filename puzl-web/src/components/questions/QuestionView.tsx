import React from "react";

import { Box, Text } from "grommet";
import { PuzlQuestion } from "./question";

interface QuestionViewProps {
  question: PuzlQuestion;
}

export const QuestionView = ({ question }: QuestionViewProps) => {
  return (
    <Box>
      <Text>{question.question}</Text>
      {question.options.map((option) => (
        <Box key={option.id}>{option.value}</Box>
      ))}
    </Box>
  );
};
