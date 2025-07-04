import React from "react";
import { Box, Button, TextField, Paper } from "@mui/material";

export default function ArabicInputBox({
  text,
  setText,
  setCorrect,
  loading,
  setInputText,
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        textAlign: "right",
      }}
    >
      <TextField
        multiline
        minRows={5}
        fullWidth
        variant="standard"
        InputProps={{ disableUnderline: true }}
        sx={{
          fontSize: "16px",
          mb: 2,
        }}
        placeholder="ادخل النص"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Box textAlign="center">
        <Button
          variant="contained"
          sx={
            loading
              ? {
                  backgroundColor: "gray",
                  disabled: true,
                  fontWeight: "bold",
                  fontSize: "14px",
                }
              : {
                  backgroundColor: "#0a4b39",
                  "&:hover": {
                    backgroundColor: "#0c5c45",
                  },
                  px: 4,
                  borderRadius: "6px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }
          }
          onClick={() => {
            setCorrect(true);
            setInputText(text);
          }}
        >
          {loading ? "جاري التحقق..." : "تحقيق"}
        </Button>
      </Box>
    </Paper>
  );
}
