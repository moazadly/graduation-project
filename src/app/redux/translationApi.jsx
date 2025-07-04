import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// RTK Query slice for translation functionality
// Make sure to set NEXT_PUBLIC_TRANSLATION_API_BASE_URL in your environment variables
export const translationApi = createApi({
  reducerPath: "translationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_TRANSLATION_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // POST /translate => { translation: "..." }
    translate: builder.mutation({
      query: ({ text, sourceLang }) => ({
        url: "translate",
        method: "POST",
        body: {
          text,
          source_lang: sourceLang,
        },
      }),
    }),

    // GET /examples?text=text&lang=sourceLang => { examples: [...] }
    examples: builder.query({
      query: ({ text, sourceLang }) => ({
        url: `examples?text=${encodeURIComponent(text)}&lang=${sourceLang}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useTranslateMutation,
  useLazyExamplesQuery, // lazy version of examples query
} = translationApi;
