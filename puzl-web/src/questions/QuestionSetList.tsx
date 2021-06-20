import React from 'react'

import { Box, Text } from 'grommet'

import { QuestionSet } from '../types/question'

interface QuestionSetListProps {
    questionSets: QuestionSet[]
}

const QuestionSetList = ({ questionSets }: QuestionSetListProps) => (
    <Box pad="medium">
        {questionSets.length === 0 ? (
            <Text>You do not have any question sets!</Text>
        ) : (
            <></>
        )}
        {questionSets.map((questionSet) => (
            <Box
                key={questionSet.id}
                border
                round
                pad="xsmall"
                align="center"
                margin="xsmall"
            >
                <Text>{questionSet.name}</Text>
            </Box>
        ))}
    </Box>
)

export default QuestionSetList
