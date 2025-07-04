import { Stack, Typography, Box, Divider } from "@mui/material";
import cairoLogo from "../assets/images/Group 1488.png";
import footerImage from "../assets/images/Group 1486.png";
import googleStore from "../assets/images/Group 1499.png";
import appleStore from "../assets/images/Group 1500.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "100px 0",
        width: "100%",
        bottom: 0,
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "var(--main_color)",
          alignItems: "center",
          width: "100%",
          background: {
            xs: `var(--main_color)`, // Small screens: Only background color
            md: `url("${cairoLogo.src}"), url("${footerImage.src}"), var(--main_color)`, // Larger screens: Images + color
          },
          backgroundSize: {
            xs: "auto",
            md: "auto, auto",
          },
          backgroundRepeat: {
            xs: "no-repeat",
            md: "no-repeat, no-repeat",
          },
          backgroundPosition: {
            xs: "center",
            md: "left, right",
          },
        }}
      >
        <Stack sx={{ mx: "auto" }}>
          <Typography
            color="white"
            fontSize="26px"
            mt={4}
            fontWeight={500}
            textAlign={"center"}
            lineHeight={2}
          >
            قاموس القاهرة يربطك بجوهر اللغة العربية، مع أدوات مبتكرة للتطور
            اللغوي.
            <br /> جميع الحقوق محفوظة الي جامعه القاهره © 2025.
          </Typography>
          <Divider
            sx={{
              backgroundColor: "white",
              mt: 2,
              display: { xs: "none", sm: "initial" },
            }}
          />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
            mt={3}
          >
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <img src={cairoLogo.src} />
            </Box>
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems={"center"}
              spacing={2}
            >
              <Typography color="white" fontSize="26px" fontWeight={500}>
                لتثبيت تطبيق القاموس
              </Typography>
              <Link href="/coming-soon">
                <img src={googleStore.src} style={{ cursor: "pointer" }} />
              </Link>
              <Link href="/coming-soon">
                <img src={appleStore.src} style={{ cursor: "pointer" }} />
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </footer>
  );
}
