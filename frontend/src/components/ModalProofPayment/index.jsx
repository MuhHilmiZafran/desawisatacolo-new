import React, { useEffect } from "react";
import ImageViewer from "../ImageViewer";
import Modal from "../Modal";

const ModalProofPayment = ({ url, openModal, handleClose }) => {
  useEffect(() => {
    console.log(url);
  }, [url]);

  return (
    <Modal isOpen={openModal} onClose={handleClose} type={""}>
      <div className="sm:flex sm:items-start flex-col mx-auto text-center justify-center items-center">
        <div className="mt-3 flex flex-col text-center sm:mt-0 sm:ml-4 justify-center items-center">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            Bukti Pembayaran
          </h3>
          <div className="mt-2">
            {url && (
              <ImageViewer imageName={url} className={"w-[400px] h-[200px]"} />
            )}
          </div>
        </div>
        <div className="bg-gray-50 mx-auto py-3 sm:px-6 flex text-center items-center justify-center">
          <button
            type="button"
            onClick={handleClose}
            className="w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-primary text-base font-medium text-black hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark sm:w-auto sm:text-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalProofPayment;
