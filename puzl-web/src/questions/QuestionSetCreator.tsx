import React, { useState } from 'react'

import { Box, Button, Text, TextInput } from 'grommet'
import { Question } from '../types/question'
import QuestionCreator from './QuestionCreator'

const QuestionSetCreator = () => {
    const [name, setName] = useState<string>('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [isQuestionCreationActive, setQuestionCreationActive] =
        useState(false)

    const addQuestion = (question: Question) => {
        console.log(question)
        setQuestions([...questions, question])
        setQuestionCreationActive(false)
    }
    return (
        <Box pad="medium">
            {isQuestionCreationActive ? (
                <Button
                    onClick={() => setQuestionCreationActive(false)}
                    secondary
                    label="Go back"
                />
            ) : (
                <>
                    <TextInput
                        value={name}
                        placeholder="Enter the name of the quiz"
                        onChange={(ev) => setName(ev.target.value)}
                    />
                    <Box margin={{ vertical: 'xsmall' }} gap="small">
                        {questions.map((question) => (
                            <Box
                                key={question.id}
                                border
                                round
                                pad="xsmall"
                                align="center"
                            >
                                <Text>{question.text}</Text>
                            </Box>
                        ))}
                    </Box>
                </>
            )}
            {isQuestionCreationActive ? (
                <QuestionCreator
                    addQuestion={(question) => {
                        addQuestion(question)
                        return true
                    }}
                />
            ) : (
                <Button
                    onClick={() => setQuestionCreationActive(true)}
                    margin="medium"
                    secondary
                    label="Add a question"
                />
            )}
        </Box>
    )
}

export default QuestionSetCreator
