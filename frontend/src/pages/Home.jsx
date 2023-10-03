import React, { useContext } from "react";
import MyContext from "../context/MyContext";
import homeImg from "../assets/HomePicture.jpg";
import "./Home.css";
import Sidebar from "./../components/Sidebar";

function Home() {
  const context = useContext(MyContext);

  return (
    <div className="home">
      <Sidebar />
      <h1>Mechanic Tools Control System</h1>
      <p>Olá {context.fullName}!</p>
      <img src={homeImg} alt="tools img" />
    </div>
  );
}

export default Home;
