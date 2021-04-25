import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Box, Form, FormField, TextInput, Button } from 'grommet';

const JoinGame = () => {
  const history = useHistory();

  const defaultFormValues = { 'nickname': '', 'gameid': '' };
  const [formValue, setFormValue] = useState(defaultFormValues);

  const joinGame = (value) => {
    console.log(value);
    const { gameid } = value || {};
    // Query server here and upon succesful response navigate to game lobby otherwise display error
    if (gameid) {
      history.push(`/game/${gameid}`)
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