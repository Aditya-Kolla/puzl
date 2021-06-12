import React from 'react';
import { Box, Tabs, Tab } from 'grommet';

import JoinGame from '../components/JoinGame';

const Home = () => (
  <Box fill pad="medium" align="center">
    <Tabs>
      <Tab title="Join">
        <JoinGame />
      </Tab>
      <Tab title="Create" />
    </Tabs>
  </Box>
);

export default Home;