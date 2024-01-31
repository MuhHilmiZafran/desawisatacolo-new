// src/App.js
import { Shop, ShopRounded } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ImageViewer from "../../components/ImageViewer";
import { NavLink } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleBuyClick = () => {
    // Logika ketika tombol beli ditekan
    console.log("Produk ditambahkan ke keranjang");
  };

  return (
    <div className="border border-gray-500 mx-auto px-24 py-5">
      <section className="text-gray-700 body-font overflow-hidden rounded-lg bg-gray-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex justify-between">
            {/* <img
              alt="ecommerce"
              className="lg:w-1/2  max-w-[400px] max-h-[400px] object-cover rounded border border-gray-200"
              src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"
            ></img>{" "} */}
            {product && (
              <ImageViewer
                imageName={product?.image}
                className={
                  "lg:w-full max-w-[400px] max-h-[400px] border border-gray-200"
                }
              />
            )}
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-col justify-between">
              {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Category
              </h2> */}
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product?.name}
              </h1>
              <p className="leading-relaxed mb-3 whitespace-break-spaces">{product?.description}</p>
              <p className="font-semibold text-xl ">Stok: {product?.amount}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-400 mb-5"></div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Rp {product?.price}
                </span>
                {/* <NavLink
                  to={`/keranjang`}
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                >
                  Masukkan Keranjang
                </NavLink> */}
                <NavLink
                  to={`/produk-wisata/${product?.id}/order`}
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                >
                  Beli Sekarang
                </NavLink>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <Shop />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
