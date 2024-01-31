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

export const CardAttractionLong = ({ payloads }) => {
  const { id, thumbnail, name, description, views, created_at, category_id } =
    payloads;
  const [category, setCategory] = useState({});
  const [countComment, setCountComment] = useState(0);
  const formatDate = moment(created_at).locale("id").format("D MMMM YYYY");

  const handleImageError = (event) => {
    event.currentTarget.src =
      "https://res.cloudinary.com/dzisbnmi0/image/upload/v1700667555/cld-sample-2.jpg";
  };

  useEffect(() => {
    getCategoryById();
    getCommentCount();
  }, [id]);

  const getCategoryById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/categories/${category_id}`
      );
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const truncatedDescription = truncateDescription(description, 500);
  // const truncatedDescription = truncateDescription(description, 500);

  const getCommentCount = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/attractions/${id}/comments/count`
      );
  
      // Check if the response status is OK (200) and the data is present
      if (response.status === 200 && response.data) {
        setCountComment(response.data.count);
      } else {
        // Handle the case where the response is OK (200), but the data is invalid
        console.error("Invalid data received:", response.data);
        setCountComment(0);
      }
    } catch (error) {
      // Handle the case where there is an error or the response is not OK (e.g., 404)
      if (error.response) {
        console.error("Error fetching comment:", error.response.data);
        setCountComment(0);
      } else {
        console.error("Error fetching comment:", error.message);
        setCountComment(0);
      }
    }
  };
  

  return (
    <div className="bg-white w-full p-[16px] border border-solid mb-4 rounded-xl">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:max-w-[600px] md:max-h-72 overflow-hidden rounded-md">
          {/* <img
            className="object-cover w-full h-full"
            src={thumbnail}
            alt={name}
            onError={handleImageError}
          /> */}
          {thumbnail && (
            <ImageViewer
              imageName={thumbnail}
              className={"w-[600px] h-[300px]"}
            />
          )}
          <div className="absolute left-2 top-2 inline-block text-md bg-blue-500 text-white px-2 py-1 mb-2 rounded-tl rounded-br">
            {category.name}
          </div>
        </div>

        <div className="flex flex-col justify-between w-full gap-y-2 md:px-5">
          <div className="flex flex-col gap-2">
            <NavLink to={`/detail-wisata/${id}`}>
              <h3 className="text-xl md:text-2xl font-medium capitalize">
                {name}
              </h3>
            </NavLink>
            <p className="h-24 text-slate-600">{truncatedDescription}</p>
          </div>
          <div className="flex justify-between w-full mb-4">
            <div className="flex flex-row items-center">
              <div className="flex flex-col ml-2">
                <p className="font-medium text-xs text-slate-500 capitalize">
                  {formatDate}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-end items-center gap-2">
              <p className="font-normal text-xs flex items-center gap-x-1">
                {views} <Visibility />
              </p>
              <p className="font-normal text-xs flex items-center gap-x-1">
                {countComment}
                <Comment />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
