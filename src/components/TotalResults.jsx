import { Button, Typography } from "@mui/material";
import AnswersReview from "./AnswersReview";
import { useEffect } from "react";
const TotalResults = ({
  resetQuiz,
  currentQuizStep,
  processedAnswers,
  setCurrentQuizStep,
}) => {
  useEffect(() => {
    window.scrollTo(0, "20px");
  }, []);
  return currentQuizStep === "results" ? (
    <div>
      <Typography variant="h4">Results</Typography>
      <Typography variant="h6">
        {processedAnswers.filter(({ isCorrect }) => isCorrect).length} out of{" "}
        {processedAnswers.length}
      </Typography>
      <Button
        onClick={(e) => {
          setCurrentQuizStep("review");
        }}
        variant="contained"
        color="primary"
      >
        Review
      </Button>{" "}
      <Button onClick={resetQuiz} variant="contained" color="primary">
        Reset
      </Button>
    </div>
  ) : (
    <AnswersReview resetQuiz={resetQuiz} processedAnswers={processedAnswers} />
  );
};
export default TotalResults;
