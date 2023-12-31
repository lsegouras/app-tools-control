// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Loans from "./pages/Loans";
import Mechanics from "./pages/Mechanics";
// import Tools from "./pages/Tools";
import MyProvider from "./context/MyProvider";
import Registration from "./pages/Registration";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <>
      <MyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mechanics" element={<Mechanics />} />
            {/* <Route path="/tools" element={<Tools />} /> */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/loans" element={<Loans />} />

            {/* <Route
            path="/grid"
            element={
              <Grid
                setOnEdit={setOnEdit}
                mechanics={mechanics}
                tools={tools}
                loans={loans}
                setMechanics={setMechanics}
              />
            }
          />
          <Route
            path="/form"
            element={
              <Form
                onEdit={onEdit}
                setOnEdit={setOnEdit}
                getMechanics={getMechanics}
                getTools={getTools}
                getLoans={getLoans}
              />
            }
          /> */}
          </Routes>
        </BrowserRouter>
      </MyProvider>
    </>
  );
}

export default App;
