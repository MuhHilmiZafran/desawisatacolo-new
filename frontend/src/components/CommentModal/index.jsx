import React, { useEffect, useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import CloseIcon from "@mui/icons-material/Close";
import { Skeleton } from "@mui/material";
import LogCommentAdmin from "../LogCommentAdmin";
import axios from "axios";
import Modal from "../Modal";
import { set } from "react-hook-form";
import Popup from "../Popup";
import DeleteModal from "../DeleteModal";

const CommentModal = ({ openModal, onClose, attractionId }) => {
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [notFoundMsg, setNotFoundMsg] = useState("");

  const [isPopup, setIsPopup] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(true);
  const [popupMessage, setPopupMessage] = useState("success");

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const handlePopup = (type, message) => {
    setIsPopup(true);
    setPopupSuccess(type);
    setPopupMessage(message);
    setTimeout(function () {
      setIsPopup(false);
    }, 2000);
  };

  useEffect(() => {
    fetchAllComment();
  }, [attractionId, openModal, onClose]);

  const fetchAllComment = async () => {
    setIsLoading(true);
    if (attractionId) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/attractions/${attractionId}/comments`
        );

        console.log(response.data);

        setIsLoading(false);
        if (response.data.length < 1) {
          setNotFoundMsg("Tidak ada komentar");
          setComments([]);
        } else {
          setComments(response.data);
        }
      } catch (error) {
        setIsLoading(false);
        setComments([]);
      }
    }
  };

  const handleOpenModalDelete = (commentId) => {
    setIsShowModalDelete(true);
    setCommentId(commentId);
  };

  const handleShowModalDelete = (showModal) => {
    setIsShowModalDelete(showModal);
    setCommentId("");
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/comments/${commentId}`
      );

      console.log(response.data);
      handlePopup(true, "Berhasil menghapus komentar");
      window.location.reload();
    } catch (error) {
      handlePopup(false, "Gagal menghapus komentar");
    }
  };

  return (
    <>
      <Popup isSuccess={popupSuccess} isOpen={isPopup} message={popupMessage} />

      <Modal isOpen={openModal} onClose={onClose}>
        <div className="p-[32px] flex flex-col w-full">
          <div className="py-2">
            <div className="flex justify-between w-full mb-[44px]">
              <div className="font-medium flex flex-row">
                <CommentIcon className="text-primaryMain ml-1" />
                {isLoading ? (
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={15}
                    height={20}
                  />
                ) : (
                  comments.comment_count
                )}
                <span className="ml-1">Comments</span>
              </div>
              <button onClick={() => onClose(false)}>
                <CloseIcon className="bg-black text-white w-[18px] h-[18px]" />
              </button>
            </div>

            <div className="flex flex-col gap-y-4">
              {comments?.length >= 1 ? (
                comments.map((comment) =>
                  isLoading ? (
                    <Skeleton
                      key={comment.id}
                      animation="wave"
                      variant="rounded"
                      width="100%"
                      height={100}
                    />
                  ) : (
                    <LogCommentAdmin
                      key={comment.id}
                      payload={comment}
                      deleteComment={() => handleOpenModalDelete(comment.id)}
                    />
                  )
                )
              ) : (
                <h3 className="flex justify-center items-center font-semibold">
                  {notFoundMsg}
                </h3>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <DeleteModal
        modalState={isShowModalDelete}
        closeModal={handleShowModalDelete}
        onSure={() => deleteComment(commentId)}
      />
    </>
  );
};

export default CommentModal;
