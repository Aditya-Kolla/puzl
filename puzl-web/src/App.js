import React from 'react';
import { Heading, Grommet } from 'grommet';

import QuestionSetCreator from "./components/QuestionSetCreator";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
    }
  }
}
function App() {
  return (
    <Grommet theme={theme}>
      <Heading margin="small" textAlign="center">
        Puzl
      </Heading>
      <QuestionSetCreator />
    </Grommet>
  );
}

export default App;
