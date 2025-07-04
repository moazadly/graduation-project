"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import example from "../assets/images/Group 1501.svg";
import meaning from "../assets/images/Group 1490 (2).svg";
import reference from "../assets/images/pngtree-vector-open-book-icon-png-image_781108-removebg-preview.png";
import translate from "../assets/images/images-removebg-preview.png";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { revalidatePath } from "next/cache";
import { Translate } from "@mui/icons-material";
import { split } from "postcss/lib/list";

export default function WordInformation({ Word }) {
  console.log(Word);
  const [activeStep, setActiveStep] = React.useState(0);
  let [moreExamples, setMoreExamples] = React.useState(
    Array(Word?.Semantics.length).fill(false)
  );

  function removeTashkeelAndAl(text) {
    let cleanedText = text.normalize("NFC").replace(/[\u064B-\u0652]/g, "");
    return cleanedText.replace(/^ال/, "");
  }

  function compareArabicWords(word1, word2) {
    return removeTashkeelAndAl(word1) === removeTashkeelAndAl(word2);
  }
  const labelRef = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    if (labelRef.current) {
      setLabelWidth(labelRef.current.offsetWidth); // Get the actual width of the label
    }
  }, [Word.Label]); // Run when Word.Label changes
  return (
    <Box sx={{ lineHeight: "1.5", fontFamily: "Arabic City !important" }}>
      <Stack
        sx={{
          backgroundColor: "#004F3F",
          color: "white",
          paddingX: 5,
          paddingY: 2.5,
          borderRadius: 1,
        }}
      >
        <Typography
          variant="h3"
          ref={labelRef}
          width="fit-content"
          fontWeight="bold"
          fontFamily="Arabic City !important"
        >
          {Word.Label}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          flexWrap="wrap"
          // spacing={6}
          sx={{ ml: { md: `${labelWidth + 5}px`, sm: "0px" } }}
        >
          <Typography
            variant="h6"
            fontSize="26px"
            fontWeight="600"
            fontFamily="Arabic City !important"
          >
            الصيغه الصرفيه:{" "}
            <span style={{ fontSize: "24px", fontWeight: "400" }}>
              {Word.morphFormula}
            </span>
          </Typography>
          <Typography
            variant="h6"
            fontSize="26px"
            fontWeight="600"
            fontFamily="Arabic City !important"
          >
            الاصل اللغوي:{" "}
            <span style={{ fontSize: "24px", fontWeight: "400" }}>
              {Word.origin}
            </span>{" "}
          </Typography>
          <Typography
            variant="h6"
            fontSize="26px"
            fontWeight="600"
            fontFamily="Arabic City !important"
          >
            {" "}
            عدد المعاني:{" "}
            <span style={{ fontSize: "24px", fontWeight: "400" }}>
              {" "}
              {Word.Semantics.length}
            </span>{" "}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        sx={{
          width: "98%",
          mx: "auto",
          boxShadow: "1px 0px 9px 6px rgba(0, 0, 0, 0.2)",
          p: 4,
          borderRadius: "0 0 8px 8px",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="700"
          color="var(--main_color)"
          textAlign="center"
          mb={2}
        >
          الرحلة الدلاليه للكلمه
        </Typography>
        <Typography
          color="black"
          fontFamily="Arabic City !important"
          fontSize="18px"
        >
          {Word.wordJourney}
        </Typography>
      </Stack>

      {Word.Semantics?.map((semantic, index) => {
        return (
          <Accordion
            key={index}
            sx={{
              mb: 4,
              borderRadius: "12px",
              border: "none",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                borderBottom: "none !important", // Removes the built-in line
                "&.Mui-expanded": { borderBottom: "none" }, // Ensures it stays removed when expanded
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 400, color: "#035242" }}
              >
                {semantic.label}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Stack direction="row">
                  <Box
                    sx={{
                      width: "30px",
                      flexShrink: 0,
                      mr: 1,
                    }}
                  >
                    <img src={meaning.src} width="30px" />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#000",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {semantic.meaning}
                    </Typography>
                  </Box>
                </Stack>

                {semantic.examples.length != 0 && (
                  <Stack>
                    {" "}
                    <Stack direction="row" alignItems="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "30px",
                          flexShrink: 0,
                          mr: 1,
                        }}
                      >
                        <img src={example.src} width="30px" />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            fontSize: "20px",
                            color: "#5B575A",
                          }}
                        >
                          {semantic.examples[0].split(" ").map((wrd) => {
                            if (compareArabicWords(wrd, Word.Label)) {
                              return (
                                <span
                                  style={{
                                    color: "#088e73",
                                    fontWeight: 900,
                                    fontSize: "26px",
                                  }}
                                >
                                  {wrd + " "}
                                </span>
                              );
                            } else {
                              return wrd + " ";
                            }
                          })}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" mt={2} alignItems="center">
                      <Box width="35px" mr={1}>
                        <img src={reference.src} alt="" />
                      </Box>
                      <p style={{ color: "#5B575A", fontSize: "18px" }}>
                        {semantic.references[0]}
                      </p>
                    </Stack>
                  </Stack>
                )}
                {moreExamples[index] &&
                  semantic.examples?.map(
                    (_, ind) =>
                      ind > 0 && (
                        <Stack>
                          <Stack direction="row" alignItems="center">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "30px",
                                flexShrink: 0,
                                mr: 1,
                              }}
                            >
                              <img src={example.src} width="30px" />
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "20px",
                                  color: "#5B575A",
                                }}
                              >
                                {semantic.examples[ind]
                                  .split(" ")
                                  .map((wrd) => {
                                    if (compareArabicWords(wrd, Word.Label)) {
                                      return (
                                        <span
                                          style={{
                                            color: "#088e73",
                                            fontWeight: 900,
                                            fontSize: "26px",
                                          }}
                                        >
                                          {wrd + " "}
                                        </span>
                                      );
                                    } else {
                                      return wrd + " ";
                                    }
                                  })}
                              </Typography>
                            </Box>
                          </Stack>
                          <Stack direction="row" mt={2}>
                            <Box width="30px" mr={1}>
                              <img src={reference.src} alt="" />
                            </Box>
                            <p style={{ color: "#5B575A", fontSize: "18px" }}>
                              {semantic.references[ind]}
                            </p>
                          </Stack>
                        </Stack>
                      )
                  )}
                {!moreExamples[index] && semantic.examples?.length > 1 && (
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    sx={{
                      color: "#004F3F",
                      background: "transparent",
                      fontSize: 32,
                      fontWeight: 700,
                      borderRadius: 3,
                      width: { xs: "100%", md: "60%" },
                      justifyContent: "start",
                    }}
                    onClick={() => {
                      setMoreExamples((prev) =>
                        prev.map((item, i) => (i === index ? !item : item))
                      );
                    }}
                  >
                    عرض المزيد من الأمثلة
                  </Button>
                )}

                <Stack direction="row" alignItems="center">
                  <Box width="30px" mr={1}>
                    <img src={translate.src} alt="" />
                  </Box>
                  <Box display="flex" alignItems="baseline">
                    <p
                      style={{
                        color: "var(--main_color)",
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginLeft: "16px",
                      }}
                    >
                      الترجمة الي الانجليزية
                    </p>
                    <p
                      style={{
                        color: "#000",
                        fontSize: "20px",
                        fontWeight: "500",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {semantic.translate}
                    </p>
                  </Box>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
