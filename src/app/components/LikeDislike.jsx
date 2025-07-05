import React, { useState } from "react";
import { IconButton, Stack, TextField, Tooltip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useSuggestTermMutation } from "../redux/suggestTerminologyAPI";

const LikeDislike = ({ term, definition }) => {
  const [selection, setSelection] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [suggestTerm, { isLoading }] = useSuggestTermMutation();

  const handleLike = async () => {
    setSelection((prev) => (prev === "like" ? null : "like"));
    setSuccess("");
    setError("");
  };
  const handleDislike = () => {
    setSelection((prev) => (prev === "dislike" ? null : "dislike"));
    setSuccess("");
    setError("");
  };

  const handleSuggest = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!suggestion.trim()) {
      setError("يرجى إدخال المصطلح الصحيح المقترح.");
      return;
    }
    try {
      await suggestTerm({ definition, term: suggestion }).unwrap();
      setSuccess("تم إرسال الاقتراح بنجاح!");
      setSuggestion("");
    } catch (e) {
      setError("حدث خطأ أثناء إرسال الاقتراح.");
    }
  };

  const commonSx = {
    p: 1,
    borderRadius: "6px",
    border: "none",
    bgcolor: "transparent",
    "&:hover": {
      bgcolor: (theme) => theme.palette.action.hover,
    },
  };

  return (
    <Stack>
      <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
        <Tooltip title="مصطلح صحيح" placement="bottom">
          <IconButton
            size="small"
            disableRipple
            onClick={handleLike}
            sx={{
              ...commonSx,
              bgcolor: selection === "like" ? "common.white" : commonSx.bgcolor,
            }}
            disabled={isLoading}
          >
            <ThumbUpIcon
              fontSize="small"
              color={selection === "like" ? "primary" : "inherit"}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="مصطلح غير صحيح" placement="bottom">
          <IconButton
            size="small"
            disableRipple
            onClick={handleDislike}
            sx={{
              ...commonSx,
              bgcolor:
                selection === "dislike" ? "common.white" : commonSx.bgcolor,
            }}
            disabled={isLoading}
          >
            <ThumbDownIcon
              fontSize="small"
              color={selection === "dislike" ? "error" : "inherit"}
            />
          </IconButton>
        </Tooltip>
        {selection === "dislike" && (
          <form
            onSubmit={handleSuggest}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginRight: 8,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="اقترح المصطلح الصحيح"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              sx={{
                width: "75%",
                border: "2px solid var(--main_color)",
                borderRadius: "12px",
                "& .MuiOutlinedInput-root": {
                  padding: "6px 14px",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: 0,
                  height: "100%",
                },
              }}
              disabled={isLoading}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "var(--main_color)",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: 6,
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
              disabled={isLoading}
            >
              اقترح
            </button>
          </form>
        )}
      </div>
      {success && <p style={{ color: "green", marginTop: 8 }}>{success}</p>}
      {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
    </Stack>
  );
};

export default LikeDislike;
