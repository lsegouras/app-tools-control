import { useState, useEffect } from "react";
import { GoTrash } from "react-icons/go";

function GetTools() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3333/tools");
      const data = await response.json();
      console.log({ data });
      setData(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  async function handleDelete(id) {
    try {
      await fetch(`http://localhost:3333/tools/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        },
      });
      fetchData()
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  return (
    <div>
      <h2>Tool's List</h2>
      <button type="button">Add New Tool</button>
      {data?.map((item) => (
        <div key={item.id}>
          <span>Tool Name: {item.id}</span> <br />
          <span>Tool Name: {item.name}</span> <br />
          <span>Tool Description: {item.description}</span>
          <span>Tool Description: {item.status}</span>
          <button onClick={() => handleDelete(item.id)}>
            <GoTrash />
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default GetTools;
