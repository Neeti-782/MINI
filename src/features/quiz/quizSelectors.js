// Base selector
export const selectQuiz = (state) => state.quiz;

// Current question selector
export const selectCurrentQuestion = (state) => {
  const quiz = selectQuiz(state);

  if (!quiz?.questions?.length) return null;

  return quiz.questions[quiz.currentIndex] ?? null;
};
