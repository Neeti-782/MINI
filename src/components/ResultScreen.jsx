import { useDispatch, useSelector } from "react-redux";
import { resetQuiz, submitFinalQuiz } from "../features/quiz/quizeSlice";

const ResultScreen = () => {
  const dispatch = useDispatch();
  const closeSubmit = useSelector((state) => state.quiz.closeSubmit);

  return (
    <>
      {!closeSubmit && (
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            Thank u for your're Answers.
          </h1>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => dispatch(resetQuiz())}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
            >
              Restart
            </button>
            <button
              type="button"
              onClick={() => dispatch(submitFinalQuiz())}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {closeSubmit && (
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            Thank u for your're Answers.
          </h1>
        </div>
      )}
    </>
  );
};

export default ResultScreen;
