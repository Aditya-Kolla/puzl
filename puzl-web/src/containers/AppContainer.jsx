import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'

const AppContainer = ({ children }) => (
    <Box align="center" margin="xsmall">
        {children}
    </Box>
)

AppContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppContainer
