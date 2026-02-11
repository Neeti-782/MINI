import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../features/quiz/quizeSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});
