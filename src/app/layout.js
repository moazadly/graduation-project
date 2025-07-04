import "./globals.css";
import { Container, Stack } from "@mui/material";
import ArabicMUI from "./components/ArabicMUI";
import Header from "./components/Header";
import NavbarWrapper from "./components/NavbarWrapper";
import Footer from "./components/Footer";
import { ReduxProvider } from "./redux/provider";
import localFont from "next/font/local";

const lama = localFont({
  src: [
    {
      path: "../../public/fonts/LamaSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/LamaSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/LamaSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-lama",
  display: "swap",
});

export const metadata = {
  title: "قاموس القاهرة",
  description:
    "موقع قاموس القاهره يهدف إلى تعليم الأطفال والكبار اللغة العربية، سواء أكانوا عرباً أو أعاجم، كما يحتوي على صفحات مخصصة لمختصي اللغة وباحثي المعاجم.",
  keywords: ["قاموس القاهرة", "اللغة العربية", "تعليم العربية", "معجم"],
  authors: [{ name: "جامعة القاهرة" }],
  alternates: {
    canonical: "https://cairo-dictionary-main.vercel.app/",
  },
  openGraph: {
    type: "website",
    url: "https://cairo-dictionary-main.vercel.app/",
    title: "قاموس القاهرة",
    description:
      "تعلم اللغة العربية مع قاموس القاهرة من خلال أدوات تعليمية وتفاعلية مخصصة لجميع الأعمار.",
    siteName: "قاموس القاهرة",
    images: [
      {
        url: "https://cairo-dictionary-main.vercel.app/logo.png",
        width: 800,
        height: 600,
        alt: "شعار قاموس القاهرة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "قاموس القاهرة",
    description: "تعلم العربية بسهولة للأطفال والكبار عبر أدوات ذكية تفاعلية.",
    images: ["https://cairo-dictionary-main.vercel.app/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="ar" dir="rtl" className={lama.variable}>
        <body>
          <Stack sx={{ backgroundColor: "#004D40", color: "white" }}>
            <Header />
          </Stack>
          <ArabicMUI children={children} />
        </body>
      </html>
    </ReduxProvider>
  );
}
