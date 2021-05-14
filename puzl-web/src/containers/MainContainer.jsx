import React, { useState } from 'react';
import { Box } from 'grommet';
import { Switch, Route } from 'react-router-dom';
import { SocketContext, socket } from '../context/socket';
import { UserContext, user } from '../context/user';

import Home from '../pages/Home';
import Game from '../pages/Game';

const MainContainer = () => {
  const [userContext, setUserContext] = useState(user);

  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
      <SocketContext.Provider value={socket}>
        <Box fill>
          <Switch>
            <Route exact path="/" component={Home} />
            {/* Will use protected route here when auth is handled. Player should be able to join game session only after auth */}
            <Route path="/game/:id" component={Game} />
          </Switch>
        </Box>
      </SocketContext.Provider>
    </UserContext.Provider>
  );
};

export default MainContainer;