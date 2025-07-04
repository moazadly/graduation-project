import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const textCorrectionApi = createApi({
  reducerPath: "textCorrectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://arabic-data-collector.onrender.com/api/v1/",
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "true");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    correctText: builder.mutation({
      query: (inputText) => ({
        url: "text-correction",
        method: "POST",
        body: { text: inputText },
      }),
    }),
  }),
});

export const { useCorrectTextMutation } = textCorrectionApi;
