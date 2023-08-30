import * as Yup from "yup";

const forgotPasswordSchema = Yup.object({
  email: Yup.string().email().required("Please enter email"),
});

export { forgotPasswordSchema };
