import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { Grid, Typography } from '@material-ui/core';

import Question from './Question';

const SOCKET_ENDPOINT = "localhost:8080";
const socket = socketIOClient(SOCKET_ENDPOINT)

const QuestionScreen = () => {
    let [questionData, setQuestionData] = useState({
        number: -1,
        question: "1 + 1 = ?",
        options: {
            1: 0,
            2: 1,
            3: 2,
            4: 5,
        },
    })
    let [result, setResult] = useState("")

    let [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        socket.on("TestQuestion", data => {
            setQuestionData(data);
        });

        socket.on("Result", data => {
            console.log(data)
            setResult(data)
        })
    }, [])

    let setOption = (option) => {
        console.log(`User selected ${option}.`);
        const response = {
            number: questionData.number,
            answer: option
        }
        socket.emit('QuestionResponse', response)
        setSelectedOption(option);
    }
    return (
        <div>
            <Grid direction="column" container>
                <Grid align='center' item>
                    <Question question={questionData.question} options={questionData.options} setOption={setOption} />
                </Grid>
                <Grid align='center' item>
                    <Typography variant="h4" component="h4">
                        {result}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default QuestionScreen;