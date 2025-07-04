import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// RTK Query slice for semantic journey functionality
// Make sure to set NEXT_PUBLIC_SEMANTIC_JOURNEY_API_BASE_URL in your environment variables
export const semanticJourneyApi = createApi({
  reducerPath: "semanticJourneyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SEMANTIC_JOURNEY_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // GET /journey?word=WORD => { word: WORD, journey: [...] }
    getJourney: builder.query({
      query: (word) => ({
        url: `journey?word=${encodeURIComponent(word)}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetJourneyQuery } = semanticJourneyApi;
