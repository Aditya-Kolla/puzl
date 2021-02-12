import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Grid from '@material-ui/core/Grid';

import Question from './Question';

const SOCKET_ENDPOINT = "localhost:8080";

const QuestionScreen = () => {

    let [questionData, setQuestionData] = useState({
        question: "1 + 1 = ?",
        options: [0, 1, 3, 4]
    })

    let [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const socket = socketIOClient(SOCKET_ENDPOINT);
        socket.on("TestQuestion", data => {
            setQuestionData(data);
        });
    }, [])
    let setOption = (option) => {
        console.log(`User selected ${option}.`);
        setSelectedOption(option);
    }
    return (
        <div>
            <Grid container>
                <Question question={questionData.question} options={questionData.options} setOption={setOption}/>
            </Grid>
        </div>
    )
}

export default QuestionScreen;