import moment from "moment";
import ImageViewer from "../ImageViewer";
import { NavLink } from "react-router-dom";
import { Comment, Visibility } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";

export const CardArticle = ({ payloads }) => {
  const { id, title, description, image, created_at, views } = payloads;
  const formatDate = moment(created_at).locale("id").format("D MMMM YYYY");
  const [countComment, setCountComment] = useState(0);

  useEffect(() => {
    getCommentCount();
  }, [id]);

  const getCommentCount = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/attractions/${id}/comments/count`
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
    <div className="max-w-md w-full bg-white rounded-xl overflow-hidden shadow-md">
      <div className="relative">
        {image && (
          <ImageViewer imageName={image} className={"w-full h-[300px]"} />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 text-white p-6">
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between">
              <div>
                <NavLink to={`/detail-artikel/${id}`}>
                  <h2 className="text-xl font-bold">{title}</h2>
                </NavLink>
                <div className="max-h-24 max-w-full h-64 overflow-hidden ">
                  <p className="text-sm inherit whitespace-break-spaces">
                    {description}
                  </p>
                </div>
              </div>
              <p className="text-white-600">{formatDate}</p>
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
