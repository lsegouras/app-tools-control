import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { schema } from "./../components/schema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import MyContext from "./../context/MyContext";

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
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Login (e-mail)
          <input
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
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <p style={{ color: "red" }}>{formik.errors.password}</p>
          ) : (
            ""
          )}
        </label>

        <button type="submit">Log In</button>
      </form>
      <p>
        Not registered yet? Click <Link to="/registration">here!</Link>
      </p>
    </div>
  );
};

export default Login;
