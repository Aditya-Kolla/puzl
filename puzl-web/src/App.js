import React from 'react';
import { Heading, Grommet } from 'grommet';

import AppContainer from './components/AppContainer';
import MainContainer from './components/MainContainer';

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px"
    }
  },
  formField: {
    label: {
      requiredIndicator: true,
    }
  }
}
function App() {
  return (
    <Grommet theme={theme}>
      <AppContainer>
        <Heading margin="small" textAlign="center">
          Puzl
        </Heading>
        <MainContainer />
      </AppContainer>
    </Grommet>
  );
}

export default App;
