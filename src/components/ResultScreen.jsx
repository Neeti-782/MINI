import { useDispatch, useSelector } from "react-redux";
import { selectQuiz } from "../features/quiz/quizSelectors";
import { resetQuiz, submitFinalQuiz } from "../features/quiz/quizeSlice";

const ResultScreen = () => {
  const dispatch = useDispatch();
  const { score } = useSelector(selectQuiz);
  const closeSubmit = useSelector((state) => state.quiz.closeSubmit);

  return (
    <>
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">
          Thank u for your're Answers.
        </h1>
        <h2 className="text-2xl font-bold text-pink-600 mb-4">
          You said YES {score} times 😄
        </h2>

        <div className="flex items-center justify-between">
          <button
            onClick={() => dispatch(resetQuiz())}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
          >
            Restart
          </button>
          <button
            onClick={() => dispatch(submitFinalQuiz())}
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
          >
            Submit
          </button>
        </div>
      </div>

      {closeSubmit && (
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-3xl font-bold text-pink-600 mb-4">
            Thank u for your're Answers. You made my Day ❤️
          </h1>
        </div>
      )}
    </>
  );
};

export default ResultScreen;
