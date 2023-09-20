import React from "react";
import "./Mechanics.css";
import Form from "../components/Form";
import Grid from "../components/Grid";

function Mechanics() {
  return (
    <div className="mechanics">
      <h1>Mechanics</h1>
      <div className="mechanicForm">
        <Form />
      </div>
      <div className="mechanicGrid">
        <Grid />
      </div>
    </div>
  );
}

export default Mechanics;
