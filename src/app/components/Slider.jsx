"use client";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import StyledButton from "./StyledButton";
import Image from "next/image";
import Link from "next/link";
import contextSearch from "../assets/images/Group 20.png";
import beforeAfter from "../assets/images/Component 20.svg";
import search from "../assets/images/Group 19-2.png";
import voiceInteractive from "../assets/images/Group 1516.png";
import translation from "../assets/images/Group 1508.png";
import wordLifeCycle from "../assets/images/Group 1513.png";
import descriptionGeneration from "../assets/images/Group 21.png";
import trainEngine from "../../../public/assets/images/train-engine.png";
import typography from "../../../public/assets/images/typography.png";
import wordBeforeAfter from "../../../public/assets/images/wordBeforeAfter.png";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
function Slider() {
  const slides = [
    {
      image: contextSearch.src,
      title: "الكشاف السياقي",
      link: "/Contextual-Explorer",
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
      image: wordBeforeAfter.src,
      title: "السوابق واللواحق",
      link: "/Word-Before-After",
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

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{
        delay: 2000, // Time in milliseconds
        disableOnInteraction: false,
        speed: 500, // Transition speed in milliseconds (slower transition)
      }}
      loop={true}
      spaceBetween={20}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 3,
        },
        1440: {
          slidesPerView: 3,
        },
      }}
      style={{
        width: "100%",
        maxWidth: "1440px",
        margin: "40px auto",
        padding: "25px 0",
        display: "flex",
        justifyContent: "center",
        backdropFilter: "blur(10px)",
        height: "500px",
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            backgroundColor: "#fff",
            padding: "40px 0",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s",
            // transform: `translateY(${index * 10}px)`,
            height: "300px",
          }}
          // onMouseEnter={(e) => {
          //   e.currentTarget.style.transform = "scale(1.05)";
          // }}
          // onMouseLeave={(e) => {
          //   e.currentTarget.style.transform = "scale(1)";
          // }}
        >
          <div style={{ marginBottom: "15px" }}>
            <Image
              src={slide.image}
              alt={slide.title}
              width={100}
              height={100}
              objectFit="contain"
              style={{
                marginBottom: "10px",
              }}
            />
          </div>
          <h3
            style={{
              fontSize: "22px",
              fontWeight: "700",
              marginBottom: "30px",
              color: "var(--main_color)",
            }}
          >
            {slide.title}
          </h3>
          <Link href={slide.link}>
            <StyledButton siE="medium">عرض التفاصيل</StyledButton>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
