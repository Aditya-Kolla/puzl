import React from "react";
import { Box } from 'grommet';

const AppContainer = (props) => (
    <Box align="center" margin="xsmall">
        {props.children}
    </Box>
)

export default AppContainer;