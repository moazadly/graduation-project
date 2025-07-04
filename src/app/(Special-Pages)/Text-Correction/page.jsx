"use client";
import NavbarWrapper from "../../components/NavbarWrapper";
import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextCorrectionSideBar from "../../components/TextCorrectionSideBar";
import Navigation from "../../components/Navigation";
import ArabicInputBox from "../../components/ArabicInputBox";
import { useCorrectTextMutation } from "../../redux/textCorrection";

export default function page() {
  const [text, setText] = useState("");
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [correctedText, setCorrectedText] = useState({});
  const [correctText] = useCorrectTextMutation();
  const getResult = async (word) => {
    setLoading(true);
    setError(null);
    try {
      if (word.length > 0) {
        const res = await correctText(text);
        console.log(res.data);
        setCorrectedText(res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("حدث خطأ أثناء التحميل. الرجاء المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
      setCorrect(false);
    }
  };
  useEffect(() => {
    if (correct) {
      console.log(correct);
      getResult(text);
    }
  }, [correct]);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box sx={{ width: "70%" }}>
        <NavbarWrapper />
        <Navigation pageTitle="التصحيح اللغوي" />
        <Stack spacing={6} mt={4} mb={8}>
          <Stack spacing={4} width={{ xs: "100%", sm: "70%" }}>
            <p className="text-3xl font-bold mb-12">
              التصحيح اللغوي يُعينك على تحسين أسلوبك وضبط لغتك عندما تتردد في
              اختيار الصيغة الأدق!
            </p>
            <h5>
              تساعد أداة التصحيح اللغوي المستخدم في تحسين الجمل المكتوبة وضبطها
              نحويًا وإملائيًا. تقوم الأداة بمراجعة النص بدقة، وتقديم اقتراحات
              لتصحيح الأخطاء وتحسين الأسلوب، مما يسهم في إنتاج نصوص سليمة وواضحة
              تعزز من جودة التعبير والتواصل.
            </h5>
          </Stack>
          <ArabicInputBox
            text={text}
            setText={setText}
            setCorrect={setCorrect}
            loading={loading}
            setInputText={setInputText}
          />
        </Stack>
      </Box>
      <Box
        sx={{
          width: "25%",
          boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
          height: "100vh",
        }}
      >
        <TextCorrectionSideBar
          text={inputText}
          correctedText={correctedText}
          setText={setText}
          setCorrectedText={setCorrectedText}
        />
      </Box>
    </Stack>
  );
}
