import { ReduxProvider } from "../redux/provider";
import Footer from "../components/Footer";
import { Box, Grid2, Stack } from "@mui/material";
import Navigator from "../components/Navigator";

export const metadata = {
  title: "تصحيح النصوص - قاموس القاهرة",
  description:
    "استخدم أداة تصحيح النصوص الذكية لتحسين كتاباتك باللغة العربية وتصحيح الأخطاء الإملائية والنحوية بدقة وسهولة.",
  keywords: ["تصحيح النصوص", "تصحيح الأخطاء", "الإملاء", "اللغة العربية"],
  alternates: {
    canonical: "https://cairo-dictionary-main.vercel.app/Text-Correction",
  },
  openGraph: {
    type: "website",
    url: "https://cairo-dictionary-main.vercel.app/Text-Correction",
    title: "تصحيح النصوص",
    description:
      "صحّح كتاباتك العربية بسهولة عبر أداة التصحيح الذكية من قاموس القاهرة.",
    siteName: "قاموس القاهرة",
    images: [
      {
        url: "https://cairo-dictionary-main.vercel.app/logo.png",
        width: 800,
        height: 600,
        alt: "تصحيح النصوص - قاموس القاهرة",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "تصحيح النصوص - قاموس القاهرة",
    description:
      "صحّح نصوصك العربية بدقة عبر أداة قاموس القاهرة المخصصة للمبتدئين والمتعلمين.",
    images: ["https://cairo-dictionary-main.vercel.app/logo.png"],
  },
};

export default function TextCorrectionLayout({ children }) {
  return (
    <ReduxProvider>
      <Stack
        direction="row"
        flexWrap="nowrap"
        sx={{ justifyContent: "space-between" }}
        mb={10}
      >
        <Box sx={{ width: "12%", marginTop: "16px" }}>
          <Navigator />
        </Box>
        <Box sx={{ width: "85%" }}>{children}</Box>
      </Stack>
      <Footer />
    </ReduxProvider>
  );
}
