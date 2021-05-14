import React from "react";

import { Box, Button, Heading, Text } from "grommet";

export const QuestionView = ({ question, editQuestion }) => (
  <Box>
    <Heading level="3">{question.question}</Heading>
    <Box direction="column">
      {question.options.map((option) => (
        <Box
          border={option === question.correctOption ? { color: "brand" } : null}
        >
          <Text>{option}</Text>
        </Box>
      ))}
    </Box>
    <Button onClick={() => editQuestion(question)}>Edit</Button>
  </Box>
);
