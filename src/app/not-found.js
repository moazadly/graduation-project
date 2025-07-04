import Link from "next/link";
import hero from "./assets/images/20602747_6330888.svg";
import Image from "next/image";
import { Stack } from "@mui/material";
function NotFound() {
  return (
    <main className="text-center space-y-6 bg-[#263238] h-[calc(100vh-50px)]">
      <Stack alignItems="center" color="white">
        <Image src={hero} />
        <h1 className="text-3xl font-semibold">لم نجد الصفحة!</h1>
        <Link
          href="/"
          className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg underline"
        >
          العوده الي الصفحة الرئيسيه
        </Link>
      </Stack>
    </main>
  );
}

export default NotFound;
