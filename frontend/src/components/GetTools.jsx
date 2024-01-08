import { useState, useEffect } from "react";
import { GoTrash } from "react-icons/go";
import Modal from "./Modal";
import ToolForm from "./ToolForm";

function GetTools() {
  const [data, setData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false)

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

  const handleModal = () => {
    setIsOpenModal((currentState)=>!currentState)
  }

  return (
    <div>
      <h2>Tool's List</h2>
      <button type="button" onClick={handleModal}>Add New Tool</button>
      {data?.map((item) => (
        <div key={item.id}>
          <span>Tool Id: {item.id}</span> <br />
          <span>Tool Name: {item.name}</span> <br />
          <span>Tool Description: {item.description}</span>
          <span>Tool Status: {item.status}</span>
          <button onClick={() => handleDelete(item.id)}>
            <GoTrash />
          </button>
          <hr />
        </div>
      ))}

      <Modal title="Add Tool" handleModal={handleModal} isOpenModal={isOpenModal}>
        <ToolForm />
      </Modal >
    </div>
  );
}

export default GetTools;
