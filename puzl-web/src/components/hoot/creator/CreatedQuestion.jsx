import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const CreatedQuestion = ({ question }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="caption">{question.content}</Typography>
                <Typography variant="subtitle1">{`${question.possibleOptions.length} options`}.</Typography>
                <Typography variant="subtitle2">{question.correctOption}</Typography>
            </CardContent>
        </Card>
    )
}

export default CreatedQuestion;