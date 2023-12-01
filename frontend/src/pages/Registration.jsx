import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "./../context/MyContext";
import { schemaRegister } from "./../components/schemaRegister";
import { useFormik } from "formik";

const Registration = () => {
  // const [data, setData] = useState({
  //   fullName: "",
  //   cpf: "",
  //   login: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // const valueInput = (e) =>
  //   setData({ ...data, [e.target.name]: e.target.value });

  const addMechanic = async () => {
    console.log("Enviar para a API");

    try {
      await fetch("http://localhost:3333/mechanics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        },
        body: JSON.stringify({
          // login,
          // password,
          login: formik.values.login,
          password: formik.values.password,
          cpf: formik.values.cpf,
          fullName: formik.values.fullName,
        }),
      });
    } catch (err) {
      console.log(err.response.data.message);
      if (err.response) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Error: Try again later!");
      }
    }
  };

  const handleSubmit = () => {
    addMechanic();
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      cpf: "",
      fullName: "",
      confirmPassword: "",
    },
    validationSchema: schemaRegister,
    onSubmit: handleSubmit,
  });

  console.log(formik.values);

  return (
    <div>
      <h1>Register New Mechanic</h1>

      <form onSubmit={formik.handleSubmit}>
        <label>
          Full Name:
          <input
            name="fullName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          {formik.errors.fullName ? (
            <p style={{ color: "red" }}>{formik.errors.fullName}</p>
          ) : (
            ""
          )}
        </label>

        <label>
          CPF (NNN.NNN.NNN-NN):
          <input
            name="cpf"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.cpf}
          />
          {formik.errors.cpf ? (
            <p style={{ color: "red" }}>{formik.errors.cpf}</p>
          ) : (
            ""
          )}
        </label>

        <label>
          Login:
          <input
            name="login"
            type="text"
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
          Password:
          <input
            name="password"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <p style={{ color: "red" }}>{formik.errors.password}</p>
          ) : (
            ""
          )}
        </label>

        <label>
          Confirm Password
          <input
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword ? (
            <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>
          ) : (
            ""
          )}
        </label>

        <button type="submit">Register</button>
        {message ? <p>{message}</p> : ""}
      </form>
    </div>
  );
};

export default Registration;
