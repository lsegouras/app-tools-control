import React, { useState } from 'react'
import * as Style from "./styles"

function ToolForm() {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  function handleName(e) {
    setName(e.target.value)
  }

  function handleDescription(e) {
    setDescription(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      name,
      description,
      available:true
    }
    const response = await fetch("http://localhost:3333/tools", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
    });
    console.log(response);
  }

  return (
    <Style.Container>
      <Style.Label >
        <Style.LabelTitle>Name: </Style.LabelTitle>
        <Style.Input onChange={handleName} value={name} />
      </Style.Label>
      <Style.Label >
        <Style.LabelTitle>Description: </Style.LabelTitle>
        <Style.Input onChange={handleDescription} value={description}/>
      </Style.Label>
      <Style.Button type="Submit" onClick={handleSubmit}>Create Tool</Style.Button>
    </Style.Container>
  )
}

export default ToolForm