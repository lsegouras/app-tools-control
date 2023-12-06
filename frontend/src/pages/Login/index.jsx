import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { schema } from "../../components/schema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import * as Style from "./style"

const Login = () => {
  // const [login, setLogin] = useState("");
  // const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");
  const [data, setData] = useState({});

  const context = useContext(MyContext);

  const navigate = useNavigate();

  // const handleLogin = (e) => {
  //   setLogin(e.target.value);
  // };

  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleSubmit = async () => {
    // const user = await schema.validate();
    // console.log(user);
    const response = await fetch("http://localhost:3333/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        // login,
        // password,
        login: formik.values.login,
        password: formik.values.password,
      }),
    });
    const data = await response.json();
    console.log(data);
    setData(data);
    context.setFullName(data.fullName);
    navigate("/home");
  };

  // try {
  //   await schema.validateData({
  //     login,
  //     password,
  //   });
  //   return true;
  // } catch (err) {
  //   console.log(err);
  //   console.log(err.message);
  //   if (err.response) {
  //     setMessage(err.response.data.message);
  //   } else {
  //     setMessage("Error: Try again later!");
  //   }
  //   return false;
  // }

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  console.log(formik.values);
  return (
    <Style.Container>
      <Style.Title>Login</Style.Title>
      <Style.Form onSubmit={formik.handleSubmit}>
        <Style.Label>
          Login (e-mail)
          <Style.InputLogin
            type="text"
            name="login"
            onChange={formik.handleChange}
            value={formik.values.login}
            // helperText={formik.errors.login ? <p>{formik.errors.login}</p> : ""}
          />
          {formik.errors.login ? (
            <p style={{ color: "red" }}>{formik.errors.login}</p>
          ) : (
            ""
          )}
        </Style.Label>
        <Style.Label>
          Password
          <Style.InputLogin
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <Style.ErrorMessage>{formik.errors.password}</Style.ErrorMessage>
          ) : (
            ""
          )}
        </Style.Label>
        <Style.LoginBtn type="submit">Login</Style.LoginBtn>
      </Style.Form>
      <Style.RegisterLink>
        Not registered yet? Click <Link to="/registration">here!</Link>
      </Style.RegisterLink>
      <Style.AdminLink>
        Is Admin? Click <Link to="/admin-login">here!</Link>
      </Style.AdminLink>
    </Style.Container>
  );
};

export default Login;
