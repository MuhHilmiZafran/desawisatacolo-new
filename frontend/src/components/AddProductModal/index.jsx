import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddRounded } from "@mui/icons-material";
import Modal from "../Modal";
import ButtonPrimary from "../ButtonPrimary";
import InputField from "../InputField";
import axios from "axios";
import ImageViewer from "../ImageViewer";
import Popup from "../Popup";

const AddProductModal = ({ openModal, onClose, updateData }) => {
  const [topics, setTopics] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState("success");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const handlePopup = (type, message) => {
    setIsPopup(true);
    setPopupSuccess(type);
    setPopupMessage(message);
    setTimeout(function () {
      setIsPopup(false);
    }, 2000);
  };

  const handleImageChange = (file) => {
    setSelectedImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    console.log(imagePreview);
  };

  const handleSelectTopic = () => {};

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("image", data.image[0]);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("amount", data.amount);

      console.log(data);

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // updateData();
      handlePopup(true, "Tambah Data Berhasil");
      reset();
      setSelectedImage(null);
      setImagePreview("");
      updateData();
    } catch (error) {
      // Handle error (show an error message)
      console.error("Error adding data:", error);
      handlePopup(false, "Tambah Data Gagal");
    }
  };

  const handleClose = () => {
    reset();
    setSelectedImage(null)
    setImagePreview('');
    onClose(false);
  };

  return (
    <>
      <Popup isSuccess={popupSuccess} isOpen={isPopup} message={popupMessage} />

      <Modal isOpen={openModal} onClose={handleClose} type={"add"}>
        <Modal.Title title={"Tambah Oleh-oleh"} />
        <div>
          <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-20">
              <div className="w-[600px]">
                <InputField
                  name="name"
                  label="name"
                  type="text"
                  placeholder="Ex : How to get women's right?"
                  errors={errors}
                  register={register}
                />
                <InputField
                  name="price"
                  label="Harga"
                  type="number"
                  placeholder="Ex : Ruby Jane"
                  errors={errors}
                  register={register}
                />
                <InputField
                  name="amount"
                  label="Qty"
                  type="number"
                  placeholder="Ex : Ruby Jane"
                  errors={errors}
                  register={register}
                />
                <label htmlFor="description">
                  Deskripsi
                  <textarea
                    {...register("description")}
                    className=" w-full py-2 px-2.5 border-[1px] border-slate-400 rounded-md"
                  />
                </label>
              </div>

              <div className="mb-5 flex flex-col gap-3">
                <label>
                  Image:
                  <br />
                  <input
                    type="file"
                    {...register("image")}
                    onChange={(event) =>
                      handleImageChange(event.target.files[0])
                    }
                  />
                </label>
                <div>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      className="w-[300px] h-[200px] object-cover object-center rounded"
                    />
                  )}
                </div>
              </div>
            </div>
            {/* <TextEditor label={'Description'} name={'description'} register={register} control={control} errors={errors} />
            <Dropdown control={control} name={'topic'} label={'Topic'} placeholder={'Choose article`s Topics'} handleSelect={handleSelectTopic} errors={errors}>
              {topics?.map((topic) => (
                <option label={topic.name} value={topic.id} key={topic.id} />
              ))}
            </Dropdown> */}
            <ButtonPrimary className="w-full flex justify-center items-center  bg-cyan-400 hover:bg-cyan-500">
              {" "}
              <span className="text-[16px] font-medium text-white">Tambah</span>
            </ButtonPrimary>
          </form>

          <ButtonPrimary
            className="w-full flex justify-center items-center hover:bg-gray-400"
            onClick={handleClose}
          >
            <span className="text-[16px] font-medium">Kembali</span>
          </ButtonPrimary>
        </div>
      </Modal>
    </>
  );
};

export default AddProductModal;
