import { useRef, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/ForgotPassword.scss";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

// snackbar
import { useSnackbar } from "../Contexts/SnackbarProvider";

// formik
import { Formik } from "formik";
import { forgotPasswordSchema } from "../Schema/ForgotPassword";

const schema = forgotPasswordSchema;

const ForgotPassword = () => {
  // hooks
  const emailRef = useRef<HTMLInputElement | null>(null);
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // snackbar context
  const snackbar = useSnackbar();

  // functions
  const handleClickLoginButton = () => {
    snackbar.success("Login button clicked");
  };

  return (
    <>
      <div className="forgot-password">
        <div className="forgot-password__wrapper">
          <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: "url(/appImages/startup.svg)",
                backgroundRepeat: "no-repeat",
                bgcolor: "background.default",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Formik
              validationSchema={schema}
              initialValues={{ email: "" }}
              onSubmit={async (values) => {
                try {
                  setMessage("");
                  setIsLoading(true);
                  if (emailRef.current) {
                    await resetPassword(emailRef.current.value);
                    setMessage("Check your inbox for further instructions");
                    snackbar.success("Link successfully sent to your email");
                  }
                } catch {
                  snackbar.error("Something went wrong");
                }
                setIsLoading(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Grid item xs={12} sm={8} md={5} component={Paper} square>
                  <Box sx={{ flexGrow: 1 }}>
                    <div className="forgot-password__wrapper-logo">
                      <img
                        src="/appImages/imageLogo.svg"
                        className="forgot-password__wrapper-logo-image"
                      />
                    </div>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <Box
                      component="form"
                      sx={{ "& .MuiTextField-root": { width: "400px" } }}
                      noValidate
                      autoComplete="on"
                      onSubmit={handleSubmit}
                      className="forgot-password__wrapper-form"
                    >
                      <div className="forgot-password__wrapper-form--success-message">
                        {message && (
                          <span className="message-text">{message}</span>
                        )}
                      </div>
                      <div className="forgot-password__wrapper-email">
                        <TextField
                          required
                          id="outlined-required"
                          label="Email"
                          type="email"
                          inputRef={emailRef}
                          variant="filled"
                          fullWidth
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <p className="email-error">
                          {errors.email && touched.email && errors.email}
                        </p>
                      </div>

                      <div className="forgot-password__wrapper-reset-button">
                        <LoadingButton
                          type="submit"
                          fullWidth
                          loading={isLoading}
                          loadingPosition="center"
                        >
                          Reset Password
                        </LoadingButton>
                      </div>
                      <div className="forgot-password__wrapper--signin-button">
                        <Link to="/login">
                          <Button
                            onClick={() => handleClickLoginButton()}
                            fullWidth
                          >
                            Login
                          </Button>
                        </Link>
                      </div>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Formik>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
