import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { schema } from "./../components/schema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import MyContext from "./../context/MyContext";

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:3333/admin", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
      login: formik.values.login,
      password: formik.values.password,
      }),
    });
    await response.json();
    navigate("/admin");
  };

  
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
    </div>
  );
};

export default AdminLogin;
