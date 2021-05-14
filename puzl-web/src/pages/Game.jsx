import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../context/socket';
import { UserContext } from '../context/user';
import { Header, Box } from 'grommet';

const Game = () => {
  const socket = useContext(SocketContext);
  const [userContext, setUserContext] = useContext(UserContext);

  useEffect(() => {
    return () => {
      // before the component is destroyed
      socket.disconnect();
    }
  }, []);

  return (
    <Box fill pad="medium" align="center">
      <Header>
        Game Lobby
      </Header>
      <Header>
        {`Wait for others to join, ${userContext.nickname}!`}
      </Header>
    </Box>
  );
};

export default Game;