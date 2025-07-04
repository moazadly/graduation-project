import { Box, Container, Stack } from "@mui/material";
import bgImage from "../assets/images/background.png";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/images/logo1.png";
export default function Navbar({ textColor = "var(--main_color)", homePage }) {
  return (
    !homePage && (
      <Stack
        component="nav"
        flexDirection="row"
        alignItems="center"
        sx={{
          fontSize: { xs: "18px", sm: "20px", md: "28px" },
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: {
            xs: "center",
            sm: "center",
            lg: "0px -100px",
          },
          padding: "16px 20px",
          borderRadius: "6px",
          margin: "20px 0px",
        }}
      >
        <Stack
          component={"ul"}
          direction={"row"}
          sx={{
            flexWrap: "wrap",
            width: "100%",
            gap: "35px",
            listStyleType: "none",
            alignItems: "center",
            color: textColor,
            fontWeight: "bold",
          }}
        >
          <li style={{ cursor: "pointer" }}>
            <Link href="/">الرئيسية</Link>
          </li>
          <Link href="/#tools">
            <li style={{ cursor: "pointer" }}>الأدوات </li>
          </Link>
          <Link href="/#aboutus">
            <li style={{ cursor: "pointer" }}>عن القاموس</li>
          </Link>
          <Link href="/#footer">
            <li style={{ cursor: "pointer" }}>تواصل معنا</li>
          </Link>
        </Stack>
        <Box width="160px">
          <Image src={logo} style={{ width: "100%", height: "100%" }} />
        </Box>
      </Stack>
    )
  );
}
