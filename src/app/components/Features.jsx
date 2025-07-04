"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import library from "../assets/images/Group 10.png";
import tools from "../assets/images/Group 12.png";
import intrface from "../assets/images/Group 13.png";
import speach from "../assets/images/Group 16.png";
import Image from "next/image";
import { Grid2 } from "@mui/material";
function Features() {
  console.log(typeof useInView); // لازم يطبع "function"

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const slideInVariants = {
    hidden: { opacity: 0, x: 250 }, // Start off-screen to the right
    visible: { opacity: 1, x: 0 }, // Slide into view
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={slideInVariants}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <Grid2 container spacing={8} mb={30}>
        <Grid2 item size={12}>
          {" "}
          <h3
            style={{
              color: "var(--main_color)",
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            ما الذي يميزنا
          </h3>
        </Grid2>
        <Grid2
          item
          size={{ xs: 12, md: 6 }}
          boxShadow="1px 1px 11px -4px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding="40px"
          borderRadius="16px"
        >
          <Image src={library} alt="library"></Image>
          <h4
            style={{
              margin: "40px 0 20px 0",
              color: "var(--main_color)",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            مكتبة غنية ببيانات لغوية متنوعة
          </h4>
          <p
            style={{
              fontSize: "22px",
              textAlign: "center",
            }}
          >
            تحتوي على مجموعة ثرية من البيانات التي تغطي أزمنة ومجالات مختلفة
          </p>
        </Grid2>
        <Grid2
          item
          size={{ xs: 12, md: 6 }}
          boxShadow="1px 1px 11px -4px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding="40px"
          borderRadius="16px"
        >
          <Image src={tools} alt="library"></Image>
          <h4
            style={{
              margin: "40px 0 20px 0",
              color: "var(--main_color)",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            أدوات تحليل لغوية حديثة{" "}
          </h4>
          <p
            style={{
              fontSize: "22px",
              textAlign: "center",
            }}
          >
            تمكّنك من دراسة وتحليل الظواهر اللغوية <br /> بفعالية
          </p>
        </Grid2>
        <Grid2
          item
          size={{ xs: 12, md: 6 }}
          boxShadow="1px 1px 11px -4px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding="40px"
          borderRadius="16px"
        >
          <Image src={intrface} alt="easy intrface"></Image>
          <h4
            style={{
              margin: "40px 0 20px 0",
              color: "var(--main_color)",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            واجهة استخدام بسيطة وسلسة
          </h4>
          <p
            style={{
              fontSize: "22px",
              textAlign: "center",
            }}
          >
            مصممة لتناسب احتياجات جميع المستخدمين
          </p>
        </Grid2>
        <Grid2
          item
          size={{ xs: 12, md: 6 }}
          boxShadow="1px 1px 11px -4px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding="40px"
          borderRadius="16px"
        >
          <Image src={speach} alt="speach"></Image>
          <h4
            style={{
              margin: "40px 0 20px 0",
              color: "var(--main_color)",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            التعرف على الصوت والنطق
          </h4>
          <p
            style={{
              fontSize: "22px",
              textAlign: "center",
            }}
          >
            إمكانية نطق الكلمات مع خاصية التحقق من النطق الصحيح{" "}
          </p>
        </Grid2>
      </Grid2>
    </motion.div>
  );
}

export default Features;
