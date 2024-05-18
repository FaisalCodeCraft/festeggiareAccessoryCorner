import React, { useContext, useEffect } from "react";
import Box from "@mui/system/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Snackbar } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LANDING_ROUTES, ROUTES } from "constants/contents/routes";
import { signInFormSchema } from "validation";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "config/firebase";
import { AuthContext } from "context/authContext";

const LoginForm = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(false);

  const [isError, setIsError] = React.useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signInFormSchema),
  });

  const formSubmitHandler = async (values: any) => {
    setIsLoading(true);
    // setTimeout(() => {
    //   navigate(ROUTES.DASHBOARD.MANAGE_ADMIN);
    // }, 2000);
try {
  const singIn = async () => {
    await signInWithEmailAndPassword(auth, values.email, values.password);
  };
  await singIn();
  setIsLoading(false);
  
} catch (error) {
  setIsError(true)
  setIsLoading(false)
  console.log(error)
}
  
  };

  const signinWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate(LANDING_ROUTES.HOME_PAGE)
  };
  const context = useContext(AuthContext);

  useEffect(() => {
    if (context?.isLoggedIn && context.user.role) {
      navigate(ROUTES.DASHBOARD.MANAGE_ADMIN);
    }
  }, [context?.isLoggedIn]);

  return (
    <React.Fragment>
      <Paper sx={{ p: 3, width: { md: "350px" } }}>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <Typography
            fontWeight={"500"}
            variant="h6"
            sx={{
              textAlign: "center",
              fontSize: { md: "1.4em", sm: "1.3em", xs: "1.2em" },
            }}
          >
            Sign In
          </Typography>

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                focused
                type="email"
                {...field}
                error={!!errors.email}
                helperText={errors?.email ? errors?.root?.message : ""}
                sx={{ mt: 2 }}
                {...register("email")}
                InputLabelProps={{
                  style: {
                    marginLeft: "2px",
                    fontWeight: "bold",
                    color: "black",
                  },
                }}
                label="Email"
                fullWidth
                color="secondary"
                variant="standard"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                focused
                error={!!errors.password}
                helperText={errors?.password ? errors?.root?.message : ""}
                {...field}
                type="password"
                sx={{ mt: 4 }}
                {...register("password")}
                InputLabelProps={{
                  style: {
                    marginLeft: "2px",
                    fontWeight: "bold",
                    color: "black",
                  },
                }}
                label="Password"
                fullWidth
                variant="standard"
                color="secondary"
              />
            )}
          />
          <Box mt={5}>
            <LoadingButton
              loading={!!isLoading}
              disabled={!!isLoading}
              type="submit"
              size="small"
              sx={!isValid ? inValidButton : loadingButton}
              fullWidth
            >
              Sign In
            </LoadingButton>
          </Box>
          <Box>
            <Typography sx={{ textAlign: "center", p: 1 }}>Or</Typography>
            <Button
              size="small"
              disableRipple
              sx={{
                color: "black",
                border: "1.5px solid black",
                borderRadius: "20px",
              }}
              fullWidth
              onClick={signinWithGoogle}
              startIcon={
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="GitHub"
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
              }
            >
              Continue with Google
            </Button>
            <Button
              disableRipple
              size="small"
              sx={{
                my: 1,
                color: "black",
                border: "1.5px solid black",
                borderRadius: "20px",
              }}
              fullWidth
              startIcon={
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  alt="GitHub"
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                />
              }
            >
              Continue with GitHub
            </Button>
          </Box>
        </form>
      </Paper>
      <Box>
        <Snackbar
          open={Boolean(isError)}
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity="error"
            variant="filled"
            sx={{ width: "100%", mt: "1%", mr: "5%" }}
            onClose={() => setIsError(false)}
          >
            Invalid Credentials
          </Alert>
        </Snackbar>
      </Box>
    </React.Fragment>
  );
};

export default LoginForm;

const loadingButton = {
  background: `linear-gradient(90deg, rgb(238,44,130) 0%, rgb(238,44,134) 6.25%, rgb(238,44,138) 12.5%, rgb(238,44,142) 18.75%, rgb(238,44,146) 25%, rgb(238,44,150) 31.25%, rgb(238,44,154) 37.5%, rgb(238,44,158) 43.75%, rgb(238,44,162) 50%, rgb(238,44,166) 56.25%, rgb(238,44,170) 62.5%, rgb(238,44,174) 68.75%, rgb(238,44,178) 75%, rgb(238,44,182) 81.25%, rgb(238,44,186) 87.5%, rgb(238,44,190) 93.75%, rgb(238,44,194) 100%)  `,
  color: "white",
  padding: "10px 15px",
  fontFamily: "Inter",
  fontWeight: "500",
  fontSize: "16px",
  fontStyle: "normal",
  borderRadius: "50px",
  cursor: "pointer",
};

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
