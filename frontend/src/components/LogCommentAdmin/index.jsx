import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "../ButtonPrimary";
import { Delete } from "@mui/icons-material";

const LogCommentAdmin = ({ payload, deleteComment }) => {
  const { user_id, comment, created_at } = payload;
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById();
  }, []);

  //get user by user id
  const getUserById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${user_id}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="flex">
      {/* Kolom 1 */}
      <div className="w-1/2 p-4">
        <p className="text-[14px] text-[#004AAD] font-bold mb-1">
          {user?.email}
        </p>
        <p className="text-[16px]">{comment}</p>
      </div>

      {/* Kolom 2 */}
      <div className="text-[14px] w-1/2 p-4">
        <p>{created_at}</p>
        <ButtonPrimary
          className="w-full h-2 rounded-sm border text-red-600 border-red-600 justify-center items-center flex outline-red-600 hover:bg-red-300"
          onClick={deleteComment}
        >
          <Delete style={{ fontSize: "1rem" }} />
          {/* <span className="text-sm font-medium">Delete</span> */}
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default LogCommentAdmin;
