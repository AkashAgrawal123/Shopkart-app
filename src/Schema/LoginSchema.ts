import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter email"),
  password: Yup.string()
    .min(6, "Password must be at least 7 characters long")
    .required("Please enter password"),
});

export { loginSchema };
