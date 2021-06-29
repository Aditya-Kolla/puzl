import React, { useState } from 'react'

import axios from 'axios'

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

    const saveQuestionSet = async () => {
        let res: any
        try {
            res = await axios.post(`http://localhost:8080/api/questionSets`, {
                name,
                questions,
            })
        } catch (error) {
            console.error(error)
        }
        console.log(res)
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
                <>
                    <Button
                        onClick={() => setQuestionCreationActive(true)}
                        margin="medium"
                        secondary
                        label="Add a question"
                    />
                    <Button
                        onClick={() => saveQuestionSet()}
                        margin="medium"
                        primary
                        label="Save"
                    />
                </>
            )}
        </Box>
    )
}

export default QuestionSetCreator
