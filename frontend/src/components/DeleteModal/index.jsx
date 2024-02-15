import React from "react";
import ModalConfirm from "../ModalConfirm";

const DeleteModal = ({ modalState, closeModal, onSure }) => {
  return (
    <ModalConfirm
      isConfirm={modalState}
      onSure={onSure}
      onClose={closeModal}
      messages={"Apakah anda yakin ingin menghapus konten ini?"}
    />
  );
};

export default DeleteModal;
