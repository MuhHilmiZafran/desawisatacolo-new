import React, { useEffect, useState } from "react";
import { CardFasilitas } from "../../components/CardFasilitas";
import Footer from "../../components/Footer";
import { useParams } from "react-router";
import axios from "axios";
import ImageViewer from "../../components/ImageViewer";
import CommentSection from "../../components/CommentSection";
import LogComment from "../../components/LogComment";
import { set } from "react-hook-form";

const TouristAttractionDetail = () => {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [comments, setComments] = useState(null);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [views, setViews] = useState(0);

  //get data local storage
  const dataUser = JSON.parse(localStorage.getItem("data"));
  const userId = dataUser?.id;

  useEffect(() => {
    fetchAttractionById();
    fetchAllComment();
  }, []);

  const fetchAttractionById = async () => {
    if (id) {
      try {
        const url = `${
          import.meta.env.VITE_API_BASE_URL
        }/api/attractions/${id}`;
        const response = await axios.get(url);
        setAttraction(response.data);
        setViews(response.data.views);
        setSelectedFacilities(response.data.facilities.split(","));
      } catch (error) {
        console.error("Error fetching attraction data:", error);
        // Handle error (show an error message)
      }
    }
  };

  const fetchAllComment = async () => {
    if (id) {
      try {
        const url = `${
          import.meta.env.VITE_API_BASE_URL
        }/api/attractions/${id}/comments`;
        const response = await axios.get(url);

        // Check if the response status is OK (200) and the data is present
        if (response.status === 200 && response.data) {
          setComments(response.data);
        } else {
          // Handle the case where the response is OK (200), but the data is invalid or empty
          console.error("Invalid or empty data received:", response.data);
          // Handle error (show an error message)
        }
      } catch (error) {
        // Handle the case where there is an error or the response status is not OK (e.g., 404)
        if (error.response) {
          console.error("Error fetching attraction data:", error.response.data);
        } else {
          console.error("Error fetching attraction data:", error.message);
        }
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
      `${import.meta.env.VITE_API_BASE_URL}/api/attractions/${id}/views`,
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
      <div className="flex flex-col p-20">
        <div className="flex flex-col mb-5 md:flex-row justify-between">
          <div className="max-w-sm lg:max-w-[800px] md:max-w-[700px] mb-5 md:mr-5 flex-col justify-start items-start gap-5 inline-flex">
            {/* <img
              src="https://res.cloudinary.com/dzisbnmi0/image/upload/v1700667556/cld-sample-5.jpg"
              alt=""
              className="object-cover rounded-lg md:w-[700px] md:h-[430px]"
            /> */}

            {attraction?.thumbnail && (
              <ImageViewer imageName={attraction?.thumbnail} />
            )}
            <div className="w-full text-justify text-black text-3xl font-normal font-['Inter']">
              {attraction?.name
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </div>
            <div className="w-full text-justify text-black text-base font-normal font-['Inter']">
              <p className="inherit whitespace-break-spaces">{attraction?.description}</p>
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
          <div className="mx-auto w-full flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2 border rounded-md">
              <div className="text-justify text-black text-2xl font-normal border-b w-full justify-center flex font-['Inter']">
                Harga Tiket Masuk
              </div>
              <div className="text-justify text-black text-xl font-normal font-['Inter']">
                RP. {attraction?.price}
              </div>
            </div>
            <div className="w-full flex flex-col items-center border rounded-md">
              <div className="text-justify text-black text-2xl font-normal border w-full flex justify-center font-['Inter']">
                Fasilitas
              </div>
              <div className="self-stretch justify-start items-start gap-5 p-3 flex flex-wrap">
                <ul className="mb-2">
                  {selectedFacilities &&
                    selectedFacilities?.map((facility, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center mr-2"
                      >
                        {facility}
                      </li>
                    ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
        <div>
          <div>Comment</div>
          <div>
            <CommentSection tourismId={id} userId={userId} />
          </div>
          <div>
            {comments?.map((comment) => (
              <LogComment key={comment.id} payload={comment} />
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default TouristAttractionDetail;
