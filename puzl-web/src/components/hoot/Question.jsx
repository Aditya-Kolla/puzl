import React from 'react';

import Typography from '@material-ui/core/Typography';
import { Button, Container, Grid } from '@material-ui/core';


const Question = ({ question, options, setOption }) => {

    let renderQuestion = (question) => <Typography variant="h3">{question}</Typography>

    let renderOptions = (options) => {
        let actionableOptions = Object.entries(options).map(([key, value]) =>
            <Grid item key={key}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    style={{ width: '200px' }}
                    onClick={() => setOption(key)}
                >
                    {value}
                </Button >
            </Grid>
        );

        return (
            <Grid direction="column" spacing={2} container>
                {actionableOptions}
            </Grid>
        )
    }

    return (
        <Container>
            {renderQuestion(question)}
            {renderOptions(options)}
        </Container>
    )
}

export default Question;