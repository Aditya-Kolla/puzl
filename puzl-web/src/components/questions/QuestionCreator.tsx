import React, { useState } from 'react'
import { Box, Button, RadioButton, TextArea, TextInput } from 'grommet'
import { PuzlQuestion, Option } from './question'

interface QuestionCreatorProps {
    addQuestion: (newQuestion: PuzlQuestion) => PuzlQuestion | undefined
}

export const QuestionCreator = ({ addQuestion }: QuestionCreatorProps) => {
    const [questionValue, setQuestionValue] = useState<string>('')
    const [options, setOptions] = useState<Option[]>(
        [...Array(4).keys()].map((i) => ({
            id: `${i}`,
            value: `Option ${i + 1}`,
        }))
    )
    const [correctOption, setCorrectOption] = useState<Option>(options[0])

    const updateOption = (index: number, updatedOptionValue: string) => {
        const oldOptions = [...options]
        oldOptions[index].value = updatedOptionValue
        setOptions(oldOptions)
    }

    const canAddQuestion = () => {
        if (questionValue.trim() === '') return false
        if (options.find((option) => option.id === correctOption.id))
            return true
        return false
    }

    const addNewQuestion = () => {
        const questionToAdd: PuzlQuestion = {
            question: questionValue,
            options,
            correctOption,
        }
        if (addQuestion(questionToAdd)) {
            alert('Question added successfully.')
        } else {
            alert('Cannot add the question.')
        }
    }

    return (
        <Box>
            <TextArea
                placeholder="Enter your question here"
                size="large"
                onChange={(event) => setQuestionValue(event.target.value)}
            />
            {options.map((option, index) => (
                <Box direction="row" fill="horizontal" flex="grow" gap="small">
                    <Box gap="small" direction="row" fill="horizontal">
                        <RadioButton
                            name={option.value}
                            checked={option.id === correctOption.id}
                            onChange={(_) => setCorrectOption(option)}
                        />
                        <TextInput
                            key={index}
                            placeholder={options[index].value}
                            size="medium"
                            onChange={(event) =>
                                updateOption(index, event.target.value)
                            }
                        />
                    </Box>
                </Box>
            ))}
            <Button
                primary
                label="Add question"
                disabled={!canAddQuestion()}
                onClick={addNewQuestion}
            />
        </Box>
    )
}

export default QuestionCreator
