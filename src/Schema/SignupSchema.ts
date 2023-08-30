import * as Yup from "yup";

const signUpSchema = Yup.object({
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string().email().required("Please enter email"),
  password: Yup.string()
    .min(6, "Password must be at least 7 characters long")
    .required("Please enter password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "password should match"),
});

export { signUpSchema };
