import React, { useState, useEffect } from "react";

import axios from "axios";

import { Box, Button } from "grommet";

import { QuestionSet } from "../types/question";
import QuestionSetList from "./QuestionSetList";
import QuestionSetCreator from "./QuestionSetCreator";

type ViewOptions = "none" | "list" | "create";

const QuestionSetView = () => {
  const [currentView, setCurrentView] = useState<ViewOptions>("none");
  const [questionSets, setQuestionSets] = useState<QuestionSet[]>([]);

  useEffect(() => {
    const fetchQuestionSets = async () => {
      try {
      const apiResponse = await axios.get(`http://localhost:8080/api/questionSets`);
      setQuestionSets(apiResponse.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuestionSets()
  }, [currentView]);

  const getCurrentView = () => {
    if (currentView === "create") {
      return <QuestionSetCreator />
    }
    if (currentView === "list") {
      return <QuestionSetList questionSets={questionSets} />
    }
    return <>
      <Button margin="small" primary label="Create new question set" onClick={() => setCurrentView("create")} />
      <Button margin="small" primary label="View existing sets" onClick={() => setCurrentView("list")} />
    </>
  }

  return (
    <Box>
      {currentView !== "none" ? <Button secondary label="Go back" onClick={() => setCurrentView("none")} /> : <></>}
      {getCurrentView()}
    </Box>
  )
}

export default QuestionSetView