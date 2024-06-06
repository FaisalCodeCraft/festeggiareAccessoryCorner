import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import {
  EqualizerOutlined,
  LocalGroceryStoreOutlined,
  LogoutOutlined,
  Person2,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { Theme, createTheme } from "@mui/material";
import { ROUTES } from "constants/contents/routes";
import { COLORS } from "constants/contents/color";
import { useContext } from "react";
import { AuthContext } from "context/authContext";
import { auth } from "config/firebase";
import { signOut } from "firebase/auth";

declare module "@mui/material/styles" {
  interface Theme {
    MuiList?: {
      styleOverrides?: {
        root?: {
          "&.MuiList-sideBar-menu"?: {
            width?: number | string;
            minHeight?: number | string;
          };
        };
      };
    };
  }
}

// Create a theme
const theme: Theme = createTheme({
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          "&.MuiList-sideBar-menu": {
            width: 200,
            minHeight: "100vh",
          },
        },
      },
    },
  },
});
export const SideBar = (props: any) => {
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const isActiveAdminURL = pathname === ROUTES.DASHBOARD.MANAGE_ADMIN;
  const isActiveProductsURL = pathname === ROUTES.DASHBOARD.MANAGE_PRODUCTS;
  const isActiveProRecordsURL = pathname === ROUTES.DASHBOARD.PRODUCTS_RECORD;
  const isActiveOrderRecordsURL = pathname === ROUTES.DASHBOARD.ORDER_RECORDS;
  const isActiveAnalyticsURL = pathname === ROUTES.DASHBOARD.ANALYTICS;
  const useAuthContext = useContext(AuthContext);
  const { signout } = useAuthContext;

  
  const logout = async () => {
    try {
      await signOut(auth);
      signout();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Drawer variant={isSmUp ? "permanent" : "temporary"} {...props}>
      <List
        className="MuiList-sideBar-menu"
        sx={{ bgcolor: "black", height: "100vh", width: 230, color: "white" }}
      >
        <ListItem sx={{ textAlign: "center", my: 6 }}>
          <ListItemText
            primaryTypographyProps={{
              style: {
                fontSize: "1.5em",
                fontWeight: 800,
              },
            }}
          >
            <ListItemButton
              onClick={() => navigate(ROUTES.DASHBOARD.MANAGE_ADMIN)}
            >
              ACCESSORY
            </ListItemButton>
          </ListItemText>
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            borderRadius: "15px",
            width: "90%",
            mx: "auto",
            "&:hover": {
              bgcolor: COLORS.pink.hotPink,
              borderRadius: "15px",
            },
          }}
        >
          <ListItemButton
            disableGutters
            sx={{
              px: 1,
              borderRadius: "15px",
              "&.Mui-selected": {
                backgroundColor: COLORS.pink.hotPink,
              },
            }}
            selected={isActiveAdminURL}
            onClick={() => navigate(ROUTES.DASHBOARD.MANAGE_ADMIN)}
          >
            <ListItemIcon>
              <Person2
                sx={{
                  color: "white",
                }}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText>Admin</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            borderRadius: "15px",
            width: "90%",
            mx: "auto",
            my: 1,
            "&:hover": {
              bgcolor: COLORS.pink.hotPink,
              borderRadius: "15px",
            },
          }}
        >
          <ListItemButton
            disableGutters
            sx={{
              px: 1,
              borderRadius: "15px",

              "&.Mui-selected": {
                backgroundColor: COLORS.pink.hotPink,
              },
            }}
            selected={isActiveProductsURL}
            onClick={() => navigate(ROUTES.DASHBOARD.MANAGE_PRODUCTS)}
          >
            <ListItemIcon>
              <LocalGroceryStoreOutlined
                sx={{
                  color: "white",
                }}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText>Products</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            borderRadius: "15px",
            width: "90%",
            mx: "auto",
            mt: 0.5,
            "&:hover": {
              bgcolor: COLORS.pink.hotPink,
              borderRadius: "15px",
            },
          }}
        >
          <ListItemButton
            disableGutters
            sx={{
              px: 1,
              borderRadius: "15px",

              "&.Mui-selected": {
                backgroundColor: COLORS.pink.hotPink,
              },
            }}
            selected={isActiveProRecordsURL}
            onClick={() => navigate(ROUTES.DASHBOARD.PRODUCTS_RECORD)}
          >
            <ListItemIcon>
              <ReceiptLongOutlined
                sx={{
                  color: "white",
                }}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText>Products Record</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            borderRadius: "15px",
            width: "90%",
            mx: "auto",
            mt: 0.5,
            "&:hover": {
              bgcolor: COLORS.pink.hotPink,
              borderRadius: "15px",
            },
          }}
        >
          <ListItemButton
            disableGutters
            sx={{
              px: 1,
              borderRadius: "15px",

              "&.Mui-selected": {
                backgroundColor: COLORS.pink.hotPink,
              },
            }}
            selected={isActiveOrderRecordsURL}
            onClick={() => navigate(ROUTES.DASHBOARD.ORDER_RECORDS)}
          >
            <ListItemIcon>
              <ReceiptLongOutlined
                sx={{
                  color: "white",
                }}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText>Orders Records</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            borderRadius: "15px",
            width: "90%",
            mx: "auto",
            mt: 0.5,
            "&:hover": {
              bgcolor: COLORS.pink.hotPink,
              borderRadius: "15px",
            },
          }}
        >
          <ListItemButton
            disableGutters
            sx={{
              px: 1,
              borderRadius: "15px",

              "&.Mui-selected": {
                backgroundColor: COLORS.pink.hotPink,
              },
            }}
            selected={isActiveAnalyticsURL}
            onClick={() => navigate(ROUTES.DASHBOARD.ANALYTICS)}
          >
            <ListItemIcon>
              <EqualizerOutlined
                sx={{
                  color: "white",
                }}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText>Analytics</ListItemText>
          </ListItemButton>
        </ListItem>

        <Divider sx={{ mt: 4, backgroundColor: "white" }} />
        <ListItem
          disablePadding
          sx={{
            borderRadius: "15px",
            width: "90%",
            mx: "auto",
            mt: 2,
            "&:hover": {
              bgcolor: COLORS.pink.hotPink,
              borderRadius: "15px",
            },
          }}
        >
          <ListItemButton
            disableGutters
            sx={{
              px: 2,
              borderRadius: "15px",
              "&.Mui-selected": {
                backgroundColor: COLORS.pink.hotPink,
              },
            }}
            onClick={logout}
          >
            <ListItemIcon>
              <LogoutOutlined
                sx={{
                  color: "white",
                }}
                fontSize="small"
              />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
