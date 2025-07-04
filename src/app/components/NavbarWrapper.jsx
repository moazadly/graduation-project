// components/NavbarWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return <Navbar textColor="white" homePage={isHomePage} />;
}
