import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  TextField,
  Container,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { difficulties, createMarkup } from "../helpers";
import QuizAnswers from "./QuizAnswers";
// const useStyles = makeStyles((them) => {
//   return styles;
// });
const QuizCategories = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: "", name: "" });
  const [quizNumber, setQuizNumber] = useState(null);
  const [difficulty, setDifficulty] = useState({ id: "", name: "" });
  const [quizData, setQuizData] = useState([]);
  // const classes = useStyles();
  const [currentQuizStep, setCurrentQuizStep] = useState("start");

  const fetchQuizData = async () => {
    try {
      const url = `https://opentdb.com/api.php?amount=${quizNumber}&category=${
        category.id
      }&difficulty=${difficulty.name.toLocaleLowerCase()}`;
      const { data } = await axios.get(url);
      const formattedCategory = data.results.map((category) => {
        const incorrectAnswersIndexes = category.incorrect_answers.length;
        const randomIndex = Math.random() * (incorrectAnswersIndexes - 0) + 0;
        category.incorrect_answers.splice(
          randomIndex,
          0,
          category.correct_answer
        );
        return {
          ...category,
          answers: category.incorrect_answers,
        };
      });
      setQuizData(formattedCategory);
      setCurrentQuizStep("results");
    } catch (error) {
      console.log("Fetch quiz error =>", error);
    }
  };
  const fetchCategories = async () => {
    const { data } = await axios.get(`https://opentdb.com/api_category.php`);
    setCategories(data.trivia_categories);
  };
  useEffect(() => {
    fetchCategories();
    window.scrollTo(0, "20px");
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quizData.length && quizNumber && category.id && difficulty) {
      fetchQuizData();
    }
  };
  const handleSelectChange = (e) => {
    e.preventDefault();
    const selectedCategory = categories.find(
      (category) => category.id === e.target.value
    );
    setCategory(selectedCategory);
  };
  const handleDifficultyChange = (e) => {
    e.preventDefault();
    const selectedDifficulty = difficulties.find(
      (difficulty) => difficulty.id === e.target.value
    );
    setDifficulty(selectedDifficulty);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setQuizNumber(e.target.value);
  };
  const resetQuiz = (e) => {
    e.preventDefault();
    setQuizData([]);
    setCategory("");
    setQuizNumber("");
    setDifficulty("");
    setCurrentQuizStep("start");
    window.scrollTo(0, "20px");
  };
  if (!categories.length) {
    return null;
  }
  return (
    <Container className="start-container">
      <Paper className="paper">
        {currentQuizStep === "start" ? (
          <>
            <Typography variant="h4" className="main-title">
              Get Questions:
            </Typography>
            <form onSubmit={handleSubmit} className="form-container">
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="category-select-lable">
                      Select Category
                    </InputLabel>
                    <Select
                      required
                      name="category"
                      value={category.id || ""}
                      id="category-select"
                      lable="Select Category"
                      lableId="category-select-lable"
                      onChange={handleSelectChange}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          <span
                            dangerouslySetInnerHTML={createMarkup(
                              category.name
                            )}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth varient="outlined">
                    <InputLabel id="difficulty-select-lable">
                      Select Difficulty
                    </InputLabel>
                    <Select
                      required
                      name="difficulty"
                      value={difficulty.id || ""}
                      id="difficulty-select"
                      lable="Select Difficulty"
                      labelId="difficulty-select-label"
                      onChange={handleDifficultyChange}
                    >
                      {difficulties.map((difficulty) => (
                        <MenuItem key={difficulty.id} value={difficulty.id}>
                          {difficulty.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel className="quiz-num">
                    Question's Number:
                  </InputLabel>
                  <TextField
                    inputProps={{ min: 1, max: 10 }}
                    required
                    fullWidth
                    type="number"
                    id="quiz-number"
                    varient="outlined"
                    name="quiz-number"
                    lable={`Add a quiz number from 1 to 10`}
                    value={quizNumber || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                className="sub-btn"
                type="submit"
                varient="contained"
                color="primary"
              >
                Submit
              </Button>
            </form>
          </>
        ) : (
          <QuizAnswers
            quizData={quizData}
            resetQuiz={resetQuiz}
            categories={categories}
            currentQuizStep={currentQuizStep}
            setCurrentQuizStep={setCurrentQuizStep}
          />
        )}
      </Paper>
    </Container>
  );
};

export default QuizCategories;
