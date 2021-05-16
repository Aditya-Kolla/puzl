import React from 'react'

import { Box, Text } from 'grommet'
import { PuzlQuestion } from './question'

interface QuestionViewProps {
    question: PuzlQuestion
}

const QuestionView = ({ question }: QuestionViewProps) => (
    <Box>
        <Text>{question.question}</Text>
        {question.options.map((option) => (
            <Box key={option.id}>{option.value}</Box>
        ))}
    </Box>
)

export default QuestionView