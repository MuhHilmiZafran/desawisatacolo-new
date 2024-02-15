import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddRounded } from "@mui/icons-material";
import Modal from "../Modal";
import ButtonPrimary from "../ButtonPrimary";
import InputField from "../InputField";
import axios from "axios";
import { Skeleton } from "@mui/material";
import Dropdown from "../Dropdown";
import ImageViewer from "../ImageViewer";
import Popup from "../Popup";

const EditProductModal = ({ openModal, onClose, updateData, productId }) => {
  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState("success");
  const [product, setProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset, // Add this line to set initial form values
  } = useForm();

  useEffect(() => {
    // Set initial form values when productData changes
    if (product) {
      setValue("name", product?.name);
      setValue("image", product?.image);
      setSelectedImage(product?.image);
      setValue("description", product?.description);
      setValue("price", product?.price);
      setValue("amount", product?.amount);
    }

    console.log(selectedImage);
  }, [product, setValue]);

  useEffect(() => {
    if (openModal) {
      fetchProductById();
    }
  }, [openModal, productId]);

  const fetchProductById = async () => {
    if (productId) {
      try {
        const url = `${
          import.meta.env.VITE_API_BASE_URL
        }/api/products/${productId}`;
        const response = await axios.get(url);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        // Handle error (show an error message)
        handlePopup(false, "Error fetching product data");
      }
    }
  };

  const handleSelectTopic = () => {};

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
  };

  const onSubmit = async (data) => {
    // const url = `http://localhost:8080/api/products/${productId}`;

    console.log("data: ", data);
    const formData = new FormData();
    formData.append("name", data.name);
    // formData.append("image", data.image[0]);

    // Check if a new image is being uploaded
    // formData.append('image', selectedImage);
    console.log(data.image[0]);

    if (data.image[0] instanceof File) {
      formData.append("image", data.image[0]);
    } else {
      formData.append("image", selectedImage); // Assuming selectedImage is a file input
    }

    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("amount", data.amount);

    try {
      const config = {
        method: "POST",
        baseURL: import.meta.env.VITE_API_BASE_URL,
        url: `/api/products/${productId}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };
      const response = await axios(config);

      if (response.status === 200) {
        // Handle success (redirect or show a success message)
        handlePopup(true, "Data berhasil diubah");
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
      handlePopup(false, "Error updating data");
    }
  };

  const handleClose = () => {
    reset();
    onClose(false);
  };

  return (
    <>
      <Popup isSuccess={popupSuccess} isOpen={isPopup} message={popupMessage} />

      {/* Your existing modal JSX */}
      <Modal isOpen={openModal} onClose={handleClose} type={"edit"}>
        <Modal.Title title={"Edit Oleh-oleh"} />
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
                  <input type="file" {...register("image")} />
                </label>
                <div>
                  {selectedImage && (
                    <ImageViewer
                      imageName={selectedImage}
                      className={" w-46 h-44"}
                    />
                  )}
                </div>
              </div>
            </div>
            <ButtonPrimary
              className="w-full flex justify-center items-center bg-cyan-400 hover:bg-cyan-500"
              type="submit"
            >
              {" "}
              <span className="text-[16px] font-medium text-white">Simpan</span>
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

export default EditProductModal;
