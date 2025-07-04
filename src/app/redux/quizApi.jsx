import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://arabic-data-collector.onrender.com/api/v1/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // GET /question?size=10&category=...
    getQuestions: builder.query({
      query: ({ size = 5, category }) =>
        `question?size=${size}&category=${encodeURIComponent(category)}`,
    }),
    // POST /question/Question_ID/check
    checkAnswer: builder.mutation({
      query: ({ questionId, answer }) => ({
        url: `question/${questionId}/check`,
        method: "POST",
        body: { answer },
      }),
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useLazyGetQuestionsQuery,
  useCheckAnswerMutation,
} = quizApi;
