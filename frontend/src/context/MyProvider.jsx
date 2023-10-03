import React, { useState } from "react";
import MyContext from "./MyContext";

function MyProvider(props) {
  const [fullName, setFullName] = useState("");

  const context = {
    setFullName,
    fullName,
  };
  return (
    <MyContext.Provider value={context}>{props.children}</MyContext.Provider>
  );
}

export default MyProvider;
