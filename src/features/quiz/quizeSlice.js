import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuestions, submitQuestionApi } from "../../api/quiz";

export const submitAnswerAsync = createAsyncThunk(
  "quiz/submitAnswerAsync",
  async ({ questionId, value }) => {
    // simulate delay only
    await new Promise((resolve) => setTimeout(resolve, 300));

    return { questionId, value };
  },
);

export const submitFinalQuiz = createAsyncThunk(
  "quiz/submitFinalQuiz",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().quiz;

      const payload = {
        score: Number(state.score),
        answers: state.answers,
      };

      const res = await submitQuestionApi(payload);

      return res;
    } catch (error) {
      return rejectWithValue("Submission failed", error);
    }
  },
);

export const fetchQuestionsAsync = createAsyncThunk(
  "quiz/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      return await getQuestions();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  questions: [],
  currentIndex: 0,
  answers: {}, // store answers by questionId
  score: 0,
  completed: false,
  status: "idle",
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,

  reducers: {
    /**
     * Reset quiz to initial state
     */
    resetQuiz: (state) => {
      state.questions = [];
      state.currentIndex = 0;
      state.answers = {};
      state.score = 0;
      state.completed = false;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔄 When async starts
      .addCase(submitAnswerAsync.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchQuestionsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
        ((state.status = "idle"), (state.questions = action.payload));
      })
      .addCase(fetchQuestionsAsync.rejected, (state, action) => {
        ((state.status = "failed"), (state.error = action.payload));
      })

      // ✅ When async succeeds
      .addCase(submitAnswerAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const { questionId, value } = action.payload;

        // Save answer
        state.answers[questionId] = value;

        // Score logic
        if (value === "Yes" || Number(value) >= 4) {
          state.score += 1;
        }

        // Move to next question or complete
        if (state.currentIndex < state.questions.length - 1) {
          state.currentIndex += 1;
        } else {
          state.completed = true;
        }
      })

      .addCase(submitAnswerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
