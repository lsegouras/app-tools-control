import React from "react";
import "./Mechanics.css";
import Form from "../components/Form";
import Grid from "../components/Grid";

function Mechanics() {
  const [mechanics, setMechanics] = useState([]);
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
