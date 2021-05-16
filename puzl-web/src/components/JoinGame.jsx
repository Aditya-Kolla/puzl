import React, { useState, useContext } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Box, Form, FormField, TextInput, Button } from 'grommet';

import { UserContext } from '../context/user';

const JoinGame = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const history = useHistory();

  const defaultFormValues = { 'nickname': '', 'gameid': '' };
  const [formValue, setFormValue] = useState(defaultFormValues);

  const joinGame = async (value) => {
    const { gameid, nickname } = value || {};
    // Query server here and upon succesful response navigate to game lobby otherwise display error
    if (gameid && nickname) {
      const payload = { nickname: nickname };
      try {
        // Will move out URLs to config 
        const response = await axios.post(`http://localhost:8080/api/join/${gameid}`, payload);
        const user = {
          nickname: nickname,
          gameid: gameid,
          userid: response.data.id
        };
        setUserContext(user);
        history.push(`/game/${gameid}`);
      } catch (error) {
        console.log('error', error);
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