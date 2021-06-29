import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Box, Form, FormField, TextInput, Button } from 'grommet'

import { useUserContext } from '../context/UserContext'
import { UserJoinRequest } from '../types/user'

const JoinGame = () => {
    const { setUser } = useUserContext()
    const history = useHistory()

    const defaultFormValues: UserJoinRequest = { nickname: '', gameId: '' }
    const [formValue, setFormValue] = useState(defaultFormValues)

    const joinGame = async (value: UserJoinRequest) => {
        const { gameId, nickname } = value || {}
        // Query server here and upon succesful response navigate to game lobby otherwise display error
        if (gameId && nickname) {
            const payload = { nickname }
            try {
                // Will move out URLs to config
                const response = await axios.post(
                    `http://localhost:8080/api/join/${gameId}`,
                    payload
                )
                const user = {
                    nickname,
                    gameId,
                    userId: response.data.id,
                }
                setUser(user)
                history.push(`/game/${gameId}`)
            } catch (error) {
                console.log('error', error)
                alert('Could not join game. Please try again')
            }
        }
    }

    return (
        <Box pad="medium">
            <Form
                value={formValue}
                validate="blur"
                onChange={(newFormValue) => setFormValue(newFormValue)}
                onSubmit={({ value }) => {
                    joinGame(value)
                }}
                onValidate={(validationResults) => {
                    console.log(validationResults)
                }}
            >
                <FormField
                    name="nickname"
                    htmlFor="nickname"
                    label="Nickname"
                    required
                >
                    <TextInput id="nickname" name="nickname" />
                </FormField>
                <FormField
                    name="gameId"
                    htmlFor="gameId"
                    label="Game ID"
                    required
                >
                    <TextInput id="gameId" name="gameId" />
                </FormField>

                <Button
                    type="submit"
                    label="Join"
                    primary
                    margin={{ top: 'medium' }}
                />
            </Form>
        </Box>
    )
}

export default JoinGame
