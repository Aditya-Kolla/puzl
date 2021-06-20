import React from 'react'
import { Box, Tabs, Tab } from 'grommet'

import JoinGame from '../components/JoinGame'
import QuestionSetView from '../questions/QuestionSetView'

const Home = () => (
    <Box fill pad="medium" align="center">
        <Tabs>
            <Tab title="Join">
                <JoinGame />
            </Tab>
            <Tab title="Create">
                <QuestionSetView />
            </Tab>
        </Tabs>
    </Box>
)

export default Home
