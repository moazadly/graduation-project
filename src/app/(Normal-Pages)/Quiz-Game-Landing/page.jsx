import { Container, Stack, Typography, Box } from "@mui/material";
import Navigation from "../../components/Navigation";
import StyledButton from "../../components/StyledButton";
import Link from "next/link";

export const metadata = {
  title: "اختبر مستواك في العربية - قاموس القاهرة",
  description:
    "لعبة تعليمية ممتعة للمبتدئين لتقييم مستواهم في اللغة العربية من خلال أسئلة بسيطة وتفاعلية.",
  keywords: [
    "اختبار اللغة العربية",
    "لعبة تعليمية",
    "مستوى اللغة",
    "اللغة العربية",
  ],
  alternates: {
    canonical: "https://cairo-dictionary-main.vercel.app/Quiz-Game-Landing",
  },
  openGraph: {
    type: "website",
    url: "https://cairo-dictionary-main.vercel.app/Quiz-Game-Landing",
    title: "اختبر مستواك في العربية - لعبة تعليمية",
    description:
      "اختبر مهاراتك في اللغة العربية بأسلوب ممتع وتفاعلي مخصص للمبتدئين عبر قاموس القاهرة.",
    siteName: "قاموس القاهرة",
    images: [
      {
        url: "https://cairo-dictionary-main.vercel.app/logo.png",
        width: 800,
        height: 600,
        alt: "لعبة تعليمية - قاموس القاهرة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "لعبة تعليمية - اختبار اللغة العربية",
    description:
      "قيّم مستواك في اللغة العربية بطريقة ممتعة وسهلة عبر أسئلة مخصصة للمبتدئين.",
    images: ["https://cairo-dictionary-main.vercel.app/logo.png"],
  },
};

export default function page() {
  return (
    <div>
      <Container
        fixed
        sx={{ mt: 3, mb: 10 }}
        maxWidth={"xl"}
        component={"main"}
      >
        <Navigation pageTitle="لعبة القطار - اختبر معلوماتك" />
        <Stack
          direction={{ xs: "column", lg: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={13}
          mb={8}
          mt={10}
          width="100%"
        >
          <Stack spacing={10}>
            <Typography variant="h4" fontWeight="bold" mb={4}>
              اختبر مستواك في اللغة العربية بطريقة ممتعة وتفاعلية!
            </Typography>
            <Typography variant="h5" mb={4}>
              تقدم لك هذه اللعبة البسيطة مجموعة من الأسئلة المصممة خصيصًا
              للمبتدئين، لتقييم مهاراتك في المفردات. طريقة ممتعة وسهلة لاكتشاف
              مستواك وتعزيز تعلمك بأسلوب ترفيهي محفّز.
            </Typography>
            <Link href="/Quiz_Game">
              <StyledButton size="large">ابدأ اللعبة</StyledButton>
            </Link>
          </Stack>
          <Box
            sx={{
              width: { lg: "80%", xs: "100%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <img
              src="/assets/images/game.png"
              alt="Quiz Game"
              width={500}
              height={500}
              style={{
                // width: "100%",
                // height: "auto",
                // maxWidth: 450,
                borderRadius: 16,
              }}
            />
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
