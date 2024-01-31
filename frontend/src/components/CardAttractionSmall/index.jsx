import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ImageViewer from "../ImageViewer";

export const CardAttractionSmall = ({ payloads }) => {
  const { id, thumbnail, name, description, created_at, category_id } =
    payloads;
  const [category, setCategory] = useState({});
  const formatDate = moment(created_at).locale("id").format("D MMMM YYYY");

  const handleImageError = (event) => {
    event.currentTarget.src =
      "https://res.cloudinary.com/dzisbnmi0/image/upload/v1700667555/cld-sample-2.jpg";
  };

  useEffect(() => {
    getCategoryById();
  }, []);

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
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="relative">
        {/* <img
          className="object-cover w-full h-full"
          src={thumbnail}
          alt={name}
          onError={handleImageError}
        /> */}
        {thumbnail && <ImageViewer imageName={thumbnail} className={"w-[400px] h-[300px]"} />}
      </div>
      <div className="px-6 py-4">
        <div className="inline-block text-sm bg-blue-500 text-white px-2 py-1 mb-2 rounded-tl rounded-br">
          {category
            ? category.name
            : "Kategori tidak ditemukan, mungkin sudah dihapus" || "Kategori"}
        </div>
        <NavLink to={`/detail-wisata/${id}`}>
          <div className="font-bold text-xl mb-2">{name}</div>
        </NavLink>
        <p className="w-[18rem] md:w-full text-gray-700 text-base break-words truncate">
          {truncatedDescription}
        </p>
      </div>
    </div>
  );
};
