import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function GetTool() {
  const [data, setData] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (id) => {
    try {
      const response = await fetch(`http:localhost:3333/tools/${id}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log("Error fatching data:", error);
    }
  };

  return (
    <div>
      <h2>Tool's Details</h2>
      {data.map((item) => (
        <div key={data.id}>
          <span>Tool Name: {item.id}</span> <br />
          <span>Tool Name: {item.name}</span> <br />
          <span>Tool Description: {item.description}</span>
          <span>Tool Description: {item.status}</span>
          <button href={"/tools"}>Return to Tools</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default GetTool;
