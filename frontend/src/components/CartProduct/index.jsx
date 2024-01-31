import {
  Comment,
  Delete,
  DeleteOutline,
  PlusOne,
  TextDecrease,
  TextIncrease,
  Visibility,
} from "@mui/icons-material";
import React from "react";
import ButtonPrimary from "../ButtonPrimary";

const CartProduct = () => {
  return (
    <div className="bg-white w-full p-[16px] border border-solid mb-3 rounded-xl">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[200px] overflow-hidden rounded-md">
          <img className="object-cover w-[150px] h-[150px]" src="" />
        </div>

        <div className="flex flex-col justify-between w-full  md:px-5">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl md:text-xl font-medium capitalize">
                nama
              </h3>
            </div>
            <div className="flex gap-5 text-center">
              <p>Qty: </p>
              <div className="flex gap-1">
                <div className="columns">
                  <ButtonPrimary className="w-full h-2 rounded-sm border  border-green-600 justify-center items-center flex outline-green-600 hover:bg-green-300">
                    <span className="text-sm font-medium text-green-600">
                      -
                    </span>
                  </ButtonPrimary>
                </div>
                <div className="w-full h-full">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="w-10 h-full border text-center"
                  />
                </div>
                <div className="columns">
                  <ButtonPrimary className="w-full h-2 rounded-sm border  border-red-600 justify-center items-center flex outline-red-600 hover:bg-red-300">
                    <span className="text-sm font-medium text-red-600">+</span>
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <p>Harga: RP. 12000</p>
            <p>Sub Total: RP. 12000</p>
          </div>
          <div className="bg-red-500 flex justify-center rounded-sm py-1">
            <Delete
              style={{
                fontSize: "1.5rem",
                color: "white",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
