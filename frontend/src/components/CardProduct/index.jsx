// ProductCard.js

import React from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import ImageViewer from "../ImageViewer";

const CardProduct = ({ payloads }) => {
  const { id, name, description, category, image, price, amount } = payloads;
  const navigate = useNavigate();

  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
      >
        {/* <img className="object-cover" src={image} alt="product image" /> */}
        {image && <ImageViewer imageName={image} />}
      </a>
      <div className="mt-4 px-5 pb-5">
        <div className="flex justify-between">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">{name}</h5>
        </a>
        <p>
          Stok: <span className="text-slate-900">{amount}</span>
        </p>
        </div>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-2xl font-bold text-slate-900">
              Rp {price}
            </span>
          </p>
        </div>
        <div className="flex justify-between gap-3">
          <a
            href="#"
            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Masukkan Keranjang
          </a>
          <NavLink
            to={`/detail-produk/${id}`}
            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Detail
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
