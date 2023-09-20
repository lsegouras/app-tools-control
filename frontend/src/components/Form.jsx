import axios from "axios";
import React, { useEffect, useRef } from "react";
import "./Form.css";
import { toast } from "react-toastify";

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const mechanic = ref.current;

      mechanic.fullName.value = onEdit.fullName;
      mechanic.cpf.value = onEdit.cpf;
      mechanic.login.value = onEdit.login;
      mechanic.password.value = onEdit.password;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mechanic = ref.current;

    if (
      !mechanic.fullName.value ||
      !mechanic.cpf.value ||
      !mechanic.login.value ||
      !mechanic.password.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          fullName: mechanic.fullName.value,
          cpf: mechanic.cpf.value,
          login: mechanic.login.value,
          password: mechanic.password.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          fullName: mechanic.fullName.value,
          cpf: mechanic.cpf.value,
          login: mechanic.login.value,
          password: mechanic.password.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    mechanic.fullName.value = "";
    mechanic.cpf.value = "";
    mechanic.login.value = "";
    mechanic.password.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} className="form">
      <label>Full Name: </label>
      <input name="fullName" type="text" />

      <label>CPF (NNN.NNN.NNN-NN): </label>
      <input name="cpf" type="text" />

      <label>Login: </label>
      <input name="login" type="text" />

      <label>Password: </label>
      <input name="password" type="text" />

      <button type="submit">SAVE</button>
    </form>
  );
};

export default Form;
