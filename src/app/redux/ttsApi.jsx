import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create a base query with custom configuration
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_TTS_API_BASE_URL || "http://localhost:8000",
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  responseHandler: async (response) => {
    // For non-2xx responses, let the error handler deal with it
    if (!response.ok) {
      return response;
    }
    
    // For successful responses, return the blob directly
    const blob = await response.blob();
    return {
      data: blob,
      meta: { response }
    };
  },
  validateStatus: (response, result) => {
    // Consider the request successful if we get any response
    return response.status < 400;
  },
});

// Create an API service using the baseQuery
export const ttsApi = createApi({
  reducerPath: 'ttsApi',
  baseQuery: async (args, api, extraOptions) => {
    try {
      const result = await baseQuery(args, api, extraOptions);
      
      // If we have an error, log it and rethrow
      if (result.error) {
        console.error('TTS API Error:', {
          status: result.error.status,
          data: result.error.data,
          message: result.error.error
        });
        throw result.error;
      }
      
      return result;
    } catch (error) {
      console.error('TTS API Request Failed:', error);
      throw error;
    }
  },
  endpoints: (builder) => ({
    getTTS: builder.mutation({
      query: ({ text, lang = 'ar' }) => ({
        url: '/api/tts',
        method: 'POST',
        body: { text, lang },
        responseHandler: (response) => response.blob(),
      }),
      transformResponse: (blob) => {
        try {
          if (!blob || blob.size === 0) {
            throw new Error('Received empty audio response');
          }
          
          const audioUrl = URL.createObjectURL(blob);
          console.log('Generated audio URL from blob of size:', blob.size);
          return audioUrl;
        } catch (error) {
          console.error('Error creating audio URL:', error);
          throw new Error('Failed to create audio URL: ' + error.message);
        }
      },
    }),
  }),
});

export const { useGetTTSMutation } = ttsApi;
