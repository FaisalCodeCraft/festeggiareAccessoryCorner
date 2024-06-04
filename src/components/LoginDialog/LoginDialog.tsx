import React, { useContext, useEffect } from "react";
import { Dialog, IconButton, Slide } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LANDING_ROUTES, ROUTES } from "constants/contents/routes";

import { AuthContext } from "context/authContext";
import { Close } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";
import LoginForm from "components/LoginFom/LoginForm";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const LoginDialog = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    if (context?.isLoggedIn && context.user.role) {
      navigate(ROUTES.DASHBOARD.MANAGE_ADMIN);
      setIsOpen(false);
    } else if (context.user && !context.user.role) {
      navigate(LANDING_ROUTES.HOME_PAGE);
      setIsOpen(false);
    } else {
      console.log("something wrong");
    }
  }, [context?.isLoggedIn, context.user, navigate]);

  useEffect(() => {
    const checkIsloggedIn = async () => {
      const isLoggedIn = await context.isLoggedIn;
      if (isLoggedIn && isOpen) {
        setIsOpen(false);
      } else {
        setTimeout(() => {
          if (!isOpen) {
            setIsOpen(true);
          }
        },1000 * 6);
      }
    };
    checkIsloggedIn()
  }, [context.isLoggedIn,isOpen]);

 const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <IconButton
        sx={{
          position: "absolute",
          right: 0,
        }}
        onClick={handleClose}
        disableRipple
      >
        <Close color="error" />
      </IconButton>
      <LoginForm />
    </Dialog>
  );
};

export default LoginDialog;

export const inValidButton = {
  background: "lightPink",
  color: "black",
  padding: "10px 15px",
  fontFamily: "Inter",
  fontWeight: "500",
  fontSize: "16px",
  fontStyle: "normal",
  borderRadius: "50px",
  cursor: "pointer",
};
