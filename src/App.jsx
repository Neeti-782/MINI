import { useDispatch, useSelector } from "react-redux";
import { selectQuiz } from "./features/quiz/quizSelectors";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import { useEffect } from "react";
import { fetchQuestionsAsync } from "./features/quiz/quizeSlice";

function App() {
  const { completed } = useSelector(selectQuiz);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestionsAsync());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      {completed ? <ResultScreen /> : <QuestionCard />}
    </div>
  );
}

export default App;
