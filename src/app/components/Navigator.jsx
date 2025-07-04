"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import Image from "next/image";
import Link from "next/link";
import contextSearch from "../assets/images/Group 20.png";
import beforeAfter from "../assets/images/Component 20.svg";
import search from "../assets/images/Group 19-2.png";
import voiceInteractive from "../assets/images/Group 1516.png";
import translation from "../assets/images/Group 1508.png";
import wordLifeCycle from "../assets/images/Group 1513.png";
import descriptionGeneration from "../assets/images/Group 21.png";
import wordBeforeAfter from "../../../public/assets/images/wordBeforeAfter.png";
import trainEngine from "../../../public/assets/images/train-engine.png";
import typography from "../../../public/assets/images/typography.png";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PAGES = [
  {
    image: contextSearch.src,
    title: "الكشاف السياقي",
    link: "/Collocations-Finder",
  },
  {
    image: beforeAfter.src,
    title: "المتصاحبات اللفظية",
    link: "/collocations",
  },
  {
    image: search.src,
    title: "بحث متقدم",
    link: "/advanced_search",
  },
  {
    image: descriptionGeneration.src,
    title: "التوليد المصطلحي",
    link: "/Terminology-Generation",
  },
  {
    image: voiceInteractive.src,
    title: "التفاعل الصوتي",
    link: "/speech-interaction",
  },
  {
    image: translation.src,
    title: "ترجمة",
    link: "/translation",
  },
  {
    image: wordBeforeAfter.src,
    title: "السوابق واللواحق",
    link: "/Word-Before-After",
  },
  {
    image: wordLifeCycle.src,
    title: "رحلة تطور الكلمات",
    link: "/semantic-journey",
  },
  {
    image: trainEngine.src,
    title: "لعبة القطار",
    link: "/Quiz-Game-Landing",
  },
  {
    image: typography.src,
    title: "تصحيح النصوص",
    link: "/Text-Correction",
  },
];

const HoverdStack = styled(Stack)(({ theme }) => ({
  position: "relative",
  alignItems: "center",
  height: "126px",
  padding: "10px 12px 16px",
  zIndex: 1,
  overflow: "visible",
  "&:after": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "2px",
    backgroundColor: "#E3E3E3",
    top: "100%",
  },
  // شكل منحني للداخل في الجانب الأيمن فقط عند hover
  "&:hover": {
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: "30px",
    borderBottomLeftRadius: "30px",
  },
  // عنص  ر وهمي لعمل انحناء خارجي في الجانب الأيسر
  "&:hover::before": {
    content: '""',
    position: "absolute",
    top: "-28%",
    right: "0", // يتحكم في مدى البروز للخارج
    width: "35px",
    height: "35px",
    boxShadow: "0 20px #eee",
    backgroundColor: "#fafafa",
    borderBottomRightRadius: "18px",
    zIndex: 0,
  },

  "&:hover::after": {
    content: '""',
    position: "absolute",
    bottom: "-28%",
    boxShadow: "0 -20px #eee",
    right: "0",
    width: "35px",
    height: "35px",
    backgroundColor: "#fafafa",
    borderTopRightRadius: "18px",
    zIndex: 0,
  },
}));
const ActiveStack = styled(Stack)(({ theme }) => ({
  position: "relative",
  alignItems: "center",
  height: "126px",
  padding: "10px 12px 16px",
  zIndex: 1,
  overflow: "visible",
  backgroundColor: "#fff",
  borderRadius: "20px 0 0 20px",
  "&:before": {
    content: '""',
    position: "absolute",
    top: "-28%",
    right: "0",
    width: "35px",
    height: "35px",
    boxShadow: "0 20px #fff",
    backgroundColor: "#fafafa",
    borderBottomRightRadius: "18px",
    zIndex: 0,
  },

  "&:after": {
    content: '""',
    position: "absolute",
    bottom: "-27.5%",
    boxShadow: "0 -20px #fff",
    right: "0",
    width: "35px",
    height: "35px",
    backgroundColor: "#fafafa",
    borderTopRightRadius: "18px",
    zIndex: 0,
  },
}));

function Navigator() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const [active, setActive] = useState(
    `/${pathname.split("/").filter(Boolean)[0]}`
  );
  useEffect(() => {
    setActive(`/${pathname.split("/").filter(Boolean)[0]}`);
  }, [pathname]);

  return (
    <Container fixed maxWidth="xl">
      {" "}
      <Stack sx={{ backgroundColor: "#fafafa", borderRadius: "16px" }}>
        {PAGES.map((page, index) => (
          <Link
            href={page.link}
            style={
              index === PAGES.length - 1
                ? { marginTop: "48px", marginBottom: "48px" }
                : { marginTop: "48px" }
            }
          >
            {active === page.link ? (
              <ActiveStack>
                <Box width="52px" height="52px">
                  <Image
                    src={page.image}
                    alt={page.title}
                    width={100}
                    height={100}
                    objectFit="contain"
                    style={{
                      marginBottom: "6px",
                    }}
                  />
                </Box>
                <Typography textAlign="center" zIndex={5}>
                  {page.title}
                </Typography>
              </ActiveStack>
            ) : (
              <HoverdStack>
                <Box width="52px" height="52px">
                  <Image
                    src={page.image}
                    alt={page.title}
                    width={100}
                    height={100}
                    objectFit="contain"
                    style={{
                      marginBottom: "6px",
                    }}
                  />
                </Box>
                <Typography textAlign="center" zIndex={5}>
                  {page.title}
                </Typography>
              </HoverdStack>
            )}
          </Link>
        ))}
      </Stack>
    </Container>
  );
}

export default Navigator;
