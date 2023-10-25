import { useRef, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../Styles/LoginPage.scss";
import {
  Box,
  Button,
  FilledInput,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";

// cookies
import {
  getCookie,
  removeCookie,
  setRememberMeCookies,
} from "../Utils/cookieUtils";

// snackbar
import { useSnackbar } from "../Contexts/SnackbarProvider";

// formik
import { Formik } from "formik";
import { loginSchema } from "../Schema/LoginSchema";

const schema = loginSchema;

const LoginPage = () => {
  // variables
  const navigate = useNavigate();

  // hooks
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // snackbar context
  const snackbar = useSnackbar();

  // password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="loginPage">
        <div className="loginPage__wrapper">
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
              initialValues={{
                email: getCookie("rememberEmail") || "",
                password: getCookie("rememberPassword") || "",
                rememberMe: false,
              }}
              onSubmit={async (values) => {
                try {
                  setIsLoading(true);
                  if (emailRef.current && passwordRef.current) {
                    await login(
                      emailRef.current.value,
                      passwordRef.current.value,
                    );

                    if (values.rememberMe) {
                      setRememberMeCookies(
                        values.email,
                        values.password,
                        values.rememberMe,
                      );
                    } else {
                      removeCookie("rememberEmail");
                      removeCookie("rememberPassword");
                    }
                    navigate("/");
                    snackbar.success("Logged in successfully");
                  }
                } catch {
                  setError("Invalid Username or Password");
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
                    <div className="loginPage__wrapper-logo">
                      <img
                        src="/appImages/imageLogo.svg"
                        className="loginPage__wrapper-logo-image"
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
                      className="loginPage__wrapper-form"
                    >
                      <div className="loginPage__wrapper-form--error-message">
                        {error && <span className="error-text">{error}</span>}
                      </div>
                      <div className="loginPage__wrapper-email">
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
                      <div className="loginPage__wrapper-password">
                        <FormControl sx={{ width: "400px" }} variant="filled">
                          <InputLabel htmlFor="filled-adornment-password">
                            Password*
                          </InputLabel>
                          <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            inputRef={passwordRef}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <p className="password-error">
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </p>
                        </FormControl>
                      </div>
                      <div className="loginPage__wrapper--forgot-password">
                        <Box>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="remember me"
                          />
                        </Box>
                        <Box>
                          <Link to="/forgot-password">Forgot password?</Link>
                        </Box>
                      </div>
                      <div className="loginPage__wrapper-signin-button">
                        <LoadingButton
                          type="submit"
                          fullWidth
                          loading={isLoading}
                          loadingPosition="center"
                        >
                          Sign in
                        </LoadingButton>
                      </div>
                      <div className="loginPage__wrapper--signup-button">
                        <Link to="/signup">
                          <Button fullWidth>
                            Don't have an account? Sign up
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

export default LoginPage;
