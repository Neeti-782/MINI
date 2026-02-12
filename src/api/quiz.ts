export const submitQuestionApi = async (data: {
  score: number;
  answers: Record<string, any>;
}) => {
  const res = await fetch(
    "https://mini-server-production-378b.up.railway.app/quiz/submit",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to submit quiz");
  }

  return res.json();
};

export const getQuestions = async () => {
  const res = await fetch(
    "https://mini-server-production-378b.up.railway.app/question",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  return res.json();
};
