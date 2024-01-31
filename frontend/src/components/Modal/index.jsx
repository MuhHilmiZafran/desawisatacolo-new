import React, { useState } from "react";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

const Modal = ({ isOpen, onClose, children, type }) => {
  const wrapperModal = useRef(null);

  useClickOutside(wrapperModal, onClose);

  if (!isOpen) return null;

  let paddingModal = "";
  let paddingContent = "";
  let layoutContent = "";

  if (type === "add" || type === "edit") {
    paddingModal = "px-[32px] py-[16px]";
    paddingContent = "p-[32px]";
    layoutContent = "flex-col";
  } else {
    paddingModal = "p-0";
  }

  return (
    <>
      {isOpen && (
        <div className="fixed w-[100vw] h-[100vh] z-10 inset-0 flex flex-col items-center overflow-auto">
          <div className="fixed bg-black opacity-50 w-[100vw] h-[100vh] inset-0"></div>
          <div
            className={`z-10 ${
              type === "link"
                ? "flex justify-center items-center h-full"
                : "my-10 "
            }`}
            ref={wrapperModal}
          >
            <div
              className={`bg-white w-[95vw] ${paddingModal} z-10 rounded-md shadow border-solid border-[1px] border-primaryBorder`}
            >
              <div className={`flex  ${layoutContent} ${paddingContent}`}>
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ModalTitle = ({ title }) => {
  return <h2 className="text-xl font-bold mb-4 mt-[8px]">{title}</h2>;
};

const ModalLeftSide = ({ children }) => {
  return <div className={`flex flex-col px-[16px] pt-[32px]`}>{children}</div>;
};

const ModalRightSide = ({ children }) => {
  return (
    <div className={`flex flex-col px-[16px] pt-[32px] w-full`}>{children}</div>
  );
};

Modal.Title = ModalTitle;
Modal.LeftSide = ModalLeftSide;
Modal.RightSide = ModalRightSide;

export default Modal;
