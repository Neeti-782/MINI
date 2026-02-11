import { useSelector } from "react-redux";
import { selectQuiz } from "../features/quiz/quizSelectors";

const ProgressBar = () => {
  const { currentIndex, questions } = useSelector(selectQuiz);

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
      <div
        className="bg-pink-500 h-3 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
