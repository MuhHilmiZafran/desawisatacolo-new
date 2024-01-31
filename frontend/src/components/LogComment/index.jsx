import axios from "axios";
import React, { useEffect, useState } from "react";

const LogComment = ({ payload }) => {
  const { user_id, comment, created_at } = payload;
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById();
  }, []);

  //get user by user id
  const getUserById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/${user_id}`
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
      </div>
    </div>
  );
};

export default LogComment;
