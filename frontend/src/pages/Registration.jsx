import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "./../context/MyContext";

const Registration = () => {
  const [data, setData] = useState({
    fullName: "",
    cpf: "",
    login: "",
    password: "",
    confirmPassword: "",
  });

  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");

  const context = useContext(MyContext);

  const navigate = useNavigate();

  const valueInput = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const addMechanic = async () => {
    console.log("Enviar para a API");
    setFullName(data.fullName);

    try {
      await fetch("http://localhost:3333/mechanics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "origin",
          "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        },
        body: data,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    addMechanic();
    context.setFullName(fullName);
    navigate("/home");
  };

  return (
    <div>
      <h1>Register New Mechanic</h1>

      <form>
        <label>Full Name: </label>
        <input
          name="fullName"
          type="text"
          onChange={valueInput}
          value={data.fullName}
        />

        <label>CPF (NNN.NNN.NNN-NN): </label>
        <input name="cpf" type="text" onChange={valueInput} value={data.cpf} />

        <label>Login: </label>
        <input
          name="login"
          type="text"
          onChange={valueInput}
          value={data.login}
        />

        <label>Password: </label>
        <input
          name="password"
          type="text"
          onChange={valueInput}
          value={data.password}
        />

        <label>
          Confirm Password
          <input
            name="confirmPassword"
            type="password"
            onChange={valueInput}
            value={data.confirmPassword}
          />
        </label>

        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
        {message ? <p>{message}</p> : ""}
      </form>
    </div>
  );
};

export default Registration;
