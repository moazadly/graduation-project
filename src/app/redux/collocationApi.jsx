import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Cookies from "js-cookie";

export const collocationApi = createApi({
  reducerPath: "collocationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://arabic-data-collector.onrender.com/api/v1/search",
    prepareHeaders: (headers) => {
      // const token = Cookies.get("token");
      // if (token) {
      //   headers.set("Authorization", `Bearer ${token}`);
      // }
      // return headers;
      headers.set("ngrok-skip-browser-warning", "true");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCollocations: builder.query({
      query: (word) => {
        return {
          url: `?word=${word}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetCollocationsQuery } = collocationApi;
