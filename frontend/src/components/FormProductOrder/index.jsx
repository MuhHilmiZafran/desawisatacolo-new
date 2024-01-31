import React, { useEffect } from "react";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import Modal from "../Modal";
import ButtonPrimary from "../ButtonPrimary";
import InputField from "../InputField";
import axios from "axios";
import Dropdown from "../Dropdown";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { ProductCardOrder } from "../ProductCardOrder";

const FormProductOrder = ({ openModal, onClose, productId, userId }) => {
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();
  const dataUser = JSON.parse(localStorage.getItem("data"));
  const email = dataUser?.email;
  const orderId = uuidv4();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset, // Add this line to set initial form values
  } = useForm();

  useEffect(() => {
    // Set initial form values when attractionData changes
    if (product) {
      setValue("email", email);
    }
    console.log(userId);
  }, [product, setValue]);

  const handleSelectTopic = () => {
    // Implement your logic here
  };

  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/${productId}`
      );
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
    updateTotalCost(newQuantity);
    console.log(newQuantity);
  };

  const updateTotalCost = (newQuantity) => {
    const packagePrice = product.price || 0;
    const newTotalCost = newQuantity * packagePrice;
    setTotalCost(newTotalCost);
    console.log(newTotalCost);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("user_id", userId);
      formData.append("product_id", productId);
      formData.append("alamat", data.alamat);
      formData.append("amount", quantity);
      formData.append("total_price", totalCost);

      console.log(data);

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/product-transactions`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Data added successfully");
      navigate(`/produk/pembayaran/${orderId}`);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <div className="p-14">
      <div className="text-3xl mb-5 font-medium">Formulir Order Oleh-Oleh</div>
      <div>
        <div>Paket Wisata: </div>
        <ProductCardOrder payloads={product} />
      </div>
      <div>
        <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="email"
            label="Email"
            type="text"
            placeholder={email}
            errors={errors}
            register={register}
            disabled={true}
            value={email}
          />
          {/* <div className="mb-5">
            <label htmlFor="arrival_date">
              Tanggal kedatangan: <br />
              <input
                type="date"
                {...register("arrival_date")}
                className="w-full focus:outline-none focus:ring-0 focus:border-cyan-600 focus:shadow-md focus:shadow-gray-300 py-3 px-3 border-solid border rounded mt-1"
              />
            </label>
          </div> */}

          <div className="mb-5">
            <label htmlFor="alamat" className="mb-5">
              Alamat lengkap: <br />
              <textarea
                {...register("alamat")}
                name="alamat"
                placeholder="masukkan alamat lengkap"
                className="w-full focus:outline-none focus:ring-0 focus:border-cyan-600 focus:shadow-md focus:shadow-gray-300 py-3 px-3 border-solid border rounded mt-1"
              />
            </label>
          </div>

          <div className="mb-5">
            <label htmlFor="number_of_people" className="mb-5">
              Jumlah: <br />
              <input
                type="number"
                name="amount"
                placeholder="masukkan jumlah rombongan"
                onChange={handleQuantityChange}
                value={quantity}
                className="w-full focus:outline-none focus:ring-0 focus:border-cyan-600 focus:shadow-md focus:shadow-gray-300 py-3 px-3 border-solid border rounded mt-1"
              />
            </label>
          </div>

          <div>
            Total Biaya:
            <span className="text-3xl font-medium">Rp {totalCost}</span>
          </div>
          <ButtonPrimary
            className="w-full flex justify-center items-center"
            type="submit"
          >
            <span className="text-[16px] font-medium">
              Kirim Data Reservasi
            </span>
          </ButtonPrimary>
        </form>
      </div>
    </div>
  );
};

export default FormProductOrder;
