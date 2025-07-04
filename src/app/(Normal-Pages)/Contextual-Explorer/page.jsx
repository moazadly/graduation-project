import { Container, Stack } from "@mui/material";
import Image from "next/image";
import hero from "../../../../public/assets/images/collocations finder.png";
import Navigation from "../../components/Navigation";
import Search from "../../components/Search";
import dynamic from "next/dynamic";
import Navigator from "../../components/Navigator";

const CollocationsResult = dynamic(() =>
  import("../../components/CollocationsResult")
);
export const metadata = {
  title: "الكشاف السياقي - قاموس القاهرة",
  description:
    "استكشف السياقات المختلفة لكلمة معينة في الجمل والنصوص عبر أداة الكشاف السياقي. طريقة فعالة لتوسيع مفرداتك وفهم دقيق لاستخدام الكلمات في اللغة العربية.",
  keywords: ["الكشاف السياقي", "سياق الكلمات", "اللغة العربية", "تحليل النصوص"],
  alternates: {
    canonical: "https://cairo-dictionary-main.vercel.app/Collocations-Finder",
  },
  openGraph: {
    type: "website",
    url: "https://cairo-dictionary-main.vercel.app/Collocations-Finder",
    title: "الكشاف السياقي - قاموس القاهرة",
    description:
      "أداة تعليمية لتحليل الكلمة داخل السياقات المختلفة لفهم المعنى الدقيق والتراكيب الأكثر شيوعًا.",
    siteName: "قاموس القاهرة",
    images: [
      {
        url: "https://cairo-dictionary-main.vercel.app/logo.png",
        width: 800,
        height: 600,
        alt: "الكشاف السياقي - قاموس القاهرة",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "الكشاف السياقي - قاموس القاهرة",
    description:
      "افهم الكلمات بشكل أعمق من خلال تحليل سياقاتها المختلفة باستخدام أداة الكشاف السياقي.",
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
          mt={10}
          mb={8}
          alignItems="start"
          spacing={4}
        >
          <Stack
            direction={{ xs: "column", lg: "row" }}
            alignItems={"center"}
            spacing={24}
          >
            <Stack spacing={6}>
              <p className="text-3xl font-bold mb-12">
                الكشاف السياقي يوفر لك فهم الكلمه بشكل أفضل في سياقات مختفله!
              </p>
              <h5>
                ينتج عن هذه الأداة قائمة من الأمثله التي تتوسطها الكلمة مما يزيد
                فهم الكلمه بشكل اعمق في سياقات مختلفه و التعرف علي مختلف معانيها
                .
              </h5>
              <Search />
            </Stack>
            <Image src={hero} width={500} height={500} alt="Search Icon" />
          </Stack>
        </Stack>

        <CollocationsResult />
      </Container>
    </div>
  );
}

export default page;
