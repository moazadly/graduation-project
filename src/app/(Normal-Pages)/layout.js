import { ReduxProvider } from "../redux/provider";
import NavbarWrapper from "../components/NavbarWrapper";
import Footer from "../components/Footer";
import { Container, Grid2 } from "@mui/material";
import Navigator from "../components/Navigator";

export default function NormalPagesLayout({ children }) {
  return (
    <ReduxProvider>
      <Container fixed maxWidth="xl">
        <NavbarWrapper />
      </Container>
      <Grid2
        container
        direction="row"
        flexWrap="nowrap"
        spacing={2}
        mt={8}
        mb={10}
      >
        <Grid2 item xs={12} md={2}>
          <Navigator />
        </Grid2>
        <Grid2 item xs={12} md={8}>
          {children}
        </Grid2>
      </Grid2>
      <Footer />
    </ReduxProvider>
  );
}
