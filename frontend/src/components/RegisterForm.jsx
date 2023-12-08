import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../context/MyContext";
import axios from "axios";
import "./Form.css";

function RegisterForm() {
  const [data, setData] = useState({
    fullName: "",
    cpf: "",
    login: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [mechanics, setMechanics] = useState([]);
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");

  const context = useContext(MyContext);

  const navigate = useNavigate();

  // useEffect(() => {
  //   getMechanics();
  // }, []);

  // const getMechanics = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3333/mechanics");
  //     const data = await response.json();
  //     setMechanics(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //     setError(error);
  //   }
  // };
  // if (error) return "Sorry we are having problems to access the mechanics list";

  const valueInput = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const addMechanic = async (e) => {
    e.preventDefault();
    console.log("Enviar para a API");
    setFullName(data.fullName);

    // const headers = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    // await axios
    //   .post("http://localhost:3333/mechanics", data, headers)
    //   .then((response) => {
    //     setMessage("Mechanic successfully registered!");
    //     setData({
    //       fullname: "",
    //       cpf: "",
    //       login: "",
    //       password: "",
    //     });
    //     handleSubmit();
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data.message);
    //     if (err.response) {
    //       setMessage(err.response.data.message);
    //     } else {
    //       setMessage("Error: Try again later!");
    //     }
    //   });

    try {
      await fetch("http://localhost:3333/mechanics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const handleSubmit = () => {
    addMechanic();
    context.setFullName(fullName);
    navigate("/home");
  };

  return (
    <form className="form">
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

      <button type="submit" onClick={addMechanic}>
        Register
      </button>
      {message ? <p>{message}</p> : ""}

      {/* <button type="submit" onClick={deleteMechanic}>
        Delete
      </button>

      <button type="submit" onClick={editMechanic}>
        Edit
      </button> */}
    </form>
  );
}

export default RegisterForm;
