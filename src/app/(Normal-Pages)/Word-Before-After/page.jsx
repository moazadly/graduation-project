import { Container, Stack } from "@mui/material";
import Image from "next/image";
import hero from "../../../../public/assets/images/word after and before.png";
import Navigation from "../../components/Navigation";
import Search from "../../components/Search";
import dynamic from "next/dynamic";

const BeforeAfterResults = dynamic(() =>
  import("../../components/BeforeAfterResults")
);

export const metadata = {
  title: "السوابق واللواحق - قاموس القاهرة",
  description:
    "استخدم أداة السوابق و اللواحق في قاموس القاهرة لتحسين فهمك للكلمه واستخداماتها. مثالية للمتعلمين والباحثين.",
  keywords: [
    "السوابق",
    "اللواحق",
    "تحليل الكلمة",
    "اللغة العربية",
    "سياق الكلمة",
  ],
  alternates: {
    canonical: "https://cairo-dictionary-main.vercel.app/Word-Before-After",
  },
  openGraph: {
    type: "website",
    url: "https://cairo-dictionary-main.vercel.app/Word-Before-After",
    title: "السوابق واللواحق - قاموس القاهرة",
    description:
      "أداة تعليمية لفهم تكوين الكلمات، ومعرفة السوابق واللواحق المستخدمة في اللغة العربية.",
    siteName: "قاموس القاهرة",
    images: [
      {
        url: "https://cairo-dictionary-main.vercel.app/logo.png",
        width: 800,
        height: 600,
        alt: "السوابق واللواحق - قاموس القاهرة",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "السوابق واللواحق - قاموس القاهرة",
    description:
      "تعرف على بنية الكلمات العربية عبر تحليل السوابق واللواحق بطريقة مبسطة وتفاعلية.",
    images: ["https://cairo-dictionary-main.vercel.app/logo.png"],
  },
};

function page() {
  return (
    <div>
      <Container fixed maxWidth={"xl"} sx={{ mt: 3 }} component={"main"}>
        <Navigation pageTitle="الكشاف السياقي" />
        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems={"center"}
          spacing={24}
          mt={10}
          mb={8}
        >
          <Stack spacing={6}>
            <p className="text-3xl font-bold mb-12">
              اكتشف الكلمات الأكثر ارتباطًا بالكلمة المستهدفة!
            </p>
            <h5>
              تتيح لك هذه الأداة معرفة أكثر الكلمات شيوعًا التي تسبق وتتبع
              الكلمة المطلوبة، مما يساعدك على فهم السياق اللغوي بشكل أعمق،
              واستكشاف الاستخدامات المختلفة لها في النصوص.
            </h5>
            <Search />
          </Stack>
          <Image src={hero} width={500} height={500} alt="Search Icon" />
        </Stack>
        <BeforeAfterResults />
      </Container>
    </div>
  );
}

export default page;
