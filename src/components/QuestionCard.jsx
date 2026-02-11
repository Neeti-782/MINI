import { useSelector } from "react-redux";
import { selectCurrentQuestion } from "../features/quiz/quizSelectors";
import ProgressBar from "./ProgressBar";
import { RatingComponent, TextComponent, YesNoComponent } from "./questionType";

const QuestionCard = () => {
  const question = useSelector(selectCurrentQuestion);

  if (!question) {
    return null;
  }

  const renderQuestionByType = () => {
    switch (question.type) {
      case "YESNO":
        return <YesNoComponent question={question} />;

      case "TEXT":
        return <TextComponent question={question} />;

      case "RATING":
        return <RatingComponent question={question} />;

      default:
        return <p>Unsupported question type</p>;
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center relative">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">
        Hii My Cutu this is for u....
      </h1>
      <ProgressBar />

      <h2 className="text-xl font-semibold mb-6">{question.ques}</h2>

      {renderQuestionByType()}
    </div>
  );
};

export default QuestionCard;
