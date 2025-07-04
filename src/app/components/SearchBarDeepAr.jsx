"use client";
import { Box, Stack, CircularProgress } from "@mui/material";
import { useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import StyledButton from "./StyledButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function DeepArSpeechToText({ setSearchTerm }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, { mimeType: "audio/webm" });
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        await sendAudioToBackend(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("خطأ في الوصول إلى الميكروفون:", error);
      alert("تعذّر الوصول إلى الميكروفون.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const sendAudioToBackend = async (audioBlob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const response = await fetch(`${API_URL}/api/speech/transcribe`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to process audio");

      const data = await response.json();
      const transcription = data.transcription;

      if (transcription && setSearchTerm) {
        setSearchTerm(transcription);
      }
    } catch (error) {
      console.error("Error processing audio:", error);
      alert("حدث خطأ في معالجة الصوت.");
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  if (isProcessing) return <CircularProgress size={24} />;

  return (
    <button
      type="button"
      onClick={toggleRecording}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isRecording ? (
        <MicOffIcon sx={{ color: "#dc2626", fontSize: 20 }} />
      ) : (
        <MicIcon sx={{ color: "rgba(0, 0, 0, 0.54)", fontSize: 20 }} />
      )}
    </button>
  );
}

export default function SearchBarDeepAr({
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
      return;
    }
    if (oneWord && inputValue.trim().split(" ").length === 1 && onSearch) {
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
            right: "19%",
            transform: "translateY(-50%)",
          }}
        >
          <DeepArSpeechToText setSearchTerm={setText} />
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
