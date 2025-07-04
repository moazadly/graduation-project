"use client";
import { Stack } from "@mui/material";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import LikeDislike from "./LikeDislike";
import stars from "../assets/images/icon-start 1.png";
import Image from "next/image";
import { usePostPredictMutation } from "../redux/termGenrationAPI";
import { streamGradioEvent } from "../redux/streamForTermGenration";

function TermGenSearch() {
  const ARABICREGEX = /^[\u0600-\u06FF\s]+$/;
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");
  const [postPredict] = usePostPredictMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getResult = async (word) => {
    try {
      setLoading(true);
      console.log(word);
      const response = await postPredict(word).unwrap();
      console.log(response);
      const eventId = response?.event_id || response?.data?.[0];
      console.log(eventId);
      if (!eventId) {
        setLoading(false);
        return;
      }

      let buffer = "";

      await streamGradioEvent(
        eventId,
        (chunk) => {
          buffer += chunk;

          // Look for complete `data:` lines
          const lines = buffer.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const jsonString = line.slice(6); // remove "data: "
              try {
                const parsed = JSON.parse(jsonString);

                if (parsed[0].predicted_term) {
                  setResult(parsed[0].predicted_term);
                  setLoading(false);
                }
              } catch (e) {
                console.warn("Invalid JSON chunk:", jsonString);
                setLoading(false);
              }
            }
          }
        },
        () => {
          console.log("✅ Stream ended");
          setLoading(false);
        },
        (err) => {
          console.error("❌ Stream error:", err.message);
          setLoading(false);
        }
      );
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  };

  const handelSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setError("يجب ادخال نص");
      return;
    }
    if (!ARABICREGEX.test(search)) {
      setError("يجب أن يكون النص عربي");
      return;
    }
    getResult(search);
    setError("");
  };

  return (
    <Stack style={{ width: "85%", margin: "auto", marginBottom: "100px" }}>
      <form
        style={{
          position: "relative",
        }}
        onSubmit={handelSearch}
      >
        <div className="relative w-full mt-4">
          <label
            htmlFor="search"
            className={`absolute right-4 transition-all duration-200 text-gray-500 ${
              search ? "text-xs top-3" : "text-sm top-8"
            }`}
          >
            {search
              ? "الجملة التي تريد ايجاد المصطلح لها"
              : "ادخل الجمله التي تريد ايجاد مصطلح لها"}
          </label>
          <TextareaAutosize
            id="search"
            name="search"
            minRows={5}
            maxRows={10}
            className="focus:outline-none w-full"
            style={
              result
                ? {
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px -4px 6px -2px",
                    borderRadius: "12px 12px 0 0",
                    width: "100%",
                    padding: "15px",
                    resize: "none",
                    paddingTop: "30px",
                  }
                : {
                    boxShadow: "0 0 6px 3px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    width: "100%",
                    padding: "15px",
                    resize: "none",
                    paddingTop: "30px",
                  }
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          style={
            loading
              ? {
                  backgroundColor: "gray",
                  disabled: true,
                  color: "white",
                  padding: "10px 25px",
                  borderRadius: "6px",
                  position: "absolute",
                  left: "20px",
                  bottom: "20px",
                }
              : {
                  backgroundColor: "var(--main_color)",
                  color: "white",
                  padding: "10px 25px",
                  borderRadius: "6px",
                  position: "absolute",
                  left: "20px",
                  bottom: "20px",
                }
          }
        >
          {loading ? "يتم ايجاد المصطلح" : "إيجاد المصطلح"}
        </button>
      </form>
      {error && <p className="text-red-600 text-lg  mt-2">{error}</p>}
      <div
        style={
          result
            ? {
                visibility: "visible",
                opacity: 1,
                transform: "translateY(0)",
                transition:
                  "opacity 0.8s ease, transform 0.8s ease, visibility 0.8s",
              }
            : {
                visibility: "hidden",
                opacity: 0,
                transform: "translateY(40px)",
                transition:
                  "opacity 0.8s ease, transform 0.8s ease, visibility 0.8s",
              }
        }
      >
        <hr
          style={{
            backgroundColor: "#004f3f",
            border: "none",
            height: "3px",
            width: "60%",
            margin: "0 auto",
          }}
        />
        <span
          style={{ marginRight: "16px", fontSize: "14px" }}
          className="text-gray-500"
        >
          المصطلح
        </span>
        <div
          style={{
            fontSize: "16px",
            color: "#333",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 6px 6px -1px rgba(0, 0, 0, 0.1)",
            padding: "25px 15px",
            borderRadius: "0 0 12px 12px",
          }}
        >
          <Image src={stars} />
          <span style={{ marginRight: "6px", fontWeight: "bold" }}>
            {result}
          </span>
        </div>
        <LikeDislike term={result} definition={search} />
      </div>
    </Stack>
  );
}

export default TermGenSearch;
