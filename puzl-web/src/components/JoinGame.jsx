import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Form, FormField, TextInput, Button } from 'grommet';
import axios from 'axios'

const JoinGame = () => {
  const history = useHistory();

  const defaultFormValues = { 'nickname': '', 'gameid': '' };
  const [formValue, setFormValue] = useState(defaultFormValues);

  const joinGame = async (value) => {
    console.log(value);
    const { gameid, nickname } = value || {};
    // Query server here and upon succesful response navigate to game lobby otherwise display error
    if (gameid && nickname) {
      const payload = { nickname: nickname }
      try {
        // Will move out URLs to config 
        // Need usercontext to store userdata 
        const response = axios.post(`http://localhost:8080/api/join/${gameid}`, payload)
        console.log(response.data);
        history.push(`/game/${gameid}`)
      } catch (error) {
        console.log('error', error)
        alert('Could not join game. Please try again');
      }
      
    }
  }

  return (
    <Box pad="medium">
      <Form
        value={formValue}
        validate="blur"
        onChange={newFormValue => setFormValue(newFormValue)}
        onSubmit={({ value }) => { joinGame(value) }}
        onValidate={(validationResults) => { console.log(validationResults) }}
      >
        <FormField name="nickname" htmlFor="nickname" label="Nickname" required>
          <TextInput id="nickname" name="nickname" />
        </FormField>
        <FormField name="gameid" htmlFor="gameid" label="Game ID" required>
          <TextInput id="gameid" name="gameid" />
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

export default JoinGame;