import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/socket';
import { UserContext } from '../context/user';
import { Box, Heading, List } from 'grommet';

const Game = () => {
  const socket = useContext(SocketContext);
  const [userContext, setUserContext] = useContext(UserContext);
  // Bootstrap existing players through APIS
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    const playerJoinData = { 
      playerId: userContext.userid,
      gameId: userContext.gameid,
      nickname: userContext.nickname
    };
    socket.emit('player-join', playerJoinData);
    socket.on('player-add', (playerName) => {
      console.log('New player joined ' + playerName);
      setPlayerList(prevPlayerList => ([
        ...prevPlayerList,
        playerName
      ]));
    });
    return () => {
      // before the component is destroyed
      socket.off('player-add');
    }
  }, []);

  return (
    <Box fill pad="medium" align="center">
      <Heading level="2">Game Lobby</Heading>
      <Heading level="3">
        Waiting for host to start the game!
      </Heading>
      <Heading level='4'>
        Players in the lobby
      </Heading>
      <List
        data={playerList}
      />
    </Box>
  );
};

export default Game;