import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const suggestTerminologyApi = createApi({
  reducerPath: "suggestTerminologyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://arabic-data-collector.onrender.com/api/v1/",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    suggestTerm: builder.mutation({
      query: ({ definition, term }) => ({
        url: "term-generation",
        method: "POST",
        body: { definition, term },
      }),
    }),
  }),
});

export const { useSuggestTermMutation } = suggestTerminologyApi;
