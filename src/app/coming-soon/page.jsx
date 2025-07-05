import Link from "next/link";
import Image from "next/image";
import { Stack, Container } from "@mui/material";

function ComingSoon() {
  return (
    <main
      className="bg-white flex items-center justify-center overflow-hidden"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <Container maxWidth="lg">
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={4}
          sx={{
            height: "calc(100vh - 60px)",
            textAlign: "center",
          }}
        >
          <Image
            src="/assets/images/coming_soon3.png"
            alt="Coming Soon - Dictionary App"
            width={250}
            height={250}
            style={{
              borderRadius: "16px",
              objectFit: "contain",
              maxWidth: "100%",
              height: "auto",
            }}
          />

          <Stack spacing={2} alignItems="center">
            <h1 className="text-4xl font-bold text-gray-800">قريباً!</h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              تطبيق قاموس القاهرة قيد التطوير
            </p>
            <p className="text-base text-gray-500 max-w-md">
              نحن نعمل بجد لتقديم تجربة تعليمية مميزة لتعلم اللغة العربية
            </p>
          </Stack>

          <Link
            href="/"
            className="inline-block text-white px-6 py-3 text-lg font-semibold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            style={{
              backgroundColor: "#004f3f",
              ":hover": {
                backgroundColor: "#003d30",
              },
            }}
          >
            العوده الي الصفحة الرئيسيه
          </Link>
        </Stack>
      </Container>
    </main>
  );
}

export default ComingSoon;
