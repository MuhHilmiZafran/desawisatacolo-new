import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ButtonPrimary from "../ButtonPrimary";

const CommentSection = ({ tourismId, userId }) => {
  const [tourism, setTourism] = useState({ id: 0 });
  useEffect(() => {
    setTourism({ id: tourismId });
  }, [tourismId]);

  const [user, setUser] = useState({ id: 0 });
  useEffect(() => {
    setUser({ id: userId });
  }, [userId, tourismId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("comment", data.comment);
      formData.append("attraction_id", tourism?.id);
      formData.append("user_id", user?.id);

      await axios.post("http://localhost:8080/api/comments", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Data add successfull");
      reset();
    } catch (error) {
      console.error("Error add data: ", error);
    }
  };

  return (
    <div className="w-full z-50">
      <h2>Silahkan tinggalkan komentar Anda :</h2>
      <form
        className="w-full flex flex-col gap-4 sm:gap-6 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <textarea
            {...register("comment", { required: true })}
            className="w-[540px] py-2 px-2.5 border-[1px] border-slate-400 rounded-md"
            id="comment"
            name="comment"
          />
        </div>
        <div>
          <ButtonPrimary className="max-w-[100px] flex justify-center items-center bg-cyan-600">
            <span className="text-[16px] font-medium text-white">Kirim</span>
          </ButtonPrimary>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
