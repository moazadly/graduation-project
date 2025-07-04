import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wordBeforeAfterAPI = createApi({
  reducerPath: "wordBeforeAfterAPI",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://mohamedfathi80-word-after-before.hf.space/gradio_api/call/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      // headers.set("Authorization", `Bearer ${process.env.HUGGINGFACE_TOKEN}`);
      headers.set(
        "Authorization",
        `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN}`
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    postPredict: builder.mutation({
      query: (inputText) => ({
        url: "predict",
        method: "POST",
        body: {
          data: [inputText],
        },
      }),
    }),
  }),
});

export const { usePostPredictMutation } = wordBeforeAfterAPI;
