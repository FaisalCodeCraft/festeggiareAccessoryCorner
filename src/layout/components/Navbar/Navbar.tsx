import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";
import { PersonAddAlt1Rounded, ShoppingBag } from "@mui/icons-material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LANDING_ROUTES, ROUTES } from "constants/contents/routes";
import { COLORS } from "constants/contents/color";
import ToggleMode from "components/ToggleMode/ToggleMode";
import CartModal from "components/CartModal/CartModal";
import { ThemeContext } from "context/themeContext";

const Navbar = () => {
  const { mode, key } = React.useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [bgColor, setBgColor] = React.useState(false);
  const [color, setColor] = React.useState(false);

  const { pathname } = useLocation();
  const navigate= useNavigate()

  const isSelectedProductUrl = pathname === LANDING_ROUTES.PRODUCTS_PAGE;

  const changeBgColor = () => {
    if (window.scrollY >= 5) {
      setBgColor(true);
    } else setBgColor(false);
  };
  window.addEventListener("scroll", changeBgColor);
  const changeColor = () => {
    if (window.scrollY >= 5) {
      setColor(true);
    } else setColor(false);
  };
  window.addEventListener("scroll", changeColor);

  const handleDrawerToggle = (e: any) =>
    setMobileOpen((prevState) => !prevState);

  const drawer = (
    // toggle for small screen
    <Box onClick={() => handleDrawerToggle} sx={{ textAlign: "center" }} px={3}>
      <List>
        <ListItem>
          <NavLink
            to="/home"
            style={({ isActive }: any) => {
              return isActive
                ? { color: COLORS.pink.hotPink, textDecoration: "none" }
                : {
                    color: "black",
                    textDecoration: "none",
                  };
            }}
          >
            Home
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            to="/about"
            style={({ isActive }: any) => {
              return isActive
                ? { color: COLORS.pink.hotPink, textDecoration: "none" }
                : {
                    color: "black",
                    textDecoration: "none",
                  };
            }}
          >
            About
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            to="/products"
            style={({ isActive }: any) => {
              return isActive
                ? { color: COLORS.pink.hotPink, textDecoration: "none" }
                : {
                    color: "black",
                    textDecoration: "none",
                  };
            }}
          >
            Products
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            to="/myOrders"
            style={({ isActive }: any) => {
              return isActive
                ? { color: COLORS.pink.hotPink, textDecoration: "none" }
                : {
                    color: "black",
                    textDecoration: "none",
                  };
            }}
          >
            My Order
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            to="/services"
            style={({ isActive }: any) => {
              return isActive
                ? { color: COLORS.pink.hotPink, textDecoration: "none" }
                : {
                    color: "black",
                    textDecoration: "none",
                  };
            }}
          >
            Services
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            to="/contact"
            style={({ isActive }: any) => {
              return isActive
                ? { color: COLORS.pink.hotPink, textDecoration: "none" }
                : {
                    color: "black",
                    textDecoration: "none",
                  };
            }}
          >
            Contact
          </NavLink>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box key={key}>
      <AppBar
        component="nav"
        sx={{
          transition: "all .3s ease",
          bgcolor:
            mode === "light" && bgColor
              ? "black"
              : mode === "dark" && bgColor
              ? "white"
              : isSelectedProductUrl
              ? "black"
              : "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between",alignItems:'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <List
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
            }}
          >
            <ListItem>
              <NavLink
                to={"/"}
                style={({ isActive }: any) => {
                  return isActive
                    ? { color: COLORS.pink.hotPink, textDecoration: "none" }
                    : {
                        color: color && mode === "dark" ? "black" : "white",
                        textDecoration: "none",
                      };
                }}
              >
                <Typography
                  fontWeight={700}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <ShoppingBag
                    sx={{
                      fontSize: "35px",
                      color: COLORS.pink.hotPink,
                    }}
                  />
                  ACCESSORY
                </Typography>
              </NavLink>
            </ListItem>
          </List>
          <List
            sx={{
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            <ListItem>
              <NavLink
                to={LANDING_ROUTES.HOME_PAGE}
                style={({ isActive }: any) => {
                  return isActive
                    ? { color: COLORS.pink.hotPink, textDecoration: "none" }
                    : {
                        color: color && mode === "dark" ? "black" : "white",
                        textDecoration: "none",
                      };
                }}
              >
                Home
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to={LANDING_ROUTES.ABOUT_PAGE}
                style={({ isActive }: any) => {
                  return isActive
                    ? { color: COLORS.pink.hotPink, textDecoration: "none" }
                    : {
                        color: color && mode === "dark" ? "black" : "white",
                        textDecoration: "none",
                      };
                }}
              >
                About
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to={LANDING_ROUTES.PRODUCTS_PAGE}
                style={({ isActive }: any) => {
                  return isActive
                    ? { color: COLORS.pink.hotPink, textDecoration: "none" }
                    : {
                        color: color && mode === "dark" ? "black" : "white",
                        textDecoration: "none",
                      };
                }}
              >
                Product
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to={LANDING_ROUTES.ORDER_PAGE}
                style={({ isActive }: any) => {
                  return isActive
                    ? { color: COLORS.pink.hotPink, textDecoration: "none" }
                    : {
                        color: color && mode === "dark" ? "black" : "white",
                        textDecoration: "none",
                      };
                }}
              >
                Order
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to="/DSD"
                style={({ isActive }: any) => {
                  return isActive
                    ? { color: COLORS.pink.hotPink, textDecoration: "none" }
                    : {
                        color: color && mode === "dark" ? "black" : "white",
                        textDecoration: "none",
                      };
                }}
              >
                Services
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink
                to="/ADS"
                style={({ isActive }: any) => {
                  return isActive
                    ? { color: COLORS.pink.hotPink, textDecoration: "none" }
                    : {
                        color: color && mode === "dark" ? "black" : "white",
                        textDecoration: "none",
                      };
                }}
              >
                Contact
              </NavLink>
            </ListItem>
            <ListItem>
              <ToggleMode color={color ? "true" : "false"} />
            </ListItem>
          </List>
          <Box display='flex' alignItems={'center'}>
            <IconButton
              onClick={()=>navigate(ROUTES.AUTH.SIGN_IN)}
            ><PersonAddAlt1Rounded sx={{color:'white'}}/></IconButton>
          <CartModal color={color ? "true" : "false"} />
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar />
    </Box>
  );
};
export default Navbar;

const drawerWidth = 200;
