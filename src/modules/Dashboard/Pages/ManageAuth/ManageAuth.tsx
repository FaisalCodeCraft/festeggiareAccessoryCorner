import { Box } from "@mui/material";
import LoginForm from "components/LoginFom/LoginForm";
// import { COLORS } from 'constants/contents/color'

const ManageAuth = () => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box mt={2} p={1}>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default ManageAuth;
