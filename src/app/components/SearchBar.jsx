"use client";
import { Box, Stack } from "@mui/material";
import { useRef, useState } from "react";
import SpeechToText from "./speechToText";
import StyledButton from "./StyledButton";

export default function SearchBar({
  oneWord = false,
  onSearch,
  placeholder = "اكتب البحث...",
}) {
  const ARABICREGEX = /^[\u0600-\u06FF\s]+$/;
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [errorArabicText, setErrorArabicText] = useState(false);
  function setText(text) {
    setInputValue(text.trim());
    if (inputRef.current) {
      inputRef.current.value = text.trim();
    }
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!ARABICREGEX.test(inputValue)) {
      setErrorArabicText(true);
      return;
    }
    if (oneWord && inputValue.trim().split(" ").length > 1) {
      setError(true);
    }
    if (oneWord && inputValue.trim().split(" ").length == 1 && onSearch) {
      setError(false);
      setErrorArabicText(false);

      onSearch(inputValue);
    }
    if (onSearch && inputValue.trim() !== "" && !oneWord) {
      onSearch(inputValue);
      setErrorArabicText(false);
    }
  }

  const isInputEmpty = inputValue.trim() === "";

  return (
    <>
      {" "}
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ position: "relative" }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "16%",
            transform: "translateY(-50%)",
          }}
        >
          <SpeechToText setSearchTerm={setText} />
        </Box>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`border-2 shadow-lg rounded-full px-6 py-4 w-full text-right pl-12
    ${
      error || errorArabicText
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-black"
    }
    focus:outline-none 
  `}
        />
        <StyledButton size="small" disabled={isInputEmpty}>
          بحث
        </StyledButton>
      </Stack>
      {errorArabicText && (
        <span
          data-testid="err"
          style={{
            marginTop: "12px",
            color: "red",
            marginRight: "16px",
          }}
        >
          يحب ادخال نص عربي فقط
        </span>
      )}
      <span
        data-testid="err"
        style={{
          marginTop: "12px",
          color: "red",
          marginRight: "16px",
          visibility: error ? "visible" : "hidden",
        }}
      >
        ادخل كلمه واحده فقط
      </span>
    </>
  );
}
