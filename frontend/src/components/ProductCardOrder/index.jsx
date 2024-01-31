import {
  Comment,
  CommentOutlined,
  Delete,
  Edit,
  ViewAgendaOutlined,
  Visibility,
} from "@mui/icons-material";
import ButtonPrimary from "../ButtonPrimary";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import ImageViewer from "../ImageViewer";

export const ProductCardOrder = ({ payloads }) => {
  const {
    id,
    image,
    name,
    price,
    created_at,
  } = payloads;
  const formatDate = moment(created_at).locale("id").format("D MMMM YYYY");

  const handleImageError = (event) => {
    event.currentTarget.src =
      "https://res.cloudinary.com/dzisbnmi0/image/upload/v1700667555/cld-sample-2.jpg";
  };

  // const truncateDescription = (text, maxLength) => {
  //   if (text.length <= maxLength) {
  //     return text;
  //   }
  //   return text.slice(0, maxLength) + "...";
  // };

  // const truncatedDescription = truncateDescription(description, 500);

  return (
    <div className="bg-white p-[16px] border border-solid mb-4 rounded-xl">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:max-w-[400px] md:max-h-64 overflow-hidden rounded-md">
          {image && (
            <ImageViewer imageName={image} className={"w-[150px] h-[100px]"} />
          )}
        </div>

        <div className="flex flex-col justify-between w-full gap-y-2 md:px-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl md:text-2xl font-medium capitalize">
              {name}
            </h3>
            {/* <p className="h-24 text-slate-600">{truncatedDescription}</p> */}
            <p className="font-medium">Rp. {price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
