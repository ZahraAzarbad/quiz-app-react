// import { Paper, Button, Typography } from "@material-ui/core";
import { Paper, Button, Typography } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
// import { Check, Close } from "@material-ui/icons";
import { createMarkup } from "../helpers";

const AnswersReview = ({ processedAnswers, resetQuiz }) => {
  const renderAnswers = (answers) => {
    return answers.map(
      ({ question, isCorrect, correctAnswer, wrongAnswer }) => (
        <Paper className="paper" key={question}>
          <Typography className="question" variant="h5">
            <span dangerouslySetInnerHTML={createMarkup(question)} />
          </Typography>

          {isCorrect ? (
            <Typography className="question" variant="h5">
              <Check />
              <span dangerouslySetInnerHTML={createMarkup(correctAnswer)} />
            </Typography>
          ) : (
            <>
              <Typography variant="h6" color="secondary">
                <Close />
                <span dangerouslySetInnerHTML={createMarkup(wrongAnswer)} />
              </Typography>
              <Typography variant="h6">
                <Check />
                <span dangerouslySetInnerHTML={createMarkup(correctAnswer)} />
              </Typography>
            </>
          )}
        </Paper>
      )
    );
  };

  return (
    <>
      <Typography variant="h4">Answers review:</Typography>
      {renderAnswers(processedAnswers)}
      <Button onClick={resetQuiz} variant="contained" color="primary">
        Reset
      </Button>
    </>
  );
};

export default AnswersReview;
