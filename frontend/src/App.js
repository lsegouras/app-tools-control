import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Loans from "./pages/Loans";
import Mechanics from "./pages/Mechanics";
import Tools from "./pages/Tools";
import Grid from "./components/Grid";
import Form from "./components/Form";

function App() {
  const [mechanics, setMechanics] = useState([]);
  const [tools, setTools] = useState([]);
  const [loans, setLoans] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getMechanics = async () => {
    try {
      const res = await axios.get("http://localhost:3333/mechanics");
      setMechanics(res.data.sort((a, b) => (a.fullName > b.fullName ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getMechanics();
  }, [setMechanics]);

  const getTools = async () => {
    try {
      const res = await axios.get("http://localhost:3333/tools");
      setMechanics(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getTools();
  }, [setTools]);

  const getLoans = async () => {
    try {
      const res = await axios.get("http://localhost:3333/loans");
      setMechanics(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getLoans();
  }, [setLoans]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mechanics" element={<Mechanics Grid={Grid} />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/loans" element={<Loans />} />
          <Route
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
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
