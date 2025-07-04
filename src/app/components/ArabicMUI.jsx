"use client";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import Footer from "./Footer";

export default function ArabicMUI({ children }) {
  const theme = createTheme({
    typography: {
      fontFamily: "var(--font-lama), sans-serif", // Uses your CSS variable
    },
    direction: "rtl",
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
