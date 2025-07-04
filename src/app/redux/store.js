import { configureStore } from "@reduxjs/toolkit";
import { collocationApi } from "./collocationApi";
import { wordBeforeAfterAPI } from "./wordBeforeAfter";
import { termGenrationApi } from "./termGenrationAPI";
import { textCorrectionApi } from "./textCorrection";
import { suggestTerminologyApi } from "./suggestTerminologyAPI";
import { translationApi } from "./translationApi";
import { semanticJourneyApi } from "./semanticJourneyApi";
import { ttsApi } from "./ttsApi";
import { quizApi } from "./quizApi";

export const store = configureStore({
  reducer: {
    [collocationApi.reducerPath]: collocationApi.reducer,
    [wordBeforeAfterAPI.reducerPath]: wordBeforeAfterAPI.reducer,
    [termGenrationApi.reducerPath]: termGenrationApi.reducer,
    [textCorrectionApi.reducerPath]: textCorrectionApi.reducer,
    [suggestTerminologyApi.reducerPath]: suggestTerminologyApi.reducer,
    [translationApi.reducerPath]: translationApi.reducer,
    [semanticJourneyApi.reducerPath]: semanticJourneyApi.reducer,
    [ttsApi.reducerPath]: ttsApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      collocationApi.middleware,
      wordBeforeAfterAPI.middleware,
      termGenrationApi.middleware,
      textCorrectionApi.middleware,
      suggestTerminologyApi.middleware,
      translationApi.middleware,
      semanticJourneyApi.middleware,
      ttsApi.middleware,
      quizApi.middleware
    ),
});
