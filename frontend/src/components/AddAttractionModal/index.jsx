import React, { useEffect } from "react";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { AddRounded } from "@mui/icons-material";
import Modal from "../Modal";
import ButtonPrimary from "../ButtonPrimary";
import InputField from "../InputField";
import axios from "axios";
import Dropdown from "../Dropdown";
import ImageViewer from "../ImageViewer";

const AddAttractionModal = ({ openModal, onClose, updateData }) => {
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
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

  useEffect(() => {
    if (openModal) {
      getCategory();
      getFasilitas();
    }
  }, [openModal]);

  const getCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/categories`
      );
      setCategories(response.data); // Assuming the attractions data is an array
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  const getFasilitas = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/facilities`
      );
      setFacilities(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  const handleFacilityChange = (event) => {
    const selectedFacility = event.target.value;

    setSelectedFacilities((prevFacilities) => [
      ...prevFacilities,
      selectedFacility,
    ]);

    console.log(selectedFacilities);
  };

  const handleDeleteFacility = (index) => {
    setSelectedFacilities((prevFacilities) => {
      const updatedFacilities = [...prevFacilities];
      updatedFacilities.splice(index, 1);
      return updatedFacilities;
    });
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
      formData.append("category_id", data.category_id.value);
      formData.append("thumbnail", data.thumbnail[0]); // Assuming thumbnail is a file input
      formData.append("description", data.description);
      formData.append("facilities", selectedFacilities.join(","));
      formData.append("price", data.price);
      formData.append("latitude", data.latitude);
      formData.append("longitude", data.longitude);


      console.log(selectedFacilities.join(","));

      console.log(data);

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/attractions`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success (redirect or show a success message)
      console.log("Data added successfully");
    } catch (error) {
      // Handle error (show an error message)
      console.error("Error adding data:", error);
    }
  };

  const handleClose = () => {
    reset();
    // setSelectedFacilities([]);
    // setSelectedImage(null)
    // setImagePreview('');
    onClose(false);
  };

  return (
    <>
      {/* <Popup isSuccess={popupSuccess} isOpen={isPopup} message={popupMessage} /> */}

      <Modal isOpen={openModal} onClose={handleClose} type={"add"}>
        <Modal.Title title={"Tambah Destinasi Wisata"} />
        <div>
          <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-20">
              <div className="w-[600px]">
                <InputField
                  name="name"
                  label="Nama Obyek Wisata"
                  type="text"
                  placeholder="Ex : How to get women's right?"
                  errors={errors}
                  register={register}
                />
                <Dropdown
                  control={control}
                  name={"category_id"}
                  label={"Kategori"}
                  placeholder={"Pilih Kategori"}
                  handleSelect={handleSelectTopic}
                  errors={errors}
                >
                  {categories.map((category) => (
                    <option
                      label={category.name}
                      value={category.id}
                      key={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </Dropdown>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Fasilitas
                  </label>
                  <select
                    // {...register("facilities")}
                    name="fasilitas"
                    onChange={handleFacilityChange}
                    // value={formData.kategori}
                    // onChange={handleKategoriChange}
                    className="mt-1 p-2 border rounded-md w-full text-gray-500"
                  >
                    <option value="">Pilih Fasilitas</option>
                    {facilities &&
                      facilities.map(({ name, id }) => (
                        <option key={id} value={name}>
                          {name}
                        </option>
                      ))}
                  </select>
                </div>
                <ul className="mb-2">
                  {selectedFacilities &&
                    selectedFacilities.map((facility, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center mr-2"
                      >
                        {facility}
                        <button
                          className="text-[#CD0404]"
                          onClick={() => handleDeleteFacility(index)}
                        >
                          X
                        </button>
                      </li>
                    ))}
                </ul>
                <InputField
                  name="price"
                  label="Price"
                  type="number"
                  placeholder="Ex : Ruby Jane"
                  errors={errors}
                  register={register}
                />
                <InputField
                  name="latitude"
                  label="Latitude"
                  type="number"
                  step="any"
                  placeholder="Ex : -6.977706379032196"
                  errors={errors}
                  register={register}
                />
                <InputField
                  name="longitude"
                  label="Longitude"
                  type="number"
                  step="any"
                  placeholder="Ex : 110.4002273071985"
                  errors={errors}
                  register={register}
                />
                <label htmlFor="description">
                  Deskripsi <br />
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
                    {...register("thumbnail")}
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
            <ButtonPrimary className="w-full flex justify-center items-center">
              {" "}
              <span className="text-[16px] font-medium">Save</span>
            </ButtonPrimary>
          </form>

          <ButtonPrimary
            className="w-full flex justify-center items-center text-red-600"
            onClick={handleClose}
          >
            <span className="text-[16px] font-medium tect">Discard</span>
          </ButtonPrimary>
        </div>
      </Modal>
    </>
  );
};

export default AddAttractionModal;
