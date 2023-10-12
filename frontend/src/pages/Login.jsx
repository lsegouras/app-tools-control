import React, { useState } from "react";
import { Link } from "react-router-dom";
import { schema } from "./../components/schema";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState({});

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await schema.validate();
    console.log(user);
    const response = await fetch("http://localhost:3333/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);
    setData(data);
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

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Login (e-mail)
          <input type="text" onChange={handleLogin} value={data.login} />
        </label>
        <label>
          Password
          <input
            type="password"
            onChange={handlePassword}
            value={data.password}
          />
        </label>

        <button type="submit" onClick={handleSubmit}>
          Log In
        </button>
        {message ? <p>{message}</p> : ""}
      </form>
      <p>
        Not registered yet? Click <Link to="/registration">here!</Link>
      </p>
    </div>
  );
};

export default Login;
