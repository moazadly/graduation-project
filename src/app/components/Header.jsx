import { Stack, Typography } from "@mui/material";

export default function Header() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        color: "var(--white)",
        backgroundColor: "var(--secondary_color)",
        py: "10px",
      }}
      component="header"
    >
      <Typography
        sx={{
          fontSize: { xs: "16px", sm: "20px" },
          fontWeight: 500,
        }}
      >
        إطلاق تجريبي
      </Typography>
    </Stack>
  );
}
