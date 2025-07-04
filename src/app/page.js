import { Container, Divider, Stack } from "@mui/material";
import Image from "next/image";
import bg from "./assets/images/Group 19.png";
import discover_icon from "./assets/images/Group 31.svg";
import tools_icon from "./assets/images/Group 32.svg";
import features_icon from "./assets/images/Group 40.svg";
import cardImage from "./assets/images/23504_2.png";
import heroImage from "./assets/images/Charts_Freepik 1.png";
import tools_card from "./assets/images/Group 51.png";
import words_card from "./assets/images/Group 1485.png";
import sentence_card from "./assets/images/Group 47.png";
import styles from "./home.module.css";
import Link from "next/link";
import Features from "./components/Features";
import Slider from "./components/Slider";
import Footer from "./components/Footer";

// Setup the Intersection Observer hook

// Animation variants

function page() {
  return (
    <>
      <Stack
        sx={{
          backgroundImage: `url("${bg.src}")`,
          backgroundSize: "cover", // Makes the image cover the entire background
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          backgroundPosition: "center", // Centers the image
          padding: "20px 0 0 0", // Adds spacing inside the Stack
          height: "95vh",
        }}
      >
        <Container fixed sx={{ position: "relative", height: "75vh" }}>
          <Stack component="nav">
            <ul
              style={{
                display: "flex",
                gap: "50px",
                listStyleType: "none",
                alignItems: "center",
                padding: "0",
                color: "var(--white)",
                fontWeight: "bold",
                fontSize: "28px",
                flexWrap: "wrap",
              }}
            >
              <li style={{ cursor: "pointer" }}>الرئيسية</li>
              <a href="#tools">
                <li style={{ cursor: "pointer" }}>ادواتنا</li>
              </a>
              <a href="#aboutus">
                <li style={{ cursor: "pointer" }}>عنّا</li>
              </a>
              <a href="#footer">
                <li style={{ cursor: "pointer" }}>تواصل بنا</li>
              </a>
            </ul>
          </Stack>
          <Stack
            direction="row"
            position="absolute"
            justifyContent={{ xs: "center", lg: "space-between" }}
            width="100%"
            top="100%"
            right="0"
            transform="translate(-50%, -50%)"
            sx={{ color: "var(--black)" }}
          >
            <Link href="/discover">
              {" "}
              <Stack
                alignItems="center"
                sx={{
                  backgroundColor: "var(--white)",
                  padding: "30px 80px",
                  borderRadius: "16px",
                  boxShadow: "1px 1px 11px -4px",
                  cursor: "pointer",
                }}
              >
                <Image src={discover_icon} alt="Discover" />
                <p
                  style={{
                    marginTop: "25px",
                    fontWeight: "bold",
                    fontSize: "28px",
                  }}
                >
                  ابحث في القاموس
                </p>
              </Stack>
            </Link>

            <Stack sx={{ display: { xs: "none", lg: "flex" } }}>
              <a href="#tools">
                {" "}
                <Stack
                  alignItems="center"
                  sx={{
                    backgroundColor: "var(--white)",
                    padding: "30px 80px",
                    borderRadius: "16px",
                    boxShadow: "1px 1px 11px -4px",
                  }}
                >
                  <Image src={tools_icon} alt="Discover" />
                  <p
                    style={{
                      marginTop: "25px",
                      fontWeight: "bold",
                      fontSize: "28px",
                    }}
                  >
                    أدوات ووظائف القاموس
                  </p>
                </Stack>
              </a>
            </Stack>
            <Stack sx={{ display: { xs: "none", lg: "flex" } }}>
              <a href="#aboutus">
                {" "}
                <Stack
                  alignItems="center"
                  sx={{
                    backgroundColor: "var(--white)",
                    padding: "30px 80px",
                    borderRadius: "16px",
                    boxShadow: "1px 1px 11px -4px",
                  }}
                >
                  <Image src={features_icon} alt="Discover" />
                  <p
                    style={{
                      marginTop: "25px",
                      fontWeight: "bold",
                      fontSize: "28px",
                    }}
                  >
                    المزايا
                  </p>
                </Stack>
              </a>
            </Stack>
          </Stack>
        </Container>
      </Stack>
      <Container sx={{ my: 30 }} fixed>
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          justifyContent="space-between"
          width="100%"
          alignItems="center"
          boxShadow="1px 1px 11px -4px"
          padding="20px 40px"
          borderRadius="12px"
          mb={15}
          spacing={5}
          className={styles.card}
        >
          <Stack>
            <h2
              style={{
                color: "var(--main_color)",
                marginBottom: "24px",
                fontSize: "30px",
                fontWeight: "700",
              }}
            >
              ما الذى تقدمه المنصة؟
            </h2>
            <p style={{ fontSize: "20px" }}>
              قاموس القاهرة يجمع بين الدقة الأكاديمية والابتكار التكنولوجي، حيث
              توفر أداة قوية للطلاب والباحثين لفهم وتحليل وترجمة المفردات
              والمصطلحات.
            </p>
          </Stack>

          <Image src={cardImage} />
        </Stack>
        <Features />
        <h2
          id="tools"
          style={{
            textAlign: "center",
            marginTop: "100px",
            fontSize: "34px",
            fontWeight: "bold",
            color: "var(--main_color)",
          }}
        >
          أدوات ووظائف القاموس
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          استكشف ثراء لغتنا وثقافتنا عبر تقنيات حديثة مصممة لدعم التعليم والبحث
          العلمي.
        </p>
        <Slider />
        <h2
          id="aboutus"
          style={{
            textAlign: "center",
            marginTop: "100px",
            fontSize: "34px",
            fontWeight: "bold",
            color: "var(--main_color)",
            marginBottom: "60px",
          }}
        >
          معلومات إحصائية
        </h2>
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          justifyContent="space-between"
          spacing={8}
        >
          <Stack flex="1" spacing={3}>
            <Stack
              direction={{ sm: "column-reverse", md: "row" }}
              alignItems="center"
              boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
              borderRadius="12px"
              width="100%"
              className={styles.cardTools}
              padding="20px 15px"
              spacing={2}
            >
              <Image src={tools_card} alt="" />{" "}
              <Stack width="70%">
                <h2
                  style={{
                    fontWeight: "700",
                    fontSize: "32px",
                    color: "var(--main_color)",
                  }}
                >
                  <span style={{ display: "block", marginBottom: "-8px" }}>
                    10
                  </span>
                  أدوات مميزة
                </h2>
                <Divider sx={{ my: 1 }} />
                <p style={{ fontWeight: "500", fontSize: "22px" }}>
                  مصممة لتبسيط تجربتك
                </p>
              </Stack>
            </Stack>
            <Stack
              direction={{ sm: "column-reverse", md: "row" }}
              alignItems="center"
              boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
              borderRadius="12px"
              width="100%"
              className={styles.card}
              sx={{ transform: "translateX(-25px)" }}
              padding="20px 15px"
            >
              <Stack width="70%" ml={5} mr={2}>
                <h2
                  style={{
                    fontWeight: "700",
                    fontSize: "32px",
                    color: "var(--main_color)",
                  }}
                >
                  {/* 1.5 */}
                  <span style={{ display: "block", marginBottom: "-8px" }}>
                    مليون مدخل
                  </span>
                </h2>
                <Divider sx={{ my: 1 }} />
                <p style={{ fontWeight: "500", fontSize: "22px" }}>
                  مستودع ضخم ومتجدد من الكلمات يُثري رحلتك اللغوية
                </p>
              </Stack>
              <Image src={words_card} alt="" />
            </Stack>
            <Stack
              direction={{ sm: "column-reverse", md: "row" }}
              alignItems="center"
              boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
              borderRadius="12px"
              width="100%"
              className={styles.cardTools}
              padding="20px 15px"
              spacing={2}
            >
              <Image src={sentence_card} alt="" />{" "}
              <Stack width="70%">
                <h2
                  style={{
                    fontWeight: "700",
                    fontSize: "32px",
                    color: "var(--main_color)",
                  }}
                >
                  <span style={{ display: "block", marginBottom: "-8px" }}>
                    عدد ضخم من الأمثلة السياقية المتنوعة
                  </span>
                  {/* مليون جملة نصية */}
                </h2>
                <Divider sx={{ my: 1 }} />
                <p style={{ fontWeight: "500", fontSize: "22px" }}>
                  آلاف الجمل أمثلة عملية لتوضيح المعاني والسياقات المختلفة
                </p>
              </Stack>
            </Stack>
          </Stack>
          <Image src={heroImage} />
        </Stack>
      </Container>
      <Footer />
    </>
  );
}

export default page;
