"use client";
import { Box, Button, Stack, Typography, Snackbar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Icon from "../assets/images/icon-start 1.png";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip"; // make sure this is imported

export default function TextCorrectionSideBar({
  text,
  correctedText,
  setText,
  setCorrectedText,
}) {
  const [res, setChangedWords] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (Object.keys(correctedText).length > 0) {
      setChangedWords(correctedText.changes);
    }
  }, [text, correctedText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(correctedText.corrected);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Stack height={"100vh"} sx={{ overflowY: "auto" }}>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        p={1}
        mt={1}
      >
        <Box mr={1}>
          <Image src={Icon} alt="icon" />
        </Box>
        <Typography fontSize={24} fontWeight={"bold"}>
          الإقتراحات
        </Typography>
      </Stack>

      <hr
        style={{
          backgroundColor: "#E3E3E3",
          border: "none",
          height: "2px",
          marginTop: "16px",
        }}
      />
      {res.length === 0 ? (
        <Box textAlign={"center"} mt={10} px={3}>
          <Typography fontSize={"20px"}>
            ستظهر هنا التعديلات الخاصه بالجمله التي قمت بادخالها
          </Typography>
        </Box>
      ) : (
        <>
          {" "}
          <Stack
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              margin: "20px 15px 20px 0",
            }}
            direction="row"
            alignItems="center"
          >
            <span>مراجعة الاقتراحات</span>
            <span
              style={{
                marginRight: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "25px",
                height: "25px",
                fontWeight: "500",
                fontSize: "18px",
                color: "white",
                backgroundColor: "black",
                borderRadius: "50%",
              }}
            >
              {res.length}
            </span>
          </Stack>
          <hr
            style={{
              backgroundColor: "#E3E3E3",
              border: "none",
              height: "2px",
            }}
          />
          {res.map((item, index) => (
            <React.Fragment key={index}>
              <Stack
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  margin: "20px 15px 20px 0",
                }}
                direction="row"
                alignItems="center"
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "28px",
                    height: "28px",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "white",
                    backgroundColor: "black",
                    borderRadius: "50%",
                  }}
                >
                  {index + 1}
                </span>
                <span
                  style={{
                    marginRight: "10px",
                    color: "#7B8294",
                    textDecoration: "line-through",
                  }}
                >
                  {item.before}
                </span>
                <span style={{ marginRight: "10px" }}>{item.after}</span>
              </Stack>
              <hr
                style={{
                  backgroundColor: "#E3E3E3",
                  border: "none",
                  height: "2px",
                  width: "90%",
                  margin: "0 auto",
                }}
              />
            </React.Fragment>
          ))}
          <Box mt={10}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
              px={2}
            >
              <Tooltip title="نسخ النص" arrow>
                <ContentCopyIcon
                  onClick={handleCopy}
                  sx={{
                    cursor: "pointer",
                    fontSize: "20px",
                    color: "#0a4b39",
                    "&:hover": {
                      color: "#0c5c45",
                    },
                  }}
                />
              </Tooltip>

              <Typography
                textAlign="center"
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  direction: "rtl",
                  wordBreak: "break-word",
                }}
              >
                {correctedText.corrected}
              </Typography>
            </Box>

            <Box textAlign="center" mt={5}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0a4b39",
                  "&:hover": {
                    backgroundColor: "#0c5c45",
                  },
                  px: 4,
                  borderRadius: "6px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  mb: "12px",
                }}
                onClick={() => {
                  setText(correctedText.corrected);
                  setChangedWords([]);
                  setCorrectedText({});
                }}
              >
                تطبيق
              </Button>
            </Box>
          </Box>
          <Snackbar
            open={copied}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            ContentProps={{
              sx: {
                justifyContent: "center", // center the whole content
                textAlign: "center", // center the text itself
                fontWeight: "bold",
                fontSize: "16px",
              },
            }}
            message="تم نسخ النص"
          />
        </>
      )}
    </Stack>
  );
}
