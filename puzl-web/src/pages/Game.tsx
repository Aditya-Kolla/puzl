import React, { useContext, useEffect, useState } from 'react'
import { Box, Heading, List } from 'grommet'
import { SocketContext } from '../context/socket'
import { useUserContext } from '../context/UserContext'

const Game = () => {
    const socket = useContext(SocketContext)
    const { user } = useUserContext()

    // Bootstrap existing players through APIS
    const [playerList, setPlayerList] = useState<any>([])

    useEffect(() => {
        if (!user) {
            return undefined
        }
        const playerJoinData = {
            playerId: user.userId,
            gameId: user.gameId,
            nickname: user.nickname,
        }
        socket.emit('player-join', playerJoinData)
        socket.on('player-add', (playerName: any) => {
            setPlayerList((prevPlayerList: any) => [
                ...prevPlayerList,
                playerName,
            ])
        })
        return () => {
            // before the component is destroyed
            socket.off('player-add')
        }
    }, [])

    return (
        <Box fill pad="medium" align="center">
            <Heading level="2">Game Lobby</Heading>
            <Heading level="3">Waiting for host to start the game!</Heading>
            <Heading level="4">Players in the lobby</Heading>
            <List data={playerList} />
        </Box>
    )
}

export default Game
