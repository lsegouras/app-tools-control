import React from "react";
import "./Mechanics.css";
import RegisterForm from "../components/RegisterForm";

function Mechanics() {
  return (
    <div className="mechanics">
      <h1>Mechanics</h1>
      <div className="mechanicForm">
        <RegisterForm />
      </div>
    </div>
  );
}

export default Mechanics;
