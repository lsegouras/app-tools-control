import React from "react";
import homeImg from "../assets/HomePicture.jpg";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Mechanic Tools Control System</h1>
      <img src={homeImg} alt="tools img" />
    </div>
  );
}

export default Home;
