import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Heading, List } from 'grommet'
import { SocketContext } from '../context/socket'
import { useUserContext } from '../context/UserContext'

const Game = () => {
    const socket = useContext(SocketContext)
    const { user } = useUserContext()

    // Bootstrap existing players through APIS
    const [playerList, setPlayerList] = useState<any>([])

    const getAllPlayers = async (gameId: string) => {
        if (gameId) {
            try {
                // Will move out URLs to config
                const response = await axios.get(
                    `http://localhost:8080/api/player/${gameId}`
                )
                const playerNames = response && response.data.players
                setPlayerList(playerNames)
            } catch (error) {
                console.log('error', error)
                alert('Could not get all players')
            }
        }
    }

    useEffect(() => {
        if (!user) {
            return undefined
        }
        getAllPlayers(user.gameId)
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
