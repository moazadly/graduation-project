import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import hero from "../../../../public/assets/images/terminology generation.png";
import Navigation from "../../components/Navigation";
import TermGenSearch from "../../components/TermGenSearch";

export const metadata = {
  title: "التوليد المصطلحي - قاموس القاهرة",
  description:
    "أدخل وصفًا أو جملة، واحصل على مصطلح عربي دقيق يعكس معناها باستخدام أداة التوليد المصطلحي الذكية في قاموس القاهرة. أداة مثالية للمترجمين والدارسين.",
  keywords: [
    "توليد المصطلحات",
    "مصطلحات عربية",
    "معالجة اللغة",
    "اللغة العربية",
  ],
  alternates: {
    canonical:
      "https://cairo-dictionary-main.vercel.app/Terminology-Generation",
  },
  openGraph: {
    type: "website",
    url: "https://cairo-dictionary-main.vercel.app/Terminology-Generation",
    title: "التوليد المصطلحي - قاموس القاهرة",
    description:
      "احصل على مصطلح عربي يعبر عن جملة أو وصف باستخدام الذكاء الاصطناعي في التوليد المصطلحي.",
    siteName: "قاموس القاهرة",
    images: [
      {
        url: "https://cairo-dictionary-main.vercel.app/logo.png",
        width: 800,
        height: 600,
        alt: "التوليد المصطلحي - قاموس القاهرة",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "التوليد المصطلحي - قاموس القاهرة",
    description:
      "أنشئ مصطلحات عربية دقيقة بناءً على وصف أو مفهوم عبر أداة التوليد المصطلحي الذكية.",
    images: ["https://cairo-dictionary-main.vercel.app/logo.png"],
  },
};

function page() {
  return (
    <div>
      <Container fixed sx={{ mt: 3, mb: 10 }} component={"main"} maxWidth="xl">
        <Navigation pageTitle="التوليد المصطلحي" />
        <Stack
          direction={{ xs: "column", lg: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={4}
          mb={8}
          width="98%"
        >
          <Stack spacing={6}>
            <p className="text-3xl font-bold mb-12">
              التوليد المصطلحي يساعدك في العثور على المصطلح الأنسب للجملة عندما
              تعجز عن تحديد مصطلح مناسب!
            </p>
            <Typography variant="h5">
              تساعد أداة التوليد المصطلحي المستخدم في الحصول على مصطلح معبّر
              ودقيق يعكس معنى الجملة التي يُدخلها. تعمل الأداة على تحليل محتوى
              الجملة واقتراح مصطلح مناسب يختصر الفكرة بوضوح، مما يسهم في تحسين
              الفهم والتواصل الفعّال.
            </Typography>
          </Stack>
          <Image
            src={hero}
            width={500}
            height={500}
            alt="Search Icon"
            className="w-30 h-30 lg:!ml-[-22px] xl:!ml-[-48px]"
          />
        </Stack>
        <TermGenSearch />
      </Container>
    </div>
  );
}

export default page;
