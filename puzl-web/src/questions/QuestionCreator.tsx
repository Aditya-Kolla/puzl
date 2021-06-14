import React, { useState } from 'react'

import { ulid } from 'ulid'

import { Box, Button, RadioButton, TextInput } from 'grommet'
import { AddQuestionProps, Option } from '../types/question'

const QuestionCreator = ({ addQuestion }: AddQuestionProps) => {
    function defaultOption(): Option {
        return {
            id: ulid(),
            value: 'Enter an option',
        }
    }

    const [text, setText] = useState<string>('')
    const [options, setOptions] = useState<Option[]>([
        defaultOption(),
        defaultOption(),
        defaultOption(),
        defaultOption(),
    ])
    const [correctOptionId, setCorrectOptionId] = useState<string>('')

    const updateOption = (id: string, value: string) => {
        const updatedOptions = [...options]
        const updatedOptionIndex = options.findIndex(
            (option) => option.id === id
        )
        if (updatedOptionIndex === -1) return
        updatedOptions[updatedOptionIndex].value = value
        setOptions(updatedOptions)
    }

    const dispatchAddQuestion = () => {
        const correctOption = options.find(
            (option) => option.id === correctOptionId
        )
        if (!correctOption) return
        addQuestion({
            id: ulid(),
            text,
            options,
            correctOption,
        })
    }

    const canAddQuestion = () => {
        if (text.trim() === '') return false
        if (correctOptionId === '') return false
        return true
    }

    return (
        <Box margin={{ vertical: 'small' }}>
            <TextInput
                value={text}
                placeholder="Question title"
                onChange={(ev) => setText(ev.target.value)}
            />
            <Box gap="small" margin={{ vertical: 'small' }}>
                {options.map((option) => (
                    <Box gap="xxsmall" direction="row" fill="horizontal">
                        <RadioButton
                            name={option.value}
                            checked={option.id === correctOptionId}
                            onChange={() => setCorrectOptionId(option.id)}
                        />
                        <TextInput
                            placeholder={option.value}
                            onChange={(ev) =>
                                updateOption(option.id, ev.target.value)
                            }
                        />
                    </Box>
                ))}
            </Box>
            <Button
                primary
                onClick={dispatchAddQuestion}
                label="Add"
                disabled={!canAddQuestion()}
                fill="horizontal"
            />
        </Box>
    )
}

export default QuestionCreator
