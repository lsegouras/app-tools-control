import React, { useState, useEffect } from "react";

function Tools() {
  const [tools, setTools] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTools();
  }, []);

  const getTools = async () => {
    try {
      const response = await fetch("http://localhost:3333/tools");
      const data = await response.json();
      setTools(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
    }
  };
  if (error) return "Sorry we are having problems to access the tools list";

  return (
    <div className="tools">
      <h1>Available Tools</h1>

      {tools.map((tool) => (
        <div key={tool.id}>
          <span>Tool Name: {tool.name}</span> <br />
          <span>Tool Description: {tool.description}</span>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Tools;
