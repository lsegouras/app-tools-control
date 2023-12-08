import React from "react";
import * as Style from "./styles";
import { IoMdClose } from "react-icons/io";

function Modal(props) {
  return (
    <Style.Container isOpenModal={props.isOpenModal}>
      <Style.ModalContainer>
        <Style.Header>
          <Style.Title>{props.title}</Style.Title>
          <Style.IconCloseContainer onClick={()=>props.handleModal()}>
            <IoMdClose />
          </Style.IconCloseContainer>
        </Style.Header>
        <Style.Body>{props.children}</Style.Body>
      </Style.ModalContainer>
    </Style.Container>
  );
}

export default Modal;
