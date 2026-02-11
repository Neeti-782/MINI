import React, { useState } from "react";
import { submitAnswerAsync } from "../features/quiz/quizeSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentQuestion,
  selectQuiz,
} from "../features/quiz/quizSelectors";

export const TextComponent = () => {
  const [text, setText] = useState("");
  const question = useSelector(selectCurrentQuestion);
  const dispatch = useDispatch();

  if (!question) return null;

  const handleSubmit = () => {
    if (!text.trim()) return;

    dispatch(
      submitAnswerAsync({
        questionId: question.id,
        value: text,
      }),
    );

    setText("");
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something nice..."
        className="border p-2 rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export const RatingComponent = () => {
  const dispatch = useDispatch();
  const question = useSelector(selectCurrentQuestion);

  if (!question) return null;

  return (
    <div className="flex gap-3 justify-center">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          onClick={() =>
            dispatch(
              submitAnswerAsync({
                questionId: question.id,
                value: num,
              }),
            )
          }
          className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500"
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export const YesNoComponent = () => {
  const dispatch = useDispatch();
  const question = useSelector(selectCurrentQuestion);
  const { status } = useSelector(selectQuiz);

  const [noPosition, setNoPosition] = useState({ x: 120, y: 0 });

  if (!question) return null;

  const handleYes = () => {
    dispatch(
      submitAnswerAsync({
        questionId: question.id,
        value: "YES",
      }),
    );
  };

  const moveNoButton = () => {
    const randomX = Math.random() * 120 - 60;
    const randomY = Math.random() * 120 - 60;
    setNoPosition({ x: randomX, y: randomY });
  };

  return (
    <div className="flex justify-center gap-4 relative">
      <button
        onClick={handleYes}
        disabled={status === "loading"}
        className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
      >
        {status === "loading" ? "Thinking..." : "YES"}
      </button>

      <button
        onMouseEnter={moveNoButton}
        style={{
          transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
        }}
        className="bg-red-500 text-white px-5 py-2 rounded-lg transition absolute"
      >
        No
      </button>
    </div>
  );
};
