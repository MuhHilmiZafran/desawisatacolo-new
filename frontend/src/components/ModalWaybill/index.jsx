import React, { useState } from "react";
import Modal from "../Modal";
import InputField from "../InputField";
import ButtonPrimary from "../ButtonPrimary";
import { useForm } from "react-hook-form";
import axios from "axios";

const ModalWaybill = ({ openModal, handleClose, orderId, updateData }) => {
  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState("success");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add this line to set initial form values
  } = useForm();

  const handlePopup = (type, message) => {
    setIsPopup(true);
    setPopupSuccess(type);
    setPopupMessage(message);
    setTimeout(function () {
      setIsPopup(false);
    }, 2000);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("no_resi", data.no_resi);

    try {
      const config = {
        method: "POST",
        baseURL: import.meta.env.VITE_API_BASE_URL,
        url: `/api/product-transactions/${orderId}/send-waybill`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };

      const response = await axios(config);

      if (response.status === 200) {
        // Handle success (redirect or show a success message)
        handlePopup(true, "Data Berhasil diubah");
        updateData();
        onClose(false); // Close the modal
      } else {
        // Handle unexpected response status
        handlePopup(false, "Unexpected response status: " + response.status);
        // }
      }
    } catch (error) {
      // Handle error (show an error message)
      console.error("Error updating data:", error);
      // handlePopup(false, "Error updating data");
    }
  };

  const onClose = () => {
    reset();
    handleClose(false);
  };

  return (
    <div>
      <Modal isOpen={openModal} onClose={handleClose} type={""}>
        <div className="sm:flex sm:items-start flex-col mx-auto text-center justify-center items-center">
          <div className="mt-3 flex flex-col text-center sm:mt-0 sm:ml-4 justify-center items-center">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Kirim Nomor Resi
            </h3>
            <div className="mt-2">
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  name="no_resi"
                  label="No. Resi"
                  type="text"
                  placeholder="Masukkan Judul Artikel"
                  errors={errors}
                  register={register}
                />
                <ButtonPrimary
                  className="w-full flex justify-center items-center bg-cyan-400 hover:bg-cyan-500"
                  type="submit"
                >
                  {" "}
                  <span className="text-[16px] font-medium text-white">
                    Kirim
                  </span>
                </ButtonPrimary>
              </form>
            </div>
          </div>
          <div className="bg-gray-50 mx-auto py-3 sm:px-6 flex text-center items-center justify-center">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-primary text-base font-medium text-black hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark sm:w-auto sm:text-sm"
            >
              Tutup
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalWaybill;
