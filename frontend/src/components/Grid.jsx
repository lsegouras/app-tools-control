import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Grid = ({ mechanics, tools, loans, setMechanics, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:3333/mechanics" + id)
      .then(({ data }) => {
        const newArray = mechanics.filter((mechanic) => mechanic.id !== id);

        setMechanics(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <table className="table">
      <thead>
        <tr>Full Name</tr>
        <tr>CPF</tr>
        <tr>Login</tr>
      </thead>
      <tBody>
        {mechanics.map((item, i) => (
          <tr key={i}>
            <td>{item.fullName}</td>
            <td>{item.cpf}</td>
            <td>{item.login}</td>
            <td>
              <FaEdit onClick={() => handleEdit(item.id)} />
            </td>
            <td>
              <FaTrash onClick={() => handleDelete(item.id)} />
            </td>
          </tr>
        ))}
      </tBody>
    </table>
  );
};

export default Grid;
