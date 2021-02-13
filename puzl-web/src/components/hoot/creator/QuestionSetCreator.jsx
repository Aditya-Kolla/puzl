import React, { useState, useEffect } from 'react';

import QuestionCreator from './QuestionCreator';

const QuestionSetCreator = () => {

    let [questions, setQuestions] = useState([]);

    return (
        <QuestionCreator />
    )
}

export default QuestionSetCreator;