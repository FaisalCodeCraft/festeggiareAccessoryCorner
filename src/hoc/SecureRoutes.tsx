import { Box, CircularProgress, Typography } from "@mui/material";
import { COLORS } from "constants/contents/color";
import { LANDING_ROUTES } from "constants/contents/routes";
import { AuthContext } from "context/authContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const SecureRoutes = () => {
  const useAuthContext=useContext(AuthContext)

   
  
  if (useAuthContext.loading === true) {
    return <Box
      position={"absolute"}
      top={"50%"}
      left={"50%"}
      sx={{ transform: "translate(-50% , -50%)" }}
    >
      <CircularProgress  sx={{color:COLORS.pink.hotPink}}/>
      <Typography>Loading...</Typography>
    </Box>
  }

  return useAuthContext.isLoggedIn ? <Outlet /> : <Navigate to={LANDING_ROUTES.HOME_PAGE}/>;
};

export default SecureRoutes;
