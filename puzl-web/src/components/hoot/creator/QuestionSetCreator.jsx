import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';

import QuestionCreator from './QuestionCreator';
import CreatedQuestion from './CreatedQuestion';
import { Button } from '@material-ui/core';

const QuestionSetCreator = () => {

    let [questions, setQuestions] = useState([]);

    let addQuestion = (question) => {
        let updatedQuestions = [...questions, question];
        setQuestions(updatedQuestions);
    }

    let updateQuestion = (i, question) => {
        let updatedQuestions = questions.map((q, qIdx) => {
            if (i == qIdx) return question;
            return q
        });
        setQuestions(updatedQuestions);
    }

    const createQuestionSet = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log(questions)
        var raw = JSON.stringify({
            createdBy: "me",
            questions: questions
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/questionSet", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <Typography variant="h3">Enter your questions.</Typography>
            <QuestionCreator addQuestion={addQuestion} />
            {questions.map((q, i) => {
                return <CreatedQuestion key={i} question={q} />
            })}
            <Button onClick={createQuestionSet} color="primary" variant="contained" disabled={questions.length === 0}>Create question set</Button>
        </>
    )
}

export default QuestionSetCreator;