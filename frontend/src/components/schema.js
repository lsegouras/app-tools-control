import * as yup from "yup";

export const schema = yup.object().shape({
  login: yup
    .string()
    .email("Invalid email!")
    .required("Error: It is necessary to fill in this field!")
    .lowercase(),
  password: yup
    .string()
    .required("Error: It is necessary to fill in this field!"),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password"), null], "The passwords must match!")
  //   .required("Error: It is necessary to fill in this field!"),
});
