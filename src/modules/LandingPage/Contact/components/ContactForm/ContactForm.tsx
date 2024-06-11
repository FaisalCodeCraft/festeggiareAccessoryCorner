import React from "react";
import { Telegram } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { COLORS } from "constants/contents/color";
import { AuthContext } from "context/authContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/contents/routes";
import { useForm } from "react-hook-form";
import { addUserMessage } from "services/userMessage";
import { LoadingButton } from "@mui/lab";

const ContactForm = () => {
  const { isLoggedIn, user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleContact = (message: any) => {
    setIsLoading(true);
    addUserMessage(message, user);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        color: "white",
      }}
    >
      <Box
        component={"form"}
        sx={{ width: { md: "50%", sm: "70%", xs: "90%" } }}
        onSubmit={handleSubmit(handleContact)}
      >
        <TextField
          multiline
          rows={5}
          fullWidth
          sx={{ bgcolor: "white", mb: 2, borderRadius: 1 }}
          {...register("message")}
          placeholder="Enter your Feedback"
        />
        {isLoggedIn ? (
          <LoadingButton
            loading={!!isLoading}
            startIcon={<Telegram />}
            disabled={!!isLoading}
            type="submit"
            sx={{
              textAlign: "start",
              px: 5,
              bgcolor: COLORS.pink.hotPink,
              color: "white",
              "&:hover": { bgcolor: "pink", color: "black" },
            }}
          >
            Submit
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            onClick={() => navigate(ROUTES.AUTH.SIGN_IN)}
            type="submit"
            startIcon={<Telegram />}
            sx={{
              textAlign: "start",
              px: 5,
              bgcolor: COLORS.pink.hotPink,
              "&:hover": { bgcolor: "pink", color: "black" },
            }}
          >
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ContactForm;
