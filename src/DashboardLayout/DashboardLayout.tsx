import React, { useState } from "react";
import Box from "@mui/system/Box";
import { Container, IconButton } from "@mui/material";
import SideBar from "./components/SideBar/SideBar";
import MenuIcon from "@mui/icons-material/Menu";
import NavBar from "./components/Navbar/Navbar";

const DashboardLayout = (props:any) => {
  const { children, title , buttonClick} = props || {};
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const handleSideBar = () => setIsSideBarOpen(!isSideBarOpen);
  return (
    <Box position={"relative"} display="flex" width={"100%"}>
      <Box
        component="nav"
        sx={{ width: { md: 250, sm: 200 }, flexShrink: { md: 1, sm: 0 } }}
      >
        <SideBar open={isSideBarOpen} onClose={handleSideBar} />
      </Box>

      <Box sx={{ position: "absolute", display: { sm: "none", xs: "block" } }}>
        <IconButton
          color="secondary"
          aria-label="open sidebar"
          onClick={handleSideBar}
        >
          <MenuIcon
            sx={{
              width: "30px",
              height: "30px",
              color: "white",
              bgcolor: "black",
              borderRadius: "5px",
            }}
          />
        </IconButton>
      </Box>

      <Box width={"100%"} pl={{ md: 3 }}>
        <Container maxWidth="lg">
          <NavBar
           title={title} 
           buttonClick={buttonClick}
           />
          <Box>{children}</Box>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
