import { Box } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box position={"relative"} display={"flex"} flexDirection={"column"}>
      <Box position={"absolute"} width={"100%"}>
        <Navbar />
      </Box>
      <Box>
        <Outlet />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
