import React, { useEffect, useState } from "react";
import { CardFasilitas } from "../../components/CardFasilitas";
import Footer from "../../components/Footer";
import { useParams } from "react-router";
import axios from "axios";
import ImageViewer from "../../components/ImageViewer";
import CommentSection from "../../components/CommentSection";
import LogComment from "../../components/LogComment";
import ButtonPrimary from "../../components/ButtonPrimary";
import { NavLink } from "react-router-dom";
import FormReservationModal from "../../components/FormReservasiModal";
import CommentSectionArticle from "../../components/CommentSectionArticle";

const ArticleDetail = () => {
  const { id } = useParams();
  const [articles, setArticles] = useState(null);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);

  const [comments, setComments] = useState(null);
  const [views, setViews] = useState(0);

  //get data local storage
  const dataUser = JSON.parse(localStorage.getItem("data"));
  const userId = dataUser?.id;

  useEffect(() => {
    getArticleById();
    fetchAllComment();
  }, [id]);

  const getArticleById = async () => {
    if (id) {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/articles/${id}`;
        const response = await axios.get(url);
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles data:", error);
        // Handle error (show an error message)
      }
    }
  };

  const fetchAllComment = async () => {
    if (id) {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/articles/${id}/comments`;
        const response = await axios.get(url);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching articles data:", error);
        // Handle error (show an error message)
      }
    }
  };

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) {
        // You may want to add additional logic here to check if the user has scrolled to a certain point
        handleViewClick();
        setHasScrolled(true); // Set the state to true to indicate that the scroll event has occurred
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled]); // Include handleViewClick and hasScrolled in the dependency array

  const handleViewClick = async () => {
    // Make a request to the backend to increment the view count using the new endpoint
    await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/articles/${id}/views`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Update the state to reflect the new view count
    setViews(views + 1);
  };


 

  return (
    <>
      <div className="flex flex-col p-10">
        <div className="flex flex-col mb-5 md:flex-row justify-between">
          <div className="max-w-sm  w-2/3 lg:max-w-[800px] md:max-w-[700px] mb-5 md:mr-5 flex-col justify-start items-start gap-5 inline-flex">
            {/* <img
              src="https://res.cloudinary.com/dzisbnmi0/image/upload/v1700667556/cld-sample-5.jpg"
              alt=""
              className="object-cover rounded-lg md:w-[700px] md:h-[430px]"
            /> */}

            {articles?.image && (
              <ImageViewer imageName={articles?.image} className={"w-[800px]"} />
            )}
            <div className="w-full text-justify text-black text-3xl font-normal font-['Inter']">
              {articles?.title
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </div>
            <div className="w-full text-justify text-black text-base font-normal font-['Inter'] whitespace-break-spaces">
              {articles?.description}
            </div>
            {/*
            <div className="w-full max-w-[300] md:max-w-[900px] justify-center items-center gap-5 flex">
              <img
                className="w-56 h-24 md:w-[300px] md:h-[300px] rounded-lg object-cover"
                src="https://res.cloudinary.com/dzisbnmi0/image/upload/v1700667555/cld-sample-2.jpg"
              />
              <img
                className="w-48 h-24 md:w-[380px] md:h-[300px] rounded-lg object-cover"
                src="https://res.cloudinary.com/dzisbnmi0/image/upload/v1700667548/samples/breakfast.jpg"
              />
            </div>
            <div className="w-full text-justify text-black text-base font-normal font-['Inter']">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className="self-stretch justify-center items-start gap-5 flex max-w-[1000px]">
              <img
                className="w-48 h-24 md:w-[380px] md:h-[300px] rounded-lg object-cover"
                src="https://res.cloudinary.com/dzisbnmi0/image/upload/v1700667548/samples/breakfast.jpg"
              />
              <img
                className="w-56 h-24 md:w-[300px] md:h-[300px] md:69 rounded-lg object-cover"
                src="https://res.cloudinary.com/dzisbnmi0/image/upload/v1700667555/cld-sample-2.jpg"
              />
            </div>
            <div className="w-full text-justify text-black text-base font-normal font-['Inter']">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div> */}
          </div>
          
        </div>
        <div>
          <div>Comment</div>
          <div>
            <CommentSectionArticle articleId={id} userId={userId} />
          </div>
          <div>
            {comments?.map((comment) => (
              <LogComment key={comment.id} payload={comment} />
            ))}
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ArticleDetail;
