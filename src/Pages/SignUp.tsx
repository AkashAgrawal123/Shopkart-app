import React, { useRef, useState } from "react";
import "../Styles/SignUp.scss";
import {
  Box,
  Grid,
  TextField,
  Typography,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Button,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

// formik
import { Formik } from "formik";
import { signUpSchema } from "../Schema/SignupSchema";

const schema = signUpSchema;

// snackbar
import { useSnackbar } from "../Contexts/SnackbarProvider";
import useProductStore from "../Store/ProductStore";

const SignUp = () => {
  // variables
  const navigate = useNavigate();

  // hooks
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  // snackbar context
  const snackbar = useSnackbar();

  // password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="signup">
        <div className="signup__wrapper">
          <Grid container component="main" sx={{ height: "100vh" }}>
            <Formik
              validationSchema={schema}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={async (values) => {
                try {
                  setIsLoading(true);
                  if (
                    firstNameRef.current &&
                    lastNameRef.current &&
                    emailRef.current &&
                    passwordRef.current &&
                    confirmPasswordRef.current
                  ) {
                    await signup(
                      emailRef.current.value,
                      passwordRef.current.value
                    );

                    useProductStore.getState().setFirstName(values.firstName);
                    useProductStore.getState().setLastName(values.lastName);
                    
                    navigate("/");
                    snackbar.success("Sign up successfully");
                  }
                } catch {
                  console.log("Error");
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
                <Box sx={{ flexGrow: 1 }}>
                  <div className="signup__wrapper-logo">
                    <img
                      src="/appImages/imageLogo.svg"
                      className="signup__wrapper-logo-image"
                    />
                  </div>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                  <Box
                    component="form"
                    sx={{ "& .MuiTextField-root": { width: "400px" } }}
                    noValidate
                    autoComplete="on"
                    onSubmit={handleSubmit}
                    className="signup__wrapper-form"
                  >
                    <div className="signup__wrapper-firstname">
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        inputRef={firstNameRef}
                        id="firstName"
                        label="First name"
                        type="text"
                        name="firstName"
                        autoComplete="family-name"
                        autoFocus
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="firstName-error">
                        {errors.firstName &&
                          touched.firstName &&
                          errors.firstName}
                      </p>
                    </div>
                    <div className="signup__wrapper-lastname">
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last name"
                        inputRef={lastNameRef}
                        type="text"
                        name="lastName"
                        autoComplete="family-name"
                        autoFocus
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="lastName-error">
                        {errors.lastName && touched.lastName && errors.lastName}
                      </p>
                    </div>
                    <div className="signup__wrapper-email">
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        inputRef={emailRef}
                        name="email"
                        autoComplete="family-name"
                        autoFocus
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="email-error">
                        {errors.email && touched.email && errors.email}
                      </p>
                    </div>
                    <div className="signup__wrapper-password">
                      <FormControl
                        sx={{ m: 1, width: "400px" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password*
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          inputRef={passwordRef}
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="password"
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
                    <div className="signup__wrapper-confirm-password">
                      <FormControl
                        sx={{ m: 1, width: "400px" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Confirm Password*
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showConfirmPassword ? "text" : "password"}
                          inputRef={confirmPasswordRef}
                          required
                          name="confirmPassword"
                          label="Confirm Password"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <p className="confirm-password-error">
                          {errors.confirmPassword &&
                            touched.confirmPassword &&
                            errors.confirmPassword}
                        </p>
                      </FormControl>
                    </div>
                    <div className="signup__wrapper-signup-button">
                      <LoadingButton
                        type="submit"
                        fullWidth
                        loading={isLoading}
                        loadingPosition="center"
                      >
                        Sign up
                      </LoadingButton>
                    </div>
                    <div className="signup__wrapper--signin-button">
                      <Link to="/login">
                        <Button fullWidth>
                          Already have an account? Log in
                        </Button>
                      </Link>
                    </div>
                  </Box>
                </Box>
              )}
            </Formik>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default SignUp;
