import React, { useContext, useCallback, useState, useEffect } from 'react';
import { SocketContext } from '../context/socket';
import { Header, Box } from 'grommet';

const Game = () => {
  const socket = useContext(SocketContext);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    console.log('Mounted');
    return () => {
      // before the component is destroyed
      console.log('Component will unmount');
      socket.disconnect();
    }
  }, [])

  return (
    <Box fill pad="medium" align="center">
      <Header>
        Game Lobby
    </Header>
    </Box>
  );
};

export default Game;