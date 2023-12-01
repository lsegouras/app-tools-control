import * as yup from "yup";

export const schemaRegister = yup.object().shape({
  login: yup
    .string()
    .email("Invalid email!")
    .required("Error: It is necessary to fill the email!")
    .lowercase(),
  password: yup
    .string()
    .required("Error: It is necessary to fill the password!"),
  fullName: yup
    .string()
    .required("Error: It is necessary to fill the fullname!"),
  cpf: yup.string().required("Error: It is necessary to fill the cpf!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "The passwords must match!")
    .required("Error: It is necessary to fill in this field!"),
});
