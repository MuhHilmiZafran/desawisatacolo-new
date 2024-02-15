import React, { useRef } from "react";

import { Button } from "@mui/material";
import { useClickOutside } from "../../hooks/useClickOutside";

const ModalConfirm = ({ isConfirm, onClose, messages, onSure }) => {
  const wrapperModal = useRef(null);

  useClickOutside(wrapperModal, onClose);

  if (!isConfirm) return null;

  return (
    <div className="fixed w-[100vw] h-[100vh] z-10 inset-0 flex flex-col items-center overflow-auto">
      <div className="fixed bg-black opacity-50 w-[100vw] h-[100vh] inset-0"></div>
      <div className="m-auto z-10" ref={wrapperModal}>
        <div className="bg-white w-[372px] p-[32px] items-center flex flex-col rounded shadow-md border-solid border border-primaryBorder">
          <div className="py-[16px] px-[8px] mb-4">
            <p className="text-xl font-medium">{messages}</p>
          </div>
          <div className="flex flex-col gap-[16px] items-center w-full  font-medium">
            <Button className="w-full" onClick={onSure}>
              Ya
            </Button>
            <Button className="w-full" onClick={() => onClose(false)}>
              Tidak
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
