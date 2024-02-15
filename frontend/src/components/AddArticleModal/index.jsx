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

const AddArticleModal = ({ openModal, onClose, updateData }) => {
  const [topics, setTopics] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [views, setViews] = useState(0);

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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image[0]); // Assuming image is a file input
      formData.append("description", data.description);
      formData.append("views", views);

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/articles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success (redirect or show a success message)
      console.log("Tambah Data Berhasil");
      handlePopup(true, "Tambah Data Berhasil");
      updateData();
      reset();
      setImagePreview("");
    } catch (error) {
      // Handle error (show an error message)
      console.error("Error adding data:", error);
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
        <Modal.Title title={"Tambah Article Wisata"} />
        <div>
          <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-20">
              <div  className="w-[600px]">
                <InputField
                  name="title"
                  label="Judul"
                  type="text"
                  placeholder="Masukkan Judul Artikel"
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
            <ButtonPrimary className="w-full flex justify-center items-center bg-cyan-400 hover:bg-cyan-500">
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

export default AddArticleModal;
