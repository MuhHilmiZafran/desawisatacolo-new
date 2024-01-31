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

const EditArticleModal = ({ openModal, onClose, updateData, articleId }) => {
  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState("success");
  const [article, setArticle] = useState(null);
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
    // Set initial form values when articleData changes
    if (article) {
      setValue("title", article?.title);
      setValue("image", article?.image);
      setSelectedImage(article?.image);
      setValue("description", article?.description);
    }

    console.log(selectedImage);
  }, [article, setValue]);

  useEffect(() => {
    if (openModal) {
      fetchArticleById();
    }
  }, [openModal, articleId]);

  const fetchArticleById = async () => {
    if (articleId) {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/articles/${articleId}`;
        const response = await axios.get(url);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article data:", error);
        // Handle error (show an error message)
        handlePopup(false, "Error fetching article data");
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
    // const url = `http://localhost:8080/api/articles/${articleId}`;

    console.log("data: ", data);
    const formData = new FormData();
    formData.append("title", data.title);
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

    try {
      const config = {
        method: "POST",
        baseURL: import.meta.env.VITE_API_BASE_URL,
        url: `/api/articles/${articleId}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };

      // console.log(data);

      // const response = await axios.put(url, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const response = await axios(config);

      if (response.status === 200) {
        // Handle success (redirect or show a success message)
        handlePopup(true, "Data updated successfully");
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
      {/* Your existing modal JSX */}
      <Modal isOpen={openModal} onClose={handleClose} type={"edit"}>
        <Modal.Title title={"Edit Artikel"} />
        <div>
          <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
            {/* Input fields and form elements (similar to the add modal) */}
            {/* <ImageUploader
              className="mb-4"
              icon={<AddRounded />}
              handleChange={(file) => handleImageChange(file)}
            >
              {imagePreview ? (
                <>
                  {isLoading ? (
                    <Skeleton
                      variant="circular"
                      width={100 + "%"}
                      height={100 + "%"}
                    />
                  ) : (
                    <Imageimage src={imagePreview} />
                  )}
                </>
              ) : (
                <Imageimage alt={""} />
              )}
            </ImageUploader> */}

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

                {/* <label>
              image:
              <input type="file" {...register("image")} />
            </label> */}
                {/* <InputField
              name="category_id"
              label="Kategori"
              type="number"
              placeholder="Ex : Ruby Jane"
              errors={errors}
              register={register}
            /> */}

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
              className="w-full flex justify-center items-center"
              type="submit"
            >
              {" "}
              <span className="text-[16px] font-medium">Save Changes</span>
            </ButtonPrimary>
          </form>

          <ButtonPrimary
            className="w-full flex justify-center items-center"
            onClick={handleClose}
          >
            <span className="text-[16px] font-medium">Cancel</span>
          </ButtonPrimary>
        </div>
      </Modal>
    </>
  );
};

export default EditArticleModal;
