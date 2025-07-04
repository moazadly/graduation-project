import { useState, useRef } from "react";
import { Mic, MicOff } from "lucide-react";
export default function SpeechToText({ setSearchTerm }) {
  const GROQ_API_KEY =
    "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";

  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => handleTranscription(GROQ_API_KEY);
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError("Permission to access microphone denied");
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTranscription = async (apiKey) => {
    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });

      const formData = new FormData();
      formData.append("file", audioBlob, "recording.wav");
      formData.append("model", "whisper-large-v3");
      formData.append("language", "ar");

      const response = await fetch(
        "https://api.groq.com/openai/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        throw new Error(`Transcription failed: ${errorText}`);
      }

      const data = await response.json();
      setSearchTerm(data.text);
      return data.text;
    } catch (err) {
      setError("Failed to transcribe audio");
      console.error(err);
      return null;
    }
  };

  return (
    <button
      type="button"
      onClick={isRecording ? stopRecording : startRecording}
      className={`ml-2 p-2 rounded-full ${
        isRecording ? "bg-red-500 text-white" : " text-gray-700"
      }`}
    >
      {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
    </button>
  );
}
