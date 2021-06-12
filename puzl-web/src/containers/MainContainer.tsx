import React, { useState } from 'react';
import { Box } from 'grommet';
import { Switch, Route } from 'react-router-dom';
import { SocketContext, socket } from '../context/socket';
import { UserContext} from '../context/UserContext';

import { User } from "../types/user";

import Home from '../pages/Home';
import Game from '../pages/Game';
import { useContext } from 'react';

const MainContainer = () => {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
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