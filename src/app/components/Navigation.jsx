import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

function Navigation({ pageTitle }) {
  const breadcrumbs = [
    <Link key="1" color="inherit" href="./">
      <p key="2" style={{ fontSize: "20px", fontWeight: "bold" }}>
        الرئيسية
      </p>
    </Link>,
    <p
      key="2"
      style={{ color: "var(--black)", fontSize: "24px", fontWeight: "bold" }}
    >
      {pageTitle}
    </p>,
  ];
  return (
    <div>
      <Breadcrumbs
        separator={
          <span style={{ color: "#999", fontSize: "28px", margin: "0 8px" }}>
            ›
          </span>
        }
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
}

export default Navigation;
